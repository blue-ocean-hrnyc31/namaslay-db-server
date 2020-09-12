const pool = require('../Pool.js');

module.exports = {
    getUsers: () => {
        let q = 'SELECT * FROM users';
        return pool.connect()
            .then(client => {
                return client.query(q);
            })
            .then(res => {
                return res;
            })
            .catch(err => console.log(err));
    }
}