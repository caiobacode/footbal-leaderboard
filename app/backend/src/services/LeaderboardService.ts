import { ModelStatic } from 'sequelize';
import Matches from '../database/models/MatchesModel';
import Teams from '../database/models/TeamsModel';
import IServiceLeaderBoard from '../interfaces/IServiceLeaderboard';
import ILeaderboardTeam from '../interfaces/ILeaderboardTeam';
import orderTable from '../utils/orderTable';

export default class LeaderBoardService implements IServiceLeaderBoard {
  protected matchesmodel: ModelStatic<Matches> = Matches;
  protected teamsModel: ModelStatic<Teams> = Teams;

  async getAll(): Promise<ILeaderboardTeam[]> {
    const allMatches = await this.matchesmodel.findAll({ where: { inProgress: false } });
    const allTeams = await this.teamsModel.findAll();
    const newOrderedTeams = orderTable(allTeams, allMatches);
    const newAllTeams = newOrderedTeams.sort((a, b) => {
      const aBalance: number = a.goalsFavor - a.goalsOwn;
      const bBalance: number = b.goalsFavor - b.goalsOwn;
      if (a.totalPoints === b.totalPoints) {
        if (aBalance === bBalance) return 0;
        console.log(a.name, aBalance, b.name, bBalance, aBalance < bBalance);
        return aBalance < bBalance ? 1 : -1;
      }
      return a.totalPoints < b.totalPoints ? 1 : -1;
    });
    return newAllTeams;
  }
}
