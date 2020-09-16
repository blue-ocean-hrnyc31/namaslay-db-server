const router = require('express').Router();
const controllers = require('./controllers/index.js');

router.get('/', (req, res) => {
    console.log(`Received API request for /`);
    res.send(`You have reached the Namaslay server!`);
});
router.get('/leaders', controllers.leaderboard.getLeaders);
router.post('/events', controllers.events.postEvent);
router.get('/events', controllers.events.getAllEvents);

router.put('/asana-river/user/:user_id', controllers.river.updateUsersRiverStatus)
router.put('/meditation-river/user/:user_id', controllers.river.updateUsersRiverStatus)
router.get('/asana-river/users/:current_river', controllers.river.getAllUsers)
router.get('/meditation-river/users/:current_river', controllers.river.getAllUsers)

router.get('/asana-river/chat', controllers.river.fetchChatStream)
router.post('/asana-river/chat', controllers.river.postToChatStream)
// router.get('/meditation-river/chat', controllers.river.updateUsersRiverStatus)
// router.post('/meditation-river/chat', controllers.river.getAllUsers)

module.exports = router;
