import { Request, Response } from 'express';
import { authentication } from 'services';

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const result = await authentication.login({ username, password });
    res.send(result);
  } catch (error) {
    if (error instanceof Error) res.status(500).send(error.message);
    else res.status(500).send('Unknown erro');
  }
};
