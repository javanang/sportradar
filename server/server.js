const express = require('express');
const jobRunner = require('./lib/job');
const router = require('./routes/root');

const app = express();
const PORT = 3000;

app.use('/', router);

app.use('*', (req, res) => res.status(404).send('Route not found'));

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred in server' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

// Start job when server starts 
jobRunner.scheduleGames();

app.listen(PORT, () => console.log(`Server is listening at port ${PORT}`));