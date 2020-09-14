const router = require('express').Router();
const controllers = require('./controllers/index.js')

router.get('/events', controllers.events.getAllEvents);
router.post('/event', controllers.events.postEvent);

module.exports = router;