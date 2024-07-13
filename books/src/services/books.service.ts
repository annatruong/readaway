import { BookListItem, BookRawItem } from 'types/books';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

export const searchBook = async (title: string): Promise<BookListItem[]> => {
  try {
    const titleStr = title.replace(/ /g, '+');
    const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=intitle:${titleStr}&key=${process.env.GOOGLE_API_KEY}`;
    const response = await axios.get(apiUrl);
    console.log(response.data.items.length);
    if (response?.data?.items?.length) {
      const list = response.data.items.map((book: BookRawItem) => {
        return {
          selfLink: book.selfLink || null,
          title: book?.volumeInfo?.title || null,
          authors: book?.volumeInfo?.authors ? book.volumeInfo.authors.join(',') : null,
          publisher: book?.volumeInfo?.publisher || null,
          publishedDate: book?.volumeInfo?.publishedDate || null,
          description: book?.volumeInfo?.description || null,
          thumbnailImage: book?.volumeInfo?.imageLinks?.smallThumbnail || null,
        };
      });
      return list;
    }
    return [];
  } catch (err) {
    console.error('Error fetching book data:', err);
    throw new Error('Unknown error occurred while fetching book data');
  }
};
