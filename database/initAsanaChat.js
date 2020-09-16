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
const tableName = "asanaChat";

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
      postedAt BIGINT PRIMARY KEY
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
        postedAt
      ) VALUES (
        'Liam',
        'This river is soooo nice',
        ${Date.now() + 1000}
      ), (
        'Nuri',
        'Wow, whoever design this river is awesome!',
        ${Date.now() + 10000}
      ), (
        'Deo',
        'Why are you slacking off in the River! Get back to work!',
        ${Date.now() + 100000}
      ), (
        'Armando',
        'Je veux un croissant',
        ${Date.now() + 1000000}
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
