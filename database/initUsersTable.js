const { Pool, Client } = require("pg");
const {
  DB_USER,
  DB_HOST,
  DB_DATABASE,
  DB_PASSWORD,
  DB_PORT,
} = require("./config");

// Connection to Postgres DB
const client = new Client({
  user: DB_USER,
  host: DB_HOST,
  database: DB_DATABASE,
  password: DB_PASSWORD,
  port: DB_PORT,
});

var start = Date.now();
const tableName = "users";

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
      username VARCHAR NOT NULL DEFAULT 'NULL',
      email VARCHAR NOT NULL DEFAULT 'NULL',
      password VARCHAR NOT NULL DEFAULT 'NULL',
      score INTEGER DEFAULT 0,
      level INTEGER DEFAULT 1
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
