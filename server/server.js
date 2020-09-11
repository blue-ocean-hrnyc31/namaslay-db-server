const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 4444;
const cors = require('cors')


// host: 'the-name-for-my-postgres-container-within-the-docker-compose-yml-file'
const { Client, Pool } = require('pg');
const client = new Client({
  user: 'postgres',
  host: 'db', // Uses docker network to connect
  database: 'postgres',
  password: 'password',
  port: 5432,
});
client.connect()
  .catch(err => {
    console.log('Could NOT connect to the DB!', err);
  });


/***********************************************************/
/*************************Middleware************************/
/***********************************************************/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(cors());
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
  next();
});


/***********************************************************/
/*************************Routes****************************/
/***********************************************************/
app.get('/', (req, res) => {
  console.log(`Received API request for /`);
  res.send(`You have reached the Namaslay server!`);
})


app.get('/users', (req, res) => {
  console.log(`Received API request for /users`);
  console.log(req.query);
  client.query(`
        SELECT * FROM users;
      `)
    .then(dbObj => {
      console.log(`Successfully retrieved info from DB`, Object.keys(dbObj));

      res.send(dbObj);
    })
    .catch(err => {
      console.log('Error in retrieving info from DB: ', err);
      res.sendStatus(404);
    });
})


/********************/
/*****Start-Up*******/
/********************/
app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});