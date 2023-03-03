import { ModelStatic } from 'sequelize';
import IServiceTeams from '../interfaces/IServiceTeams';
import ITeam from '../interfaces/ITeam';
import Teams from '../database/models/TeamsModel';

export default class TeamsService implements IServiceTeams {
  protected model: ModelStatic<Teams> = Teams;
  async getAll(): Promise<ITeam[]> {
    const result = await this.model.findAll();
    if (!result) throw new Error('Teams not found');
    return result;
  }

  async getById(id: number): Promise<ITeam> {
    const oneTeam = await this.model.findByPk(id);
    if (!oneTeam) throw new Error('Team not found');
    return oneTeam;
  }
}
