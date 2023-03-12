import { ModelStatic } from 'sequelize';
import ordenateTeams from '../utils/ordenateMatches';
import Matches from '../database/models/MatchesModel';
import Teams from '../database/models/TeamsModel';
import IServiceLeaderBoard from '../interfaces/IServiceLeaderboard';
import ILeaderboardTeam from '../interfaces/ILeaderboardTeam';
import getTeamsPropeties from '../utils/getTeamsPropeties';

export default class LeaderBoardService implements IServiceLeaderBoard {
  protected matchesmodel: ModelStatic<Matches> = Matches;
  protected teamsModel: ModelStatic<Teams> = Teams;

  async getAll(homeOrAway: string): Promise<ILeaderboardTeam[]> {
    const allMatches = await this.matchesmodel.findAll({ where: { inProgress: false } });
    const allTeams = await this.teamsModel.findAll();

    const teamsWithPropeties = getTeamsPropeties(allTeams, allMatches, homeOrAway);
    return ordenateTeams(teamsWithPropeties);
  }
}
