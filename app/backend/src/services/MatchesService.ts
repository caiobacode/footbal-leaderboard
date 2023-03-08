import { ModelStatic, Op } from 'sequelize';
import ICreateMatch from '../interfaces/ICreateMatch';
import IServiceMatches from '../interfaces/IServiceMatches';
import Teams from '../database/models/TeamsModel';
import IMatch from '../interfaces/IMatch';
import Matches from '../database/models/MatchesModel';

export default class MatchesService implements IServiceMatches {
  protected model: ModelStatic<Matches> = Matches;
  protected teamsModel: ModelStatic<Teams> = Teams;

  async getAll(): Promise<IMatch[]> {
    const allMatches = this.model.findAll({
      include: [
        { model: Teams, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: Teams, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });
    return allMatches;
  }

  async getByQuery(inProgress: string): Promise<IMatch[]> {
    const matchesFiltered = this.model.findAll({
      where: { inProgress: inProgress === 'true' },
      include: [
        { model: Teams, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: Teams, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });
    return matchesFiltered;
  }

  async finishMatch(id: number) {
    await this.model.update({ inProgress: false }, { where: { id } });
    return { message: 'finished' };
  }

  async updateMatch(homeTeamGoals: number, awayTeamGoals: number, id: number) {
    await this.model.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
    return { message: 'match updated' };
  }

  async createMatch(info: ICreateMatch) {
    const homeid = info.homeTeamId;
    const awayId = info.awayTeamId;

    const teams = await this.teamsModel.findAll({ where: { id: { [Op.or]: [homeid, awayId] } } });
    const notFoundMessage = { message: 'There is no team with such id!' };

    if (teams.length < 2) return { type: 404, data: notFoundMessage };

    const newMatch = await this.model.create({ ...info, inProgress: true });
    return { type: 201, data: newMatch };
  }
}
