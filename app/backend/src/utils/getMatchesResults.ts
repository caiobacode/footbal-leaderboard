import IMatch from '../interfaces/IMatch';

function getHomeResults(id: number | undefined, matches: Array<IMatch>) {
  let gamesPlayed = 0;
  let victories = 0;
  let draws = 0;
  let loses = 0;
  matches.forEach((m: IMatch) => {
    if (m.homeTeamId === id) {
      gamesPlayed += 1;
      if (m.homeTeamGoals > m.awayTeamGoals) victories += 1;
      if (m.homeTeamGoals < m.awayTeamGoals) loses += 1;
      if (m.homeTeamGoals === m.awayTeamGoals) draws += 1;
    }
  });
  return { gamesPlayed, victories, draws, loses };
}

function getAwayResults(id: number | undefined, matches: Array<IMatch>) {
  let gamesPlayed = 0;
  let victories = 0;
  let draws = 0;
  let loses = 0;
  matches.forEach((m: IMatch) => {
    if (m.awayTeamId === id) {
      gamesPlayed += 1;
      if (m.awayTeamGoals > m.homeTeamGoals) victories += 1;
      if (m.awayTeamGoals < m.homeTeamGoals) loses += 1;
      if (m.awayTeamGoals === m.homeTeamGoals) draws += 1;
    }
  });
  return { gamesPlayed, victories, draws, loses };
}

function getMatchesResults(id: number | undefined, matches: Array<IMatch>, homeOrAway: string) {
  if (homeOrAway === 'home') return getHomeResults(id, matches);
  return getAwayResults(id, matches);
}

export default getMatchesResults;
