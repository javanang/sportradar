const db = require('../models/pgModel');

const dbController = {};

dbController.getPlayerStatsByGameId = (req, res, next) => {
  const { gameId } = req.params;

  const query = `
  SELECT *
  FROM player_stats_by_game
  WHERE game_id = $1 AND assists >= 0;
  `;

  db.query(query, [gameId], (error, response) => {
    if (error) {
      return next({
        log: `dbController.getPlayerStatsByGameId: ERROR: ${typeof error === 'object' ? JSON.stringify(error) : error}`,
        message: { error: 'Error occurred in dbController.getPlayerStatsByGameId. Check server logs for more details.' },
      });
    }
    if (!response.rows.length) return next({
      log: `dbController.getPlayerStatsByGameId: ERROR: No game found`,
      message: { error: 'Error occurred in dbController.getPlayerStatsByGameId. No game found.' }
    });
    res.locals.data = response.rows;
    return next();
  });
};

/**
 * Updates the database with player stats for a specific game
 * 
 * @param {array} data Array of objects
 */
dbController.setPlayerInfo = (data) => {
  Promise.all(data.map(player => {
    const query = `
    INSERT INTO
      player_stats_by_game
      (
        player_id,
        player_name,
        team_id,
        team_name,
        player_age,
        player_number,
        player_position,
        game_id
      )
      VALUES
      ($1, $2, $3, $4, $5, $6, $7, $8);
    `;
    return db.query(query, Object.values(player));
  }))
    .then(values => values)
    .catch(error => { throw error })

};

dbController.updatePlayerStats = (data) => {
  Promise.all(data.map(player => {
    const query = `
      UPDATE
      player_stats_by_game
      SET
        assists = $1,
        goals = $2, 
        hits = $3,
        points = $4, 
        penalty_minutes = $5
      WHERE player_id = $6;
    `;
    console.log(Object.values(player))
    return db.query(query, Object.values(player));
  }))
    .then(values => values)
    .catch(error => { throw error })
};

module.exports = dbController;