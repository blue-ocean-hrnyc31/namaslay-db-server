const { rivers } = require("../models");

module.exports = {
  getAllUsers: (req, res) => {
    const river = req.query.river;
    rivers
      .readAllUsers(river)
      .then((data) => {
        res.status(200).json(data.rows);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  },
  UpdateUsersRiverStatus: (req, res) => {
    const id = req.query.river;
    const { current_river, current_activity, total_mins } = req.body;
    const params = [id, current_river, current_activity, total_mins || 0];
    rivers
      .updateUserEntry(params)
      .then((data) => {
        res.sendStatus(201);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  },
};
