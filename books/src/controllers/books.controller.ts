import { Request, Response } from 'express';
import { books } from 'services';

export const search = async (req: Request, res: Response) => {
  const { title } = req.query;
  if (!title || typeof title !== 'string') {
    return res.status(400).send('Missing or invalid parameter');
  }
  try {
    const book = await books.search(title);
    res.send(book);
  } catch (error) {
    if (error instanceof Error) res.status(500).send(error.message);
    else res.status(500).send('Unknown error');
  }
};

export const add = async (req: Request, res: Response) => {
  const book = req.body;
  const userId = req.user.id;
  if (!book.title || !book.id || !userId) {
    return res.status(400).send('Missing parameters');
  }
  try {
    const result = await books.add({ userId, book });
    res.send(result);
  } catch (error) {
    if (error instanceof Error) res.status(500).send(error.message);
    else res.status(500).send('Unknown error');
  }
};

export const getBooks = async (req: Request, res: Response) => {
  const userId = req.user.id;
  if (!userId) {
    return res.status(400).send('Missing parameters');
  }
  try {
    const userBooks = await books.getBooks(userId);
    res.send(userBooks);
  } catch (error) {
    if (error instanceof Error) res.status(500).send(error.message);
    else res.status(500).send('Unknown error');
  }
};
