import { ModelStatic } from 'sequelize';
import generateToken from '../token/generateToken';
import { UserToken } from '../token/IUserToken';
import Users from '../database/models/UsersModel';
import { IServiceLogin, IUsersInfo } from '../interfaces/IServiceUsers';

export default class LoginService implements IServiceLogin {
  protected model: ModelStatic<Users> = Users;

  async login(info: IUsersInfo): Promise<string> {
    const find = await this.model.findOne({ where: { email: info.email } });
    const payload: UserToken = {
      id: find?.id as number,
      email: find?.email as string,
      username: find?.email as string,
    };
    return generateToken(payload);
  }
}
