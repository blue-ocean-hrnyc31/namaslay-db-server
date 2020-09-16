const models = require('../models');

module.exports = {
  getActiveUsers: (req, res) => {
    console.log('Trigger active user request');
    models.activeUserModel
      .getAllActiveUsers()
      .then((qResponse) => {
        res.send(qResponse.rows);
      })
      .catch((err) => {
        console.log(error);
        res.sendStatus(500);
      });
  },
};
