var express = require('express');
var router = express.Router();
var passport = require('passport');

//routes
require('./api/users')(router);
require('./api/auth')(router);

module.exports = router;
