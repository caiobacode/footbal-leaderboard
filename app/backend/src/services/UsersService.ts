import { ModelStatic } from 'sequelize';
import * as bcryp from 'bcryptjs';
import generateToken from '../token/generateToken';
import { UserToken } from '../token/IUserToken';
import Users from '../database/models/UsersModel';
import { IServiceLogin, IUsersInfo } from '../interfaces/IServiceUsers';

export default class LoginService implements IServiceLogin {
  protected model: ModelStatic<Users> = Users;

  async login(info: IUsersInfo): Promise<{ type: number, data: string | object }> {
    const user = await this.model.findOne({ where: { email: info.email } });
    if (!user) return { type: 401, data: { message: 'Invalid email or password' } };

    const payload: UserToken = {
      id: user?.id as number,
      email: user?.email as string,
      username: user?.email as string,
    };

    const passwordValid = await bcryp.compare(info.password, user.password as string);
    if (!passwordValid) return { type: 401, data: { message: 'Invalid email or password' } };

    return { type: 200, data: { token: generateToken(payload) } };
  }
}
