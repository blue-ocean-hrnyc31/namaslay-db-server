
const models = require('../models/index.js');
const pool = require('../../database/index.js');



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
    }
}