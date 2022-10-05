const db = require('../models/pgModel');
require('dotenv').config();

const dbController = {};

dbController.getPlayerStatsByGameId = (req, res, next) => {
  console.log(req);
  // return next();
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