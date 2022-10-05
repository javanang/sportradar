const scheduledJobs = require('../models/scheduledJobs.json');
const logsController = {};

logsController.getScheduledGames = (req, res, next) => {
  res.locals.data = scheduledJobs;
  return next();
};

module.exports = logsController;