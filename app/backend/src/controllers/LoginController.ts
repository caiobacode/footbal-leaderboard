import { Request, Response } from 'express';
import { IServiceLogin } from '../interfaces/IServiceUsers';
import { IRequest } from '../interfaces/IRequest';
import { UserToken } from '../token/IUserToken';

export default class LoginController {
  private _usersService: IServiceLogin;

  constructor(service: IServiceLogin) {
    this._usersService = service;
  }

  async login(req: Request, res: Response) {
    const info = req.body;
    const { type, data } = await this._usersService.login(info);
    res.status(type).json(data);
  }

  async role(req: IRequest | IRequest, res: Response) {
    const info: UserToken | undefined = req.user;
    const { type, data } = await this._usersService.role(info);
    res.status(type).json(data);
  }
}
