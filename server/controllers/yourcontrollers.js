
const models = require('../models/index.js');
const pool = require('../Pool.js');



module.exports ={
    yourRoute: (req, res) => {
        models.yourmodel.getUsers()
        .then(({rows}) => {
            res.send(rows);
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(500)
        })
    },

    otherRoute: (req, res) => {
        let q = 'SELECT * FROM users';
        pool.query(q)
        .then(({rows}) => {
            res.send(rows);
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(500)
        })
    }
}