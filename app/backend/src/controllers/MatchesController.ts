import { Request, Response } from 'express';
import IServiceMatches from '../interfaces/IServiceMatches';

export default class MatchesController {
  private _matchesService: IServiceMatches;

  constructor(matchesService: IServiceMatches) {
    this._matchesService = matchesService;
  }

  async getAll(req: Request, res: Response) {
    const { inProgress } = req.query;
    if (inProgress) {
      const matchesFiltered = await this._matchesService.getByQuery(inProgress as string);
      return res.status(200).json(matchesFiltered);
    }
    const allMatches = await this._matchesService.getAll();
    res.status(200).json(allMatches);
  }

  async finishMatch(req: Request, res: Response) {
    const { id } = req.params;
    const message = await this._matchesService.finishMatch(+id);
    res.status(200).json(message);
  }

  async updateMatch(req: Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const message = await this._matchesService.updateMatch(homeTeamGoals, awayTeamGoals, +id);
    res.status(200).json(message);
  }
}
