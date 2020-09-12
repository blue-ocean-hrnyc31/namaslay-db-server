const router = require('express').Router();
const controllers = require('./controllers/index.js')

router.get('your/route', controllers.yourcontrollers.yourRoute);

module.exports = router;