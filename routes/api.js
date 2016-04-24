var express = require('express');
var router = express.Router();
var passport = require('passport');

//routes
router.use('/auth', require('./api/auth'));
router.use('/users', require('./api/users'));
router.use('/exercises', require('./api/exercises'));
router.use('/sessions', require('./api/sessions'));

module.exports = router;
