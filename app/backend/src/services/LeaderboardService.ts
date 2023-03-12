import { ModelStatic } from 'sequelize';
import Matches from '../database/models/MatchesModel';
import Teams from '../database/models/TeamsModel';
import IServiceLeaderBoard from '../interfaces/IServiceLeaderboard';
import ILeaderboardTeam from '../interfaces/ILeaderboardTeam';
import orderTable from '../utils/orderTable';

const oneTeamMock = {
  name: 'Palmeiras',
  totalPoints: 299,
  totalGames: 1,
  totalVictories: 123123,
  totalDraws: 0,
  totalLosses: 0,
  goalsFavor: 2312,
  goalsOwn: 0,
  goalsBalance: 2312,
  efficiency: '100.00',
};

export default class LeaderBoardService implements IServiceLeaderBoard {
  protected matchesmodel: ModelStatic<Matches> = Matches;
  protected teamsModel: ModelStatic<Teams> = Teams;

  async getAll(): Promise<ILeaderboardTeam[]> {
    const allMatches = await this.matchesmodel.findAll({ where: { inProgress: false } });
    const allTeams = await this.teamsModel.findAll();
    const newAllTeams = orderTable(allTeams, allMatches);
    console.log(newAllTeams);
    const testReturn = [oneTeamMock, oneTeamMock, oneTeamMock];
    return testReturn;
  }
}
