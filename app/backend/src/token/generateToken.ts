import { sign } from 'jsonwebtoken';
import { UserToken } from './IUserToken';

const { JWT_SECRET } = process.env;

const generateToken = (payload: UserToken) => {
  const token = sign(payload, JWT_SECRET as string);
  return token;
};

export default generateToken;
