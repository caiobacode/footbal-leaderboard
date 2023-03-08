import { Router } from 'express';
import MatchesController from '../controllers/MatchesController';
import MatchesService from '../services/MatchesService';
import authToken from '../middlewares/authToken';

const matchesRouter = Router();

const ServiceMacthes = new MatchesService();
const Matches = new MatchesController(ServiceMacthes);

matchesRouter.get(
  '/matches',
  (req, res) => Matches.getAll(req, res),
);

matchesRouter.patch(
  '/matches/:id/finish',
  authToken.verifyToken,
  (req, res) => Matches.finishMatch(req, res),
);

export default matchesRouter;
