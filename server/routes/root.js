const express = require('express');
const dbController = require('../controllers/dbController');
const logsController = require('../controllers/logsController');

const router = express.Router();

router.get('/jobs', logsController.getScheduledGames, (req, res) => {
  res.status(200).json(res.locals);
});

router.get('/game/:gameId', dbController.getPlayerStatsByGameId, (req, res) => {
  res.status(200).json(res.locals);
});

module.exports = router;