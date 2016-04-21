var passport = require('passport');
var UserService = require('../../services/user');
var SessionService = require('../../services/session');
//nested routers for session
//pass {mergeParams: true} if want to access the params from the parent router.
var express = require('express');
var sessionRouter = express.Router({mergeParams: true});

module.exports = function(router) {   

  /*
  *  Nested Session resource
  */
  // nest Session router by attaching it as muserIddleware
  router.use('/users/:userId/sessions', sessionRouter);

  router.route('/users')
    /**
    * @api {get} /users Get All User
    * @apiVersion 0.1.0
    * @apiHeader {String} Authorization Bearer authorization key.
    * @apiName GetUsers
    * @apiGroup User
    */
    .get(passport.authenticate('bearer', { session: false }),function(req, res, next) {
      console.log('GET /users');
      UserService.index({
          'req': req
        },function(err,users) {
        if (err) {
          console.log('error:'+err);
          res.status(404);
          res.json({ error: err });
        }
        else {
          res.json(users);
        }
      });
    })

    /**
    * @api {post} /users Create a new User
    * @apiVersion 0.1.0
    * @apiHeader {String} Authorization Bearer authorization key.    * @apiName PostUser
    * @apiGroup User
    *
    * @apiParam {String} name User name.
    * @apiParam {Number} age User age.
    * @apiParam {Number} height User  height.
    * @apiParam {Number} weight User weight.
    * @apiParam {String} gender User gender.
    */
    .post(function(req, res, next) {
      UserService.create({
          'req': req
        }, function(err, user) {
        if (err){
          console.log('error:'+err);
          res.status(404);
          res.json({ error: err });
        }
        else {
          res.json({
            message: 'User created!',
            user: user
          });
        }
      });
    });

  router.route('/users/:userId')
    /**
    * @api {get} /users/:userId Get a single User information
    * @apiVersion 0.1.0
    * @apiHeader {String} Authorization Bearer authorization key.
    * @apiName GetUser
    * @apiGroup User
    *
    * @apiParam {String} userId User ID.
    */
    .get(passport.authenticate('bearer', { session: false }),function(req, res, next) {
      UserService.show({
          'req': req
        }, function(err,user) {
        if (err) {
          console.log('error:'+err);
          res.status(404);
          res.json({ error: err });
        }
        else {
          res.json(user);
        }
      });
    })
    /**
    * @api {put} /users/:userId update an User
    * @apiVersion 0.1.0
    * @apiHeader {String} Authorization Bearer authorization key.
    * @apiName PutUser
    * @apiGroup User
    *
    * @apiParam {String} userId User ID.
    * @apiParam {String} name User new name.
    * @apiParam {Number} age User new age.
    * @apiParam {Number} height User new height.
    * @apiParam {Number} weight User new weight.
    * @apiParam {String} gender User new gender.
    */
    .put(passport.authenticate('bearer', { session: false }),function(req, res, next) {
      UserService.update({
          'req': req
        }, function(err,user) {
        if (err) {
          console.log('error:'+err);
          res.status(404);
          res.json({ error: err });
        }
        else {
          res.json(user);
        }
      });
    })
    /**
    * @api {delete} /users/:userId Delete a single User
    * @apiVersion 0.1.0
    * @apiHeader {String} Authorization Bearer authorization key.
    * @apiName DeleteUser
    * @apiGroup User
    *
    * @apiParam {String} userId User ID.
    */
    .delete(passport.authenticate('bearer', { session: false }),function(req, res, next) {
      UserService.destroy({
          'req':req
        }, function(err, user) {
        if (err) {
          console.log('error:'+err);
          res.status(404);
          res.json({error: err});
        }
        else {
          res.json({ message: 'Successfully deleted' });
        }
      });
    });


    sessionRouter.route('/')
    /**
    * @api {get} /users/:userId/sessions Get All Session of an User
    * @apiVersion 0.1.0
    * @apiHeader {String} Authorization Bearer authorization key.
    * @apiName GetSessionbyUserId
    * @apiGroup User
    */
      .get(passport.authenticate('bearer', { session: false }),function(req, res, next) {
        console.log('GET /users/:userId/sessions');
        console.log('userId: '+req.params.userId);
        SessionService.show({
            'req': req
          }, function(err,sessions) {
          if (err) {
            console.log('error:'+err);
            res.status(404);
            res.json({ error: err });
          }
          else {
            res.json(sessions);
          }
        });
      });
}
