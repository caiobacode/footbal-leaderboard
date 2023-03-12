import { Router } from 'express';
import LeaderBoardService from '../services/LeaderboardService';
import LeaderBoardController from '../controllers/LeaderboardController';

const leaderboardRouter = Router();

const ServiceLeaderboard = new LeaderBoardService();
const leaderboard = new LeaderBoardController(ServiceLeaderboard);

leaderboardRouter.get('/leaderboard/home', (req, res) => leaderboard.getAll(req, res));

export default leaderboardRouter;
