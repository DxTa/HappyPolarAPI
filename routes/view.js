var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET home page. */
router.get('/profile', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/exercises', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/home', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/exercises/:id/sessions', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET User Profile page. */
router.get('/users', function(req, res, next) {
 res.render('users', {
    title: 'User Profile',
   user: req.user
 });
});

/* GET doc page. */
router.get('/doc', function(req, res, next) {
  res.render('doc');
});

// route for logging out
router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});


// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();
    // if they aren't redirect them to the home page
    res.redirect('/');
}


module.exports = router;
