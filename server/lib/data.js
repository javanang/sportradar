const dataTransform = {};

dataTransform.getPlayerStats = (data) => {
  const homePlayers = data.liveData.boxscore.teams.home.players;
  const awayPlayers = data.liveData.boxscore.teams.away.players;
  const playerStats = [];

  for (player in homePlayers) {
    //assume that if stats is an empty object, player didn't play
    if (!homePlayers[player].stats.skaterStats) continue;
    playerStats.push({
      assists: homePlayers[player].stats.skaterStats?.assists || 0,
      goals: homePlayers[player].stats.skaterStats?.goals || 0,
      hits: homePlayers[player].stats.skaterStats?.hits || 0,
      points: homePlayers[player].stats.skaterStats?.assists + homePlayers[player].stats.skaterStats?.goals || 0,
      penaltyMinutes: homePlayers[player].stats.skaterStats?.penaltyMinutes || 0,
      id: homePlayers[player].person.id
    });
  };

  for (player in awayPlayers) {
    //assume that if stats is an empty object, player didn't play
    if (!awayPlayers[player].stats.skaterStats) continue;
    playerStats.push({
      assists: awayPlayers[player].stats.skaterStats?.assists || 0,
      goals: awayPlayers[player].stats.skaterStats?.goals || 0,
      hits: awayPlayers[player].stats.skaterStats?.hits || 0,
      points: awayPlayers[player].stats.skaterStats?.assists + awayPlayers[player].stats.skaterStats?.goals || 0,
      penaltyMinutes: awayPlayers[player].stats.skaterStats?.penaltyMinutes || 0,
      id: awayPlayers[player].person.id
    });
  };
  return playerStats;
};

dataTransform.getStatus = (data) => {
  return {
    gamePk: data.gamePk,
    abstractGameState: data.gameData.status.abstractGameState,
    codedGameState: data.gameData.status.codedGameState,
    detailedState: data.gameData.status.detailedState,
    statusCode: data.gameData.status.statusCode,
    startTimeTBD: data.gameData.status.startTimeTBD
  };
};

dataTransform.getPlayerInfo = (data) => {
  const { players } = data.gameData;
  allPlayers = [];
  for (player in players) {
    if (players[player].rosterStatus === 'N') continue;
    allPlayers.push({
      id: players[player].id,
      fullName: players[player].fullName?.replace(/'/g, "\\'") || null,
      teamId: players[player].currentTeam?.id || null,
      teamName: players[player].currentTeam?.name || null,
      age: players[player].currentAge || null,
      primaryNumber: players[player].primaryNumber || null,
      primaryPosition: players[player].primaryPosition?.name || null,
      gameId: data.gameData.game.pk
    });
  };
  return allPlayers;
};

module.exports = dataTransform;