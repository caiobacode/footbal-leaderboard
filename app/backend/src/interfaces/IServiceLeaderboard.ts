import ILeaderboardTeam from './ILeaderboardTeam';

export default interface IServiceLeaderBoard {
  getAll(): Promise<ILeaderboardTeam[]>
}
