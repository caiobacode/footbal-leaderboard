import { Request, Response } from 'express';
import IServiceMatches from '../interfaces/IServiceMatches';

export default class MatchesController {
  private _matchesService: IServiceMatches;

  constructor(matchesService: IServiceMatches) {
    this._matchesService = matchesService;
  }

  public async getAll(req: Request, res: Response) {
    const allMatches = await this._matchesService.getAll();
    res.status(200).json(allMatches);
  }
}
