const express = require('express');
const dbController = require('./controllers/dbController');
const logsController = require('./controllers/logsController');

const app = express();
const PORT = 3000;


app.get('/scheduled', logsController.getScheduledGames, (req, res) => {
  res.status(200).json(res.locals);
});

app.get('/:gameId', dbController.getPlayerStatsById, (req, res) => {
  res.status(200).json(res.locals);
});

app.use('*', (req, res) => res.status(404).send('Route not found'));

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred in tools server' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => console.log(`Server is listening to at port ${PORT}`));