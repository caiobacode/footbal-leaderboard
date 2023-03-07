import IMatch from './IMatch';

export default interface IServiceMatches {
  getAll(): Promise<IMatch[]>
}
