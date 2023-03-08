import IMatch from './IMatch';

export default interface IServiceMatches {
  getAll(): Promise<IMatch[]>
  getByQuery(inProgress: string): Promise<IMatch[]>
  finishMatch(id: number): Promise<object>
  updateMatch(homeTeamGoals: number, awayTeamGoals: number, id: number): Promise<object>
}
