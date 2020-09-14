const models = require('../models');

module.exports = {
  getLeaders: (req, res) => {
    console.log('triggered controllers.getLeaders');
    models.leaderboard
      .readLeaders()
      .then((qResponse) => {
        res.send(qResponse.rows);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  },
};
