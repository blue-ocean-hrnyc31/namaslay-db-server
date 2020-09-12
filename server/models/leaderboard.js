const pool = require("../Pool.js");

module.exports = {
  getUsers: () => {
    let q =
      "SELECT username, visit_count, total_mins FROM users ORDER BY visit_count DESC LIMIT 5";
    return pool
      .connect()
      .then((client) => {
        return client.query(q);
      })
      .then((res) => {
        return res;
      })
      .catch((err) => console.log(err));
  },
};
