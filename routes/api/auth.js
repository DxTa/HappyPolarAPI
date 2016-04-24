var express = require('express');
var router = express.Router();

var passport = require('passport');
var request = require("request");

// =====================================
// FACEBOOK ROUTES =====================
// =====================================
// route for facebook authentication and login


/**
* @api {get} /auth/facebook Facebook Web Authentication
* @apiVersion 0.1.0
* @apiName GetFacebook
* @apiGroup Authentication
*
* @apiSuccess successRedirect '/profile'
* @apiError failureRedirect '/'
* @apiSampleRequest off
*/  
// Client App/ Token Authentication
router.get('/facebook', passport.authenticate('facebook', { scope : ['email','user_friends','public_profile'] }));

// handle the callback after facebook has authenticated the user
router.get('/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect : '/users',
    failureRedirect : '/'
  })
);

/**
* @api {post} /auth/facebook/token Facebook App Authentication
* @apiVersion 0.1.0
* @apiHeader {String} Authorization Bearer authorization key.
* @apiName PostFacebookToken
* @apiGroup Authentication
*/
// Client App/ Token Authentication
router.post('/facebook/token',
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

module.exports = router;
