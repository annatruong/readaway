import { Request, Response } from 'express';
import { books } from 'services';

export const findBook = async (req: Request, res: Response) => {
  const { title } = req.params;
  try {
    const book = await books.findBook(title);
    res.send(book);
  } catch (error) {
    if (error instanceof Error) res.status(500).send(error.message);
    else res.status(500).send('Unknown erro');
  }
};
