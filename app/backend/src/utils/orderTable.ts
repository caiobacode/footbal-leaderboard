import IMatch from '../interfaces/IMatch';

function getGoals(id: number, matches: Array<IMatch>) {
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

function getMatchesResults(id: number, matches: Array<IMatch>) {
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

export default function orderTable(teams: Array<any>, matches: Array<any>) {
  const newMatches = matches.map((m) => { const newM = m.dataValues; return newM; });
  const newCompleteTeams = teams.map((t) => {
    const newT = t.dataValues;
    const goals = getGoals(newT.id, newMatches);
    const gamesResults = getMatchesResults(newT.id, newMatches);
    const completeTeam = {
      name: newT.teamName,
      totalPoints: (gamesResults.victories * 3) + gamesResults.draws,
      totalGames: gamesResults.gamesPlayed,
      totalVictories: gamesResults.victories,
      totalDraws: gamesResults.draws,
      totalLosses: gamesResults.loses,
      goalsFavor: goals.favorGoals,
      goalsOwn: goals.ownGoals,
    };
    return completeTeam;
  });
  return newCompleteTeams;
}
