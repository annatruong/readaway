import { BookRawItem, BookListItem } from 'types/booksType';
import { secrets, datastore } from 'libs/gcp';
import axios from 'axios';

function shortenDescription(text: string) {
  // This regular expression will match a sentence ending with ., !, or ?, followed by zero or more whitespace characters.
  const sentenceRegex = /[^.!?]+[.!?]+(\s+|$)/g;

  // Use match to find all the sentences and return the result as an array.
  const sentences = text.match(sentenceRegex);

  if (!sentences) return text;
  if (sentences.length <= 2) return sentences;
  const description = sentences[0] + sentences[1];
  return description.trim();
}

export const search = async (title: string) => {
  try {
    const googleApiKey = await secrets.get('google-api-key');
    const titleStr = encodeURIComponent(title);
    console.log(titleStr);
    const startIndex = 0;
    const maxResults = 40;
    const results = [];
    const response = await axios.get('https://www.googleapis.com/books/v1/volumes', {
      params: {
        q: `${titleStr}`,
        startIndex,
        maxResults,
        orderBy: 'relevance',
        key: googleApiKey,
      },
    });

    if (!response?.data?.items?.length) return [];
    console.log(response.data.totalItems);
    const list = response.data.items
      .filter((book: BookRawItem) => book?.volumeInfo?.authors && book?.volumeInfo?.publisher && book?.volumeInfo?.description)
      .map((book: BookRawItem) => {
        const shortDescription = book?.volumeInfo?.description ? shortenDescription(book.volumeInfo.description) : null;
        return {
          id: book.id,
          selfLink: book.selfLink || null,
          title: book?.volumeInfo?.title || null,
          authors: book?.volumeInfo?.authors ? book.volumeInfo.authors.join(',') : null,
          publisher: book?.volumeInfo?.publisher || null,
          publishedDate: book?.volumeInfo?.publishedDate || null,
          shortDescription,
          thumbnailImage: book?.volumeInfo?.imageLinks?.smallThumbnail || null,
        };
      });
    return list;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else throw new Error('Unknown error occurred while search for book');
  }
};

export const add = async ({ userId, book }: { userId: string; book: BookListItem }) => {
  try {
    const books = await datastore.query({
      namespace: 'books',
      kind: 'user_books',
      filter: { field: 'id', operator: '=', value: book.id },
    });

    const bookExists = books.find(b => b.user_id === userId);
    if (bookExists) return 'This book has already been added.';

    const bookData = {
      user_id: userId,
      id: book.id,
      title: book.title,
      authors: book.authors,
      self_link: book.selfLink,
      publisher: book.publisher,
      publisher_date: book.publishedDate,
      short_description: book.shortDescription,
      thumbnail_image: book.thumbnailImage,
    };

    await datastore.save({ namespace: 'books', kind: 'user_books', entity: bookData });
    return 'Book has been added.';
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else throw new Error('Unknown error occurred while adding book');
  }
};

export const getBooks = async (userId: string) => {
  try {
    const books = await datastore.query({
      namespace: 'books',
      kind: 'user_books',
      filter: { field: 'user_id', operator: '=', value: userId },
    });

    return books;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else throw new Error("Unknown error occurred while getting user's books");
  }
};
