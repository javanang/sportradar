const axios = require('axios');
const api = {};

api.baseURL = 'https://statsapi.web.nhl.com/api/v1/';

api.getDailySchedule = () => {
  return axios
    .get(api.baseURL + 'schedule')
    .then(response => response.data.dates[0].games)
    .catch(error => console.log(error));
};

api.getLiveFeed = (gameId) => {
  const gameFeedURL = `game/${gameID}/feed/live`;
  return axios
    .get(api.baseURL + gameFeedURL)
    .then(response => response.data)
    .catch(error => console.log(error));
};

module.exports = api;