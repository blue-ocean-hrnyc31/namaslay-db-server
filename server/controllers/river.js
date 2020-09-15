const models = require("../models");

module.exports = {
  getAllUsers: (req, res) => {
    console.log(req.params)
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
    console.log(req.body)
    console.log(req.params)
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
};
