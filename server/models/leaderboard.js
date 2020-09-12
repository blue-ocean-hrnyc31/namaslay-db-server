const pool = require("../Pool.js");

module.exports = {
  getUsers: () => {
    let q =
      "SELECT first_name, last_name, visit_count, total_mins FROM users ORDER BY total_mins DESC";
    return pool
      .connect()
      .then((client) => {
        return client.query(q);
      });
  },
};
