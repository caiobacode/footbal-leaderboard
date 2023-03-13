import { Router } from 'express';
import LeaderBoardService from '../services/LeaderboardService';
import LeaderBoardController from '../controllers/LeaderboardController';

const leaderboardRouter = Router();

const ServiceLeaderboard = new LeaderBoardService();
const leaderboard = new LeaderBoardController(ServiceLeaderboard);

leaderboardRouter.get('/leaderboard/home', (req, res) => leaderboard.getAll(req, res, 'home'));
leaderboardRouter.get('/leaderboard/away', (req, res) => leaderboard.getAll(req, res, 'away'));
leaderboardRouter.get('/leaderboard', (req, res) => leaderboard.getAll(req, res, 'eusouumgenio'));

export default leaderboardRouter;
