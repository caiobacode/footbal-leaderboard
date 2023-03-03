import { Request, Response } from 'express';
import { IServiceLogin } from '../interfaces/IServiceUsers';

export default class LoginController {
  private _usersService: IServiceLogin;

  constructor(service: IServiceLogin) {
    this._usersService = service;
  }

  async login(req: Request, res: Response) {
    const info = req.body;
    const token = await this._usersService.login(info);
    res.status(200).json({ token });
  }
}
