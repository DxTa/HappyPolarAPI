// config/passport.js

// load all the things we need
var FacebookStrategy = require('passport-facebook').Strategy;

// load up the user model
var User       = require('../models/user');

// load the auth variables
var configAuth = require('./auth')
;
module.exports = function(passport) {

  // used to serialize the user for the session
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
  
  // code for login (use('local-login', new LocalStategy))
  // code for signup (use('local-signup', new LocalStategy))

  // =========================================================================
  // FACEBOOK ================================================================
  // =========================================================================
  passport.use(new FacebookStrategy({
    // pull in our app id and secret from our auth.js file
    clientID        : configAuth.facebookAuth.clientID,
    clientSecret    : configAuth.facebookAuth.clientSecret,
    callbackURL     : configAuth.facebookAuth.callbackURL,
    profileFields   : ["emails", "displayName"]
  },

  // facebook will send back the token and profile
  function(token, refreshToken, profile, done) {
    console.log('token:'+token);
    console.log('refreshToken:'+refreshToken);
    console.log('profile:'+JSON.stringify(profile));
    console.log('done:'+done);
    // asynchronous
    process.nextTick(function() {
      console.log('nextTick');
      // find the user in the database based on their facebook id
      User.findOne({ 'facebook.id' : profile.id }, function(err, user) {
        console.log('findOne');
        // if there is an error, stop everything and return that
        // ie an error connecting to the database
        if (err)
          return done(err);

        // if the user is found, then log them in
        if (user) {
          console.log('Existing User Found!');
          return done(null, user); // user found, return that user
        } else {

          console.log('No User Found. Creating new user');
            // if there is no user found with that facebook id, create them
          var newUser            = new User();

          // set all of the facebook information in our user model
          newUser.facebook.id    = profile.id; // set the users facebook id                   
          newUser.facebook.token = token; // we will save the token that facebook provides to the user                    
          newUser.facebook.name = profile.displayName; // look at the passport user profile to see how names are returned
          newUser.facebook.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first

          // save our user to the database
          newUser.save(function(err) {
            if (err)
                throw err;

            // if successful, return the new user

            console.log('Save User to DB');
            return done(null, newUser);
          });
        }

      });
    });

  }));

};