import { BookRawItem } from 'types/booksType';
import { secrets } from 'libs/gcp';
import axios from 'axios';

function shortenDescription(text: string) {
  // This regular expression will match a sentence ending with ., !, or ?, followed by zero or more whitespace characters.
  const sentenceRegex = /[^.!?]+[.!?]+(\s+|$)/g;

  // Use match to find all the sentences and return the result as an array.
  const sentences = text.match(sentenceRegex);

  if (!sentences) return text;
  if (sentences.length <= 2) return sentences;
  return sentences[0] + sentences[1];

  return sentences;
}

export const searchBook = async (title: string) => {
  try {
    const googleApiKey = await secrets.get('google-api-key');
    const titleStr = encodeURIComponent(title);
    const startIndex = 0;
    const maxResults = 40;
    const response = await axios.get('https://www.googleapis.com/books/v1/volumes', {
      params: {
        q: `intitle:${titleStr}`,
        startIndex,
        maxResults,
        key: googleApiKey,
      },
    });

    if (!response?.data?.items?.length) return [];

    const list = response.data.items
      .filter((book: BookRawItem) => book?.volumeInfo?.authors && book?.volumeInfo?.publisher && book?.volumeInfo?.description)
      .map((book: BookRawItem) => {
        const shortDescription = book?.volumeInfo?.description ? shortenDescription(book.volumeInfo.description) : null;
        return {
          id: book.id,
          selfLink: book.selfLink || null,
          title: book?.volumeInfo?.title || null,
          authors: book?.volumeInfo?.authors ? book.volumeInfo.authors.join(',') : null,
          publisher: book?.volumeInfo?.publisher,
          publishedDate: book?.volumeInfo?.publishedDate || null,
          shortDescription,
          thumbnailImage: book?.volumeInfo?.imageLinks?.smallThumbnail || null,
        };
      });
    return list;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else throw new Error('Unknown error occurred while fetching book data');
  }
};
