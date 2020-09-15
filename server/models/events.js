const pool = require('../Pool.js');

module.exports = {
    getAllEvents: () => {
        let q = 'SELECT * FROM events';
        return pool.connect()
            .then(client => {
                return client.query(q)
                .then(res => {
                    client.release();
                    return res;
                })
                .catch(err => {
                    client.release();
                    console.log(err.stack);
                })
            })
            .catch(err => {
                console.log(`Error in connecting to DB (get events):`, err);
            })

    },

    postEvent: (host, title, description, location, start, end) => {
        console.log('post request in models...');
        let q = 'INSERT INTO events (host, title, description, location, start_time, end_time) VALUES ($1, $2, $3, $4, $5, $6)';
        return pool.connect()
            .then(client => {
                return client.query(q, [host, title, description, location, start, end])
                .then(res => {
                    console.log('post query');
                    client.release();
                    return res;
                })
                .catch(err => {
                    client.release();
                    console.log(err.stack);
                })
            })
            .catch(err => {
                console.log(`Error in connecting to DB (post events):`, err);
            })


    },

    select: (id) => {
        let q = 'SELET * FROM events WHERE id = $1';
        return pool.connect()
            .then(client => {
                return client.query(q, [id])
            })
            .then(res => {
                client.release();
                return res;
            })
            .catch(err => {
                client.release();
                console.log(err.stack);
            })
    }
};
