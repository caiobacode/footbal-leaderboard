import IMatch from '../interfaces/IMatch';
import ITeam from '../interfaces/ITeam';
import IResults from '../interfaces/IResults';

function getTeamGoals(id: number | undefined, matches: Array<IMatch>) {
  let favorGoals = 0;
  let ownGoals = 0;
  matches.forEach((m: IMatch) => {
    if (m.homeTeamId === id) {
      favorGoals += m.homeTeamGoals;
      ownGoals += m.awayTeamGoals;
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

function getMatchesResults(id: number | undefined, matches: Array<IMatch>) {
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

export default function getTeamsPropeties(teams: Array<ITeam>, matches: Array<IMatch>) {
  const newCompleteTeams = teams.map((t) => {
    const goals = getTeamGoals(t.id, matches);
    const gamesResults = getMatchesResults(t.id, matches);

    const completeTeam = {
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

    return completeTeam;
  });
  return newCompleteTeams;
}
