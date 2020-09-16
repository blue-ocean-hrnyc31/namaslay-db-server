const pool = require('../Pool.js');

module.exports = {
  getAllActiveUsers: () => {
    let query = `SELECT COUNT(user_id) FROM users WHERE current_river IS NOT NULL`;

    return pool
      .connect()
      .then((client) => {
        return client
          .query(q)
          .then((res) => {
            client.release();
            return res;
          })
          .catch((err) => {
            client.release();
            console.log(`Error in query for active user`, err);
          });
      })
      .catch((err) => {
        console.log(`Error getting all active users`);
      });
  },
};
