const router = require('express').Router();
const controllers = require('./controllers/index.js');

router.get('/', (req, res) => {
    console.log(`Received API request for /`);
    res.send(`You have reached the Namaslay server!`);
});
router.get('/leaders', controllers.leaderboard.getLeaders);
router.post('/events', controllers.events.postEvent);
router.get('/events', controllers.events.getAllEvents);

module.exports = router;
