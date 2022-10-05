const schedule = require('node-schedule');
const api = require('./api');
const path = require('path');
const dataTransform = require('./data');
const fs = require('fs');
const dbController = require('../controllers/dbController');
const jobRunner = {};

jobRunner.runDailyJob = () => {
  const job = schedule.scheduleJob('0 2 * * *', () => {
    console.log('Pulled daily schedule from API');
    jobRunner.scheduleGames();
  });
};

jobRunner.scheduleGames = async () => {
  const dailySchedule = await api.getDailySchedule();
  const scheduledJobs = [];
  dailySchedule.forEach(game => {
    const gameTime = new Date(game.gameDate);
    const job = schedule.scheduleJob(gameTime, () => {
      jobRunner.getRefreshedStats(game.gamePk);
    });
    if (job) scheduledJobs.push({ date: job.pendingInvocations[0].fireDate, gamePk: game.gamePk });
  });
  fs.writeFileSync(path.resolve(__dirname + '/../models/scheduledJobs.json'), JSON.stringify(scheduledJobs));
};

jobRunner.getRefreshedStats = async (gamePk) => {
  try {
    const data = await api.getLiveFeed(gamePk);
    const playerInfo = dataTransform.getPlayerInfo(data);
    const response = await dbController.setPlayerInfo(playerInfo);
  } catch (error) {
    console.log('jobRunner.getRefreshedStats: ', error);
  };
  intervalId = setInterval(async () => {
    try {
      const data = await api.getLiveFeed(gamePk);
      const status = dataTransform.getStatus(data);
      const playerStats = dataTransform.getPlayerStats(data);
      const response = dbController.updatePlayerStats(playerStats);
      if (status.statusCode === '6') clearInterval(intervalId);
    } catch (error) {
      console.log('jobRunner.getRefreshedStats setInterval: ', error);
    };
  }, 60000);
};

module.exports = jobRunner;