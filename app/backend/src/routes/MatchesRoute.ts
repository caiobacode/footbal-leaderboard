import { Router } from 'express';
import MatchesController from '../controllers/MatchesController';
import MatchesService from '../services/MatchesService';

const matchesRouter = Router();

const ServiceMacthes = new MatchesService();
const Teams = new MatchesController(ServiceMacthes);

matchesRouter.get('/matches', (req, res) => Teams.getAll(req, res));

export default matchesRouter;
