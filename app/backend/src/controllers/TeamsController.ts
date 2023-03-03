import { Request, Response } from 'express';
import IServiceTeams from '../interfaces/IServiceTeams';

export default class TeamsController {
  private _teamsService: IServiceTeams;

  constructor(teamService: IServiceTeams) {
    this._teamsService = teamService;
  }

  public async getAll(req: Request, res: Response) {
    const allTeams = await this._teamsService.getAll();
    res.status(200).json(allTeams);
  }

  public async getById(req: Request, res: Response) {
    const { id } = req.params;
    const oneTeam = await this._teamsService.getById(Number(id));
    res.status(200).json(oneTeam);
  }
}
