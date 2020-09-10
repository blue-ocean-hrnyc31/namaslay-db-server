const { Pool, Client } = require('pg');
const {
  DB_USER,
  DB_HOST,
  DB_DATABASE,
  DB_PASSWORD,
  DB_PORT
} = require('./config');
const puppeteer = require('puppeteer');

// Connection to Postgres DB
const client = new Client({
  user: DB_USER,
  host: DB_HOST,
  database: DB_DATABASE,
  password: DB_PASSWORD,
  port: DB_PORT,
});

var start = Date.now();
const tableName = 'players';



// Connect to DB
client.connect()
  .then(res => {
    console.log(`\nConnected to the DB! Drop ${tableName} table if exists`, Date.now() - start, ' ms\n');

    return client.query(`
      DROP TABLE IF EXISTS ${tableName};
    `)
  })
  .then(res => {
    console.log(`\nSuccessfully dropped ${tableName} table! Now create it`, Date.now() - start, ' ms\n');

    return client.query(`
      CREATE TABLE ${tableName} (
        id SERIAL,
        player VARCHAR(40),
        team VARCHAR(40),
        position VARCHAR(10),
        status VARCHAR(10),
        PRIMARY KEY (id)
      );
    `)
  })
  .then(async (res) => {
    console.log(`\nCreated ${tableName} table, now to fill it!`,Date.now() - start, ' ms\n')

    for (let char of alphabet) {
      console.log(char);
      await scrape(char);
    }
    return 1+1;
  })
  .then(res => {
    console.log(`Scraped the webpage!`, Date.now() - start, ' ms');
    client.end();
  })
  .catch(err => {
    console.log(`Error in creating ${tableName} table: `, err);
    client.end();
  });

