const fs = require('fs');
const path = require('path');
const scheduledJobPath = '/../models/scheduledJobs.json'
const logsController = {};

logsController.getScheduledGames = async (req, res, next) => {
  try {
    const data = await fs.readFileSync(path.resolve(__dirname + scheduledJobPath));
    res.locals.data = JSON.parse(data);
    return next();
  } catch (error) {
    console.error(error);
    return next({ error })
  }
};

module.exports = logsController;