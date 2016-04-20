var express = require('express');
var router = express.Router();
var passport = require('passport');

//routes
require('./api/auth')(router);
require('./api/users')(router);
require('./api/exercises')(router);
require('./api/sessions')(router);

module.exports = router;
