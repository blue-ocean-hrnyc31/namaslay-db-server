const { events } = require('../models/index.js');

module.exports = {
    getAllEvents: (req, res) => {
        events
        .getAllEvents()
        .then(({rows}) => res.send(rows))
        .catch(err => {
            console.log('getAll events error', err);
            res.sendStatus(404);
        })
    },

    postEvent: (req, res) => {
        const { host, title, description, location, start, end} = req.body;
        events
        .postEvent(host, title, description, location, start, end)
        .then(() => {
            return events.getAllEvents()
        })
        .then(({rows}) => res.send(rows))
        .catch(err => {
            console.log('getAll events error', err);
            res.sendStatus(404);
        })
    }
}
