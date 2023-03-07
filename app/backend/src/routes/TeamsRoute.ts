import { Router } from 'express';
import TeamsController from '../controllers/TeamsController';
import TeamsService from '../services/TeamsService';

const teamsRouter = Router();

const ServiceTeams = new TeamsService();
const Teams = new TeamsController(ServiceTeams);

teamsRouter.get('/teams', (req, res) => Teams.getAll(req, res));
teamsRouter.get('/teams/:id', (req, res) => Teams.getById(req, res));

export default teamsRouter;
