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
      email VARCHAR NOT NULL,
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
      email,
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
      'jSmith',
      'jSmith@gmail.com',
      '$2b$10$EjWAPqe40rgd5yv8Xruoiem9vnn.FnhDkAjLiFbh7J.91uzwdahqm',
      20,
      400,
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
      'JaneSmith',
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
      'LLambert',
      'LarryL@gmail.com',
      '$2b$10$EjWAPqe40rgd5yv8Xruoiem9vnn.FnhDkAjLiFbh7J.91uzwdahqm',
      12,
      800,
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
      'SMarks',
      'MarkS@gmail.com',
      '$2b$10$EjWAPqe40rgd5yv8Xruoiem9vnn.FnhDkAjLiFbh7J.91uzwdahqm',
      100,
      5000,
      CURRENT_TIMESTAMP,
      NULL,
      NULL,
      'Bali',
      '{"Rivers", "Mountains", "etc"}',
      'Namaslaying'
    ) ,
      (
        'Matt',
        'Faris',
        'MFaris',
        'MFaris@gmail.com',
        '$2b$10$EjWAPqe40rgd5yv8Xruoiem9vnn.FnhDkAjLiFbh7J.91uzwdahqm',
        50,
        2000,
        CURRENT_TIMESTAMP,
        NULL,
        NULL,
        'Cant be found',
        '{"Lakes", "Rivers"}',
        'Grand Master'
      ),
      (
        'Bruce',
        'Wayne',
        'BWayne',
        'Iambatman@bats.com',
        '$2b$10$EjWAPqe40rgd5yv8Xruoiem9vnn.FnhDkAjLiFbh7J.91uzwdahqm',
        5,
        10,
        CURRENT_TIMESTAMP,
        NULL,
        NULL,
        'Batcave',
        '{"caves"}',
        'Bat Master'
      ),
      (
        'Bruce',
        'Wayne',
        'BWayne',
        'Iambatman@bats.com',
        '$2b$10$EjWAPqe40rgd5yv8Xruoiem9vnn.FnhDkAjLiFbh7J.91uzwdahqm',
        5,
        10,
        CURRENT_TIMESTAMP,
        NULL,
        NULL,
        'Batcave',
        '{"caves"}',
        'Bat Master'
      ),
      (
        'Clark',
        'Kent',
        'cK',
        'superMan@aol.com',
        '$2b$10$EjWAPqe40rgd5yv8Xruoiem9vnn.FnhDkAjLiFbh7J.91uzwdahqm',
        0,
        0,
        CURRENT_TIMESTAMP,
        NULL,
        NULL,
        'krypton',
        '{"Hidden"}',
        'Super'
      ),
      (
        'Bruce',
        'Banner',
        'Hulk',
        'Hulk@yahoo.com',
        '$2b$10$EjWAPqe40rgd5yv8Xruoiem9vnn.FnhDkAjLiFbh7J.91uzwdahqm',
        25,
        1000,
        CURRENT_TIMESTAMP,
        NULL,
        NULL,
        'New York City',
        '{"Hidden"}',
        'Smash'
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
