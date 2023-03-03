import { NextFunction, Request, Response } from 'express';

export default class authLogin {
  static verifyInfo(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    const errorMessage = { message: 'All fields must be filled' };
    if (!email || !password) return res.status(400).json(errorMessage);
    next();
  }
}
