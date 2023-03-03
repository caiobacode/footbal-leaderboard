import { ModelStatic } from 'sequelize';
import IServiceTeams from '../interfaces/IServiceTeams';
import ITeam from '../interfaces/ITeam';
import Teams from '../database/models/TeamsModel';

export default class TeamsService implements IServiceTeams {
  protected model: ModelStatic<Teams> = Teams;
  async getAll(): Promise<ITeam[]> {
    const result = this.model.findAll();
    return result;
  }
}
