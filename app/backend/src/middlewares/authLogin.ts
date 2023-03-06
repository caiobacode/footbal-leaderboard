import { NextFunction, Request, Response } from 'express';

export default class authLogin {
  static verifyInfo(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;

    const emptyFieldsMessage = { message: 'All fields must be filled' };

    if (!email || !password) return res.status(400).json(emptyFieldsMessage);

    const regexEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const invalidMessage = { message: 'Invalid email or password' };

    if (!regexEmail.test(email) || password.length < 6) return res.status(401).json(invalidMessage);

    next();
  }
}
