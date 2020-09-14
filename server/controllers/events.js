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
        console.log('post event in controllers');
        const { host, title, description, location, start, end} = req.body;
        events
        .postEvent(host, title, description, location, start, end)
        .then(() => res.sendStatus(204))
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        })
        // .then(() => {
        //     return events.getAllEvents()
        // })
        // .then(({rows}) => res.send('working'))
        // .catch(err => {
        //     console.log('getAll events error', err);
        //     res.sendStatus(404);
        // })
    }
}
