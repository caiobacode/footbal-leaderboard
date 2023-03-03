import ITeam from './ITeam';

export default interface IServiceTeams {
  getAll(): Promise<ITeam[]>
}
