import ILeaderboardTeam from './ILeaderboardTeam';

export default interface IServiceLeaderBoard {
  getAll(homeOrAway: string): Promise<ILeaderboardTeam[]>
}
