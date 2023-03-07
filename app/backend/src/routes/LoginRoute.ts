import { Router } from 'express';
import LoginService from '../services/LoginService';
import LoginController from '../controllers/LoginController';
import authLogin from '../middlewares/authLogin';
import authToken from '../middlewares/authToken';

const loginRouter = Router();

const ServiceLogin = new LoginService();
const Login = new LoginController(ServiceLogin);

loginRouter.post('/login', authLogin.verifyInfo, (req, res) => Login.login(req, res));
loginRouter.get('/login/role', authToken.verifyToken, (req, res) => Login.role(req, res));

export default loginRouter;
