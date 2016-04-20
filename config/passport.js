/*
  This is where we configure Strategy for Facebook login
  (and/or other passport login method)
*/

// load passport
var FacebookStrategy = require('passport-facebook').Strategy;
var FacebookTokenStrategy = require('passport-facebook-token');
var BearerStrategy = require('passport-http-bearer').Strategy;

// load model and service
var User       = require('../models/user');
var UserService = require('../services/user');

// load the auth variables
var configAuth = require('./auth');
var request = require('request');
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
  // FACEBOOK WEB================================================================
  // =========================================================================
  passport.use(new FacebookStrategy({
      // pull in our app id and secret from our auth.js file
      clientID        : configAuth.facebookAuth.clientID,
      clientSecret    : configAuth.facebookAuth.clientSecret,
      callbackURL     : configAuth.facebookAuth.callbackURL,
      profileFields   : ["emails", "displayName"]
    },
    function (token, refreshToken, profile, done) {
      loginOrCreateProfile(token, refreshToken, profile, done);
    }
  ));

  // =========================================================================
  // FACEBOOK CLIENT APP======================================================
  // =========================================================================
  passport.use(new FacebookTokenStrategy({
      clientID: configAuth.facebookAuth.clientID,
      clientSecret: configAuth.facebookAuth.clientSecret
    },
    function (token, refreshToken, profile, done) {
      loginOrCreateProfile(token, refreshToken, profile, done);
    }
  ));

  // =========================================================================
  // TOKEN BEARER======================================================
  // =========================================================================
  passport.use(
    new BearerStrategy(
      function(token, done) {
        console.log(token);
        User.findOne({ 'facebook.token':  token},
          function(err, user) {
            if(err) {
              return done(err);
            }
            if(!user) {
              return done(null, false);
            }
            return done(null, user, { scope: 'all' });
          }
        );
      }
    )
  );

    // facebook will send back the token and profile
  function loginOrCreateProfile(token, refreshToken, profile, done) {
    // Get images && friend list
    console.log(profile);
    // asynchronous
    console.log(token);
    // request("https://graph.facebook.com/me/friends?access_token=" + token, function(err, r, body) {
      // console.log(err, body);
      // console.log("Got stuff!");
    // });
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
          user.facebook.token = token;
          user.save(function(err,doc) {
            return done(null, user); // user found, return that user
          });
        } else {

          console.log('No User Found. Creating new user');

          profile.token = token;

          UserService.create({
              'profile':profile
            },function(err,user) {
              if (err){
                console.log('Passport error:' + err);
                throw err;
              }
              console.log('Save Facebook User to DB');
              return done(null, user);
          });
        }

      });
    });

  }

};
