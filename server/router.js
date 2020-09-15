const router = require('express').Router();
const controllers = require('./controllers/index.js');

router.get('/', (req, res) => {
    console.log(`Received API request for /`);
    res.send(`You have reached the Namaslay server!`);
});
router.get('/leaders', controllers.leaderboard.getLeaders);
router.post('/events', controllers.events.postEvent);
router.get('/events', controllers.events.getAllEvents);

router.patch('/asana-river/user/:user_id', controllers.rivers.UpdateUsersRiverStatus)
router.patch('/meditation-river/user/:user_id', controllers.rivers.UpdateUsersRiverStatus)
router.get('/asana-river/users/:river', controllers.rivers.getAllUsers)
router.get('/meditation-river/users/:river' controllers.rivers.getAllUsers)


module.exports = router;
