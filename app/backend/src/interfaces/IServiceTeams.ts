import ITeam from './ITeam';

export default interface IServiceTeams {
  getAll(): Promise<ITeam[]>
  getById(id: number): Promise<ITeam>
}
