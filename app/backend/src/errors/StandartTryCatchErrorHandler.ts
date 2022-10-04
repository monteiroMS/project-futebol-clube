import { Response } from 'express';

export default (error: Error, res: Response) => res
  .status(500).json({ message: error.message });
