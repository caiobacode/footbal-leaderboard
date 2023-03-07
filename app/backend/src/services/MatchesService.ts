import { ModelStatic } from 'sequelize';
import IServiceMatches from '../interfaces/IServiceMatches';
import IMatch from '../interfaces/IMatch';
import Matches from '../database/models/MatchesModel';

export default class MatchesService implements IServiceMatches {
  protected model: ModelStatic<Matches> = Matches;
  async getAll(): Promise<IMatch[]> {
    const result = await this.model.findAll();
    if (!result) throw new Error('Matches not found');
    return result;
  }
}
