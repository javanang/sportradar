const schedule = require('node-schedule');
const api = require('./api');
const path = require('path');
const dataTransform = require('./data');
const fs = require('fs');
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
    if (job) scheduledJobs.push({date: job.pendingInvocations[0].fireDate, gamePk: game.gamePk});
  });
  fs.writeFileSync(path.resolve(__dirname + '/../models/scheduledJobs.json'), JSON.stringify(scheduledJobs));
};

jobRunner.getRefreshedStats = (gamePk) => {
  // TODO: write once to the DB with player info
  // intervalId = setInterval(async () => {
  //   const data = await api.getPlayerStats(gamePk);
  //   const status = dataTransform.getStatus(data);
  //   const playerStats = dataTransform.getRefreshedStats(data);
  //   // TODO: update DB with player stats injest.updatePlayerStats(playerStats);
  //   if (status.statusCode === '6') clearInterval(intervalId);
  // }, 60000);
};

module.exports = jobRunner;