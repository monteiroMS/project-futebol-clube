import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { iDecodedJWT } from '../interfaces';

const secret = process.env.JWT_SECRET || 'jwt_secret';

const NOT_FOUND_MESSAGE = 'Token not found';
const INVALID_TOKEN_MESSAGE = 'Token must be a valid token';

export const decodeJwt = (token: string) => {
  const decodedJwt = jwt.verify(token, secret);
  return decodedJwt as iDecodedJWT;
};

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ message: NOT_FOUND_MESSAGE });
    }

    decodeJwt(authorization);

    next();
  } catch (error) {
    return res.status(401).json({
      message: INVALID_TOKEN_MESSAGE,
    });
  }
};
