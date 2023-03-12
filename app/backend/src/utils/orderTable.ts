export default function orderTable(teams: Array<any>, matches: Array<any>) {
  const newArr = teams.map((t) => {
    const newT = { name: t.dataValues.teamName };
    return newT;
  });
  // const newMatches = matches.map((m) => {
  //   const newM = { sla: m.dataValues.homeTeamName };
  //   return newM;
  // });
  console.log(matches);
  return newArr;
}
