const { Pool, Client } = require('pg');
const sampleData = require('./sampleData.js');

const {
  DB_USER,
  DB_HOST,
  DB_DATABASE,
  DB_PASSWORD,
  DB_PORT,
} = require('./config');

// Connection to Postgres DB
const client = new Client({
  user: DB_USER,
  host: DB_HOST,
  database: DB_DATABASE,
  password: DB_PASSWORD,
  port: DB_PORT,
});

var start = Date.now();
const tableName = 'users';

// Connect to DB
client
  .connect()
  .then((res) => {
    console.log(
      `\nConnected to the DB! Drop ${tableName} table if exists`,
      Date.now() - start,
      ' ms\n'
    );

    return client.query(`
      DROP TABLE IF EXISTS ${tableName};
    `);
  })
  .then((res) => {
    console.log(
      `\nSuccessfully dropped ${tableName} table! Now create it`,
      Date.now() - start,
      ' ms\n'
    );

    return client.query(`
    CREATE TABLE ${tableName} (
      user_id SERIAL PRIMARY KEY,
      first_name VARCHAR NOT NULL ,
      last_name VARCHAR NOT NULL,
      username VARCHAR NOT NULL,
      password VARCHAR NOT NULL,
      visit_count INTEGER,
      total_mins INTEGER,
      account_created TIMESTAMP,
      current_river VARCHAR DEFAULT NULL,
      current_activity VARCHAR DEFAULT NULL,
      location VARCHAR,
      travel_History text [],
      certification VARCHAR
    );
    `);
  })
  .then((res) => {
    console.log(`Created ${tableName} table!`);
  })
  .then((res) => {
    console.log('Time to insert some data ! ');
    return client.query(
      `INSERT INTO ${tableName} (
      first_name,
      last_name,
      username,
      password,
      visit_count,
      total_mins,
      account_created,
      current_river,
      current_activity,
      location,
      travel_History,
      certification
    ) VALUES (
      'John',
      'Smith',
      'jSmith@gmail.com',
      '$2b$10$EjWAPqe40rgd5yv8Xruoiem9vnn.FnhDkAjLiFbh7J.91uzwdahqm',
      20,
      100,
      CURRENT_TIMESTAMP,
      NULL,
      NULL,
      'New York City',
      '{"Bali", "Germany"}',
      'Yoga Master'
    ),
    (
      'Jane',
      'Smith',
      'JaneSmith@gmail.com',
      '$2b$10$EjWAPqe40rgd5yv8Xruoiem9vnn.FnhDkAjLiFbh7J.91uzwdahqm',
      2,
      10,
      CURRENT_TIMESTAMP,
      NULL,
      NULL,
      'Spain',
      '{"Canada", "Mexico"}',
      'None'
    ),
    (
      'Larry',
      'Lambert',
      'LarryL@gmail.com',
      '$2b$10$EjWAPqe40rgd5yv8Xruoiem9vnn.FnhDkAjLiFbh7J.91uzwdahqm',
      500,
      12,
      CURRENT_TIMESTAMP,
      NULL,
      NULL,
      'New Jersey',
      '{"TEST"}',
      'Some'
    ),
    (
      'Stephen',
      'Mark',
      'MarkS@gmail.com',
      '$2b$10$EjWAPqe40rgd5yv8Xruoiem9vnn.FnhDkAjLiFbh7J.91uzwdahqm',
      5000,
      100,
      CURRENT_TIMESTAMP,
      NULL,
      NULL,
      'Bali',
      '{"Rivers", "Mountains", "etc"}',
      'Namaslaying'
    )
    `
    );
  })
  .then((res) => {
    console.log(`Insert completed !, peace out !`);
    client.end();
  })
  .catch((err) => {
    console.log(`Error in creating ${tableName} table: `, err);
    client.end();
  });
