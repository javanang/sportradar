const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  user: 'dbuser',
  password: 'dbuser',
  database: 'stats',
  port: 5432
});

module.exports = {
    query: (text, params, callback) => {
      console.log('executed query', text);
      return pool.query(text, params, callback);
    },
  };