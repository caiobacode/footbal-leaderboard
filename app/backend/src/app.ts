import * as express from 'express';
import TeamsController from './controllers/TeamsController';
import TeamsService from './services/TeamsService';
import LoginController from './controllers/LoginController';
import LoginService from './services/UsersService';
import authLogin from './middlewares/authLogin';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
    this.app.get('/teste', (req, res) => res.json({ oi: 'tchau' }));

    // Teams
    const ServiceTeams = new TeamsService();
    const Teams = new TeamsController(ServiceTeams);

    this.app.get('/teams', (req, res) => Teams.getAll(req, res));
    this.app.get('/teams/:id', (req, res) => Teams.getById(req, res));

    // -----

    // Users
    const ServiceLogin = new LoginService();
    const ControllerLogin = new LoginController(ServiceLogin);
    this.app.post('/login', authLogin.verifyInfo, (req, res) => ControllerLogin.login(req, res));
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// Essa segunda exportação é estratégica, e a execução dos testes de cobertura depende dela
export const { app } = new App();
