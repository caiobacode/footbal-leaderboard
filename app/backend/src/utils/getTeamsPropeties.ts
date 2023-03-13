import IMatch from '../interfaces/IMatch';
import ITeam from '../interfaces/ITeam';
import IResults from '../interfaces/IResults';
import getMatchesResults from './getMatchesResults';

function getTeamGoals(id: number | undefined, matches: Array<IMatch>, type: string) {
  let favorGoals = 0;
  let ownGoals = 0;
  matches.forEach((m: IMatch) => {
    if (m.homeTeamId === id && type !== 'away') {
      favorGoals += m.homeTeamGoals;
      ownGoals += m.awayTeamGoals;
    }
    if (m.awayTeamId === id && type !== 'home') {
      favorGoals += m.awayTeamGoals;
      ownGoals += m.homeTeamGoals;
    }
  });
  return { favorGoals, ownGoals };
}

function getEfficiency(results: IResults) {
  if (results.gamesPlayed === results.victories) return '100.00';
  const victoryValue = 100.00 / results.gamesPlayed;
  const drawValue = victoryValue / 3;
  const totalValue = (victoryValue * results.victories) + drawValue * results.draws;

  return (totalValue).toFixed(2);
}

function getTeamsPropeties(teams: Array<ITeam>, matches: Array<IMatch>, homeOrAway: string) {
  const newCompleteTeams = teams.map((t) => {
    const goals = getTeamGoals(t.id, matches, homeOrAway);
    const gamesResults = getMatchesResults(t.id, matches, homeOrAway);
    return {
      name: t.teamName,
      totalPoints: (gamesResults.victories * 3) + gamesResults.draws,
      totalGames: gamesResults.gamesPlayed,
      totalVictories: gamesResults.victories,
      totalDraws: gamesResults.draws,
      totalLosses: gamesResults.loses,
      goalsFavor: goals.favorGoals,
      goalsOwn: goals.ownGoals,
      goalsBalance: goals.favorGoals - goals.ownGoals,
      efficiency: getEfficiency(gamesResults),
    };
  });
  return newCompleteTeams;
}

export default getTeamsPropeties;
