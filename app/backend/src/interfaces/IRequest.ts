import { Request } from 'express';
import { UserToken } from '../token/IUserToken';

export interface IRequest extends Request {
  user?: UserToken;
}
