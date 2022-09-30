import { NextFunction, Request, Response } from 'express';

const MISSING_VALUE_ERROR = 'All fields must be filled';

export default (req: Request, res: Response, next: NextFunction) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({
      message: MISSING_VALUE_ERROR,
    });
  }

  next();
};
