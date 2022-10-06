# Sportradar

## About
Pipeline to injest player stats during live games

## <a name="getting-started"></a> Getting Started

1. Run `npm install` in the terminal 
2. If haven't already, install Docker
3. Run `docker-compose up` in the terminal to start up the database
4. Initialize the table using this command in the terminal 
```bash
psql -h localhost -U dbuser -p 5432 -d stats -f playerStats.sql
```
5. Run `npm run start` in the terminal to start up the server

As long as the server is up and running, a job will run at 2:00AM CT daily to query the NHL schedule API to get games for the day.

Using the response, one job per game will be scheduled. Job will start on game start and end when status of the game changes to "final".

Job will get updated player stats every 1 minute and updates the database.

## Endpoints

- Player Stats by Game ID

  `GET /game/:gameId`

- Scheduled jobs for the day

  `GET /jobs`

## Test

Run `npm run test` to run test suite
