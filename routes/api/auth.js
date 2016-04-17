var passport = require('passport');
var request = require("request");

// =====================================
// FACEBOOK ROUTES =====================
// =====================================
// route for facebook authentication and login


module.exports = function(router) {

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
  router.get('/auth/facebook', passport.authenticate('facebook', { scope : ['email','user_friends','public_profile'] }));

  // handle the callback after facebook has authenticated the user
  router.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
      successRedirect : '/users',
      failureRedirect : '/'
    })
  );

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
};
