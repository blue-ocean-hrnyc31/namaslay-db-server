const models = require("../models");
const pool = require("../Pool");

module.exports = {
  getAllUsers: (req, res) => {
    const current_river = [req.params.current_river];
    models.river
      .readAllUsers(current_river)
      .then((data) => {
        res.status(200).json(data.rows);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  },

  updateUsersRiverStatus: (req, res) => {
    const id = req.params.user_id;
    const { current_river, current_activity, total_mins } = req.body;
    const params = [id, current_river, current_activity, total_mins || 0];
    models.river
      .updateUserEntry(params)
      .then(() => {
        res.sendStatus(201);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  },

  fetchChatStream: (req, res) => {
    console.log(`\nReceived get request for ${req.url}!`);
    const tableName = req.url === '/asana-river/chat' ? 'asanachat' : 'meditationchat';

    pool.connect()
      .then(client => {
        console.log(`Connected to DB!`);

        return client.query(`
          SELECT * FROM ${tableName}
          ORDER BY posted_at DESC LIMIT 20;
        `)
          .then(dbRes => {
            console.log(`Successfully got messages from DB, send to client!\n`);

            res.send(dbRes.rows);
            client.release();
          })
          .catch(err => {
            console.log(`Error in get request for ${tableName}!`, err);

            res.status(404).send(`Error in get request for ${tableName}!`);
            client.release();
          })
      })
      .catch(err => {
        console.log(`Error in getting client from pool!`, err);
        res.sendStatus(404);
      })


  },

  postToChatStream: (req, res) => {
    console.log(`Received post request for ${req.url}!`, req.body);
    const tableName = req.url === '/asana-river/chat' ? 'asanachat' : 'meditationchat';


    pool.connect()
      .then(client => {
        console.log(`Connected to DB!`);

        return client.query(`
          INSERT INTO ${tableName} (
            username,
            content,
            posted_at
          ) VALUES (
            $1,
            $2,
            $3
          );
        `, [req.body.currentUser, req.body.message, req.body.submitTime])
          .then(dbRes => {
            console.log(`Successfully posted message in DB! Tell client 201!\n`);

            client.release();
            res.send(201);
          })
          .catch(err => {
            console.log(`Error in post request for ${tableName}!`, err);

            client.release();
            res.status(404).send(`Error in post request for ${tableName}!`);
          })
      })
      .catch(err => {
        console.log(`Error in getting client from pool!`, err);

        res.sendStatus(404);
      })

  },
};
