import IMatch from './IMatch';
import ICreateMatch from './ICreateMatch';

export default interface IServiceMatches {
  getAll(): Promise<IMatch[]>
  getByQuery(inProgress: string): Promise<IMatch[]>
  finishMatch(id: number): Promise<object>
  updateMatch(homeTeamGoals: number, awayTeamGoals: number, id: number): Promise<object>
  createMatch(info: ICreateMatch): Promise<{ type: number, data: object | string }>
}
