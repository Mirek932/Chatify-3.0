import { Request, Response } from 'express';

export const exampleController = (req: Request, res: Response) => {
  res.json({ message: 'Hallo von der API!' });
};
