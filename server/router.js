const router = require('express').Router();
const controllers = require('./controllers/index.js');


router.get('your/route', controllers.yourcontrollers.yourRoute);
router.get('/leaders', controllers.leaderboard.getLeaders);

module.exports = router;
