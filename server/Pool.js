const { Pool } = require('pg');

const {
  DB_USER,
  DB_HOST,
  DB_DATABASE,
  DB_PASSWORD,
  DB_PORT,
} = require('./config.js');

const pool = new Pool({
  user: DB_USER,
  host: DB_HOST,
  database: DB_DATABASE,
  password: DB_PASSWORD,
  port: DB_PORT,
});

/*
pool.connect().then((client) => {
  client
    .query('select * from users;')
    .then(({ rows }) => {
      client.release();
      console.log('rows:', rows);
      console.log("CONNECTION SUCCEEDED!!! LET'S POP BOTTLES!!! WHOOOOO");
    })
    .catch((err) => {
      client.release();
      console.log(err);
      console.log("CONNECTION FAILED!!! LET'S POP BOTTLES ANYWAY!!!");
    });
});

*/

module.exports = pool;
