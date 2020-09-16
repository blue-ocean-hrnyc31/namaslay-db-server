const pool = require("../Pool.js");

module.exports = {
  readAllUsers: (current_river) => {
    let queryStr = `SELECT username, current_activity, location FROM users WHERE current_river = $1`;
    return pool
      .connect()
      .then((client) => {
        return client.query(queryStr, current_river);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  updateUserEntry: (params) => {
    let queryStr = `UPDATE users
    SET current_river = $2,
    current_activity= $3,
    total_mins = total_mins + $4,
    visit_count = visit_count + 1
    WHERE user_id = $1`;
    return pool
      .connect()
      .then((client) => {
        return client.query(queryStr, params);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
