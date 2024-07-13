import { Request, Response } from 'express';
import { books } from 'services';

export const searchBook = async (req: Request, res: Response) => {
  const { title } = req.query;
  if (!title || typeof title !== 'string') {
    return res.status(400).send('Missing or invalid parameter');
  }
  try {
    const book = await books.searchBook(title);
    res.send(book);
  } catch (error) {
    if (error instanceof Error) res.status(500).send(error.message);
    else res.status(500).send('Unknown error');
  }
};
