import { UserToken } from '../token/IUserToken';

export interface IUsersInfo {
  email: string,
  password: string
}

export interface IServiceLogin {
  login(info: IUsersInfo): Promise<{ type: number, data: string | object }>;
  role(info: UserToken | undefined): Promise<{ type: number, data: string | object }>;
}
