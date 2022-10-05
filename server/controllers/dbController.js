const db = require('../models/pgModel');
require('dotenv').config();

const dbController = {};

dbController.getPlayerStatsByGameId = (req, res, next) => {
  const { gameId } = req.params;

  const query = `
  SELECT *
  FROM player_stats_by_game
  WHERE game_id = $1;
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
 * @param {object} data[] Updated player stats to be written into db
 * @param {integer} data[0].id
 * @param {string} data[0].fullName
 * @param {integer} data[0].teamId
 * @param {string} data[0].teamName
 * @param {integer} data[0].primaryNumber
 * @param {string} data[0].primaryPosition
 * @param {integer} data[0].gameID
 */
dbController.setPlayerInfo = (data) => {

};

dbController.updatePlayerStats = (data) => {

};


module.exports = dbController;