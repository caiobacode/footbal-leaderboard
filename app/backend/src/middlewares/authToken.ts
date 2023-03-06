import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { IRequest } from '../interfaces/IRequest';
import { UserToken } from '../token/IUserToken';

const { JWT_SECRET } = process.env;

export default class authToken {
  static verifyToken(req: IRequest, res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    const invalidMessage = { message: 'Token must be a valid token' };

    if (!authorization) return res.status(401).json({ message: 'Token not found' });

    try {
      const verifyToken = verify(authorization, JWT_SECRET as string) as UserToken;
      req.user = verifyToken;
      next();
    } catch (error) {
      return res.status(401).json(invalidMessage);
    }
  }
}
