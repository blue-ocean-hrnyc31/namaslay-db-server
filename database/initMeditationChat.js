const { Pool, Client } = require("pg");
const {
  DB_USER,
  DB_HOST,
  DB_DATABASE,
  DB_PASSWORD,
  DB_PORT,
} = require("./config.js");

// Connection to Postgres DB
const client = new Client({
  user: DB_USER,
  host: DB_HOST,
  database: DB_DATABASE,
  password: DB_PASSWORD,
  port: DB_PORT,
});

var start = Date.now();
const tableName = "meditationchat";

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
      id SERIAL,
      username VARCHAR,
      content VARCHAR,
      posted_at BIGINT PRIMARY KEY
     );
    `);
  })
  .then(res => {
    console.log(`Created ${tableName} table! Put some initial messages in!`,
    Date.now() - start,
    " ms\n");

    return client.query(`
      INSERT INTO ${tableName} (
        username,
        content,
        posted_at
      ) VALUES (
        'Matt F',
        'Me gusta rios',
        ${Date.now() + 1000}
      ), (
        'Matt E',
        'Im always D to meditate',
        ${Date.now() + 10000}
      ), (
        'Junjie',
        'Are there any tigers in here?',
        ${Date.now() + 100000}
      ), (
        'Anna',
        'If Jeremy says papyrus one more time',
        ${Date.now() + 200000}
      );
    `)
  })
  .then(res => {
    console.log(`Put some data into the ${tableName} table! Bye!`,
    Date.now() - start,
    " ms\n");

    client.end();
  })
  .catch((err) => {
    console.log(`Error in creating ${tableName} table: `, err);
    client.end();
  });
