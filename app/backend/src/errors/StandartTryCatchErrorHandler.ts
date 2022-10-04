import { Response } from 'express';

export default (error: Error, res: Response, code: number) => res
  .status(code)
  .json({ message: error.message });
