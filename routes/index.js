var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* Profile page. */
router.get('/profile', function(req, res, next) {
  res.render('profile', {
     title: 'Profile',
    user: req.user
  });
});

// =====================================
// FACEBOOK ROUTES =====================
// =====================================
// route for facebook authentication and login

// WEB Authentication
router.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

// handle the callback after facebook has authenticated the user
router.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect : '/profile',
        failureRedirect : '/'
    }));

// route for logging out
router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

// Client App/ Token Authentication
router.post('/auth/facebook/token',
    passport.authenticate('facebook-token'),
    function(req, res) {
      if (req.user){
        // do something with req.user
        res.status(200);
        res.send(req.user);
      }
      else {
        // authentication failed
        res.send(401);
      }
    }
);

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

module.exports = router;
