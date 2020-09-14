const { Pool, Client } = require("pg");
const {
  DB_USER,
  DB_HOST,
  DB_DATABASE,
  DB_PASSWORD,
  DB_PORT,
} = require("../config.js");

// Connection to Postgres DB
const client = new Client({
  user: DB_USER,
  host: DB_HOST,
  database: DB_DATABASE,
  password: DB_PASSWORD,
  port: DB_PORT,
});

var start = Date.now();
const tableName = "events";

// Connect to DB
client
  .connect()
  .then((res) => {
    console.log(
      `\nConnected to the DB! Drop ${tableName} table if exists`,
      Date.now() - start,
      " ms\n"
    );

    return client.query(`
      DROP TABLE IF EXISTS ${tableName};
    `);
  })
  .then((res) => {
    console.log(
      `\nSuccessfully dropped ${tableName} table! Now create it`,
      Date.now() - start,
      " ms\n"
    );

    return client.query(`
    CREATE TABLE ${tableName} (
      id SERIAL PRIMARY KEY,
      host VARCHAR NOT NULL DEFAULT 'NULL',
      title VARCHAR NOT NULL DEFAULT 'NULL',
      description VARCHAR NOT NULL DEFAULT 'NULL',
      location VARCHAR NOT NULL DEFAULT 'NULL',
      start_time timestamp,
      end_time timestamp
     );
    `);
  })
  .then(res => {
    console.log(`Created ${tableName} table! Bye!`);
    client.end();
  })
  .catch((err) => {
    console.log(`Error in creating ${tableName} table: `, err);
    client.end();
  });
