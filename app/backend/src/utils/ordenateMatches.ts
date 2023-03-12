import ILeaderboardTeam from '../interfaces/ILeaderboardTeam';

function ordenateTeams(teams: Array<ILeaderboardTeam>) {
  return teams.sort((a, b) => {
    if (a.totalPoints === b.totalPoints && a.goalsBalance === b.goalsBalance) {
      return a.goalsFavor < b.goalsFavor ? 1 : -1;
    }
    if (a.totalPoints === b.totalPoints) {
      if (a.goalsBalance === b.goalsBalance) return 0;
      return a.goalsBalance < b.goalsBalance ? 1 : -1;
    }
    return a.totalPoints < b.totalPoints ? 1 : -1;
  });
}

export default ordenateTeams;
