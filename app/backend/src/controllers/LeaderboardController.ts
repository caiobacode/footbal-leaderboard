import { Request, Response } from 'express';
import IServiceLeaderBoard from '../interfaces/IServiceLeaderboard';

export default class LeaderBoardController {
  private _leaderboardService: IServiceLeaderBoard;

  constructor(leaderboard: IServiceLeaderBoard) {
    this._leaderboardService = leaderboard;
  }

  async getAll(req: Request, res: Response) {
    const orderedTeams = await this._leaderboardService.getAll();
    res.status(200).json(orderedTeams);
  }
}
