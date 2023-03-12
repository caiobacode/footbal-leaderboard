import { ModelStatic } from 'sequelize';
import Matches from '../database/models/MatchesModel';
import Teams from '../database/models/TeamsModel';
import IServiceLeaderBoard from '../interfaces/IServiceLeaderboard';
import ILeaderboardTeam from '../interfaces/ILeaderboardTeam';
import getTeamsPropeties from '../utils/getTeamsPropeties';

export default class LeaderBoardService implements IServiceLeaderBoard {
  protected matchesmodel: ModelStatic<Matches> = Matches;
  protected teamsModel: ModelStatic<Teams> = Teams;

  async getAll(): Promise<ILeaderboardTeam[]> {
    const allMatches = await this.matchesmodel.findAll({ where: { inProgress: false } });
    const allTeams = await this.teamsModel.findAll();

    const newTeams = getTeamsPropeties(allTeams, allMatches);

    const orderedTeams = newTeams.sort((a, b) => {
      if (a.totalPoints === b.totalPoints && a.goalsBalance === b.goalsBalance) {
        return a.goalsFavor < b.goalsFavor ? 1 : -1;
      }
      if (a.totalPoints === b.totalPoints) {
        if (a.goalsBalance === b.goalsBalance) return 0;
        return a.goalsBalance < b.goalsBalance ? 1 : -1;
      }
      return a.totalPoints < b.totalPoints ? 1 : -1;
    });

    return orderedTeams;
  }
}
