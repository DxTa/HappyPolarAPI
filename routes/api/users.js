var passport = require('passport');
var UserService = require('../../services/user');

module.exports = function(router) {
  router.route('/users')
    /**
    * @api {get} /users Get All User
    * @apiVersion 0.1.0
    * @apiName GetUsers
    * @apiGroup User
    */
    .get(function(req, res, next) {
      UserService.index({
          'req':req
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
    * @apiName PostUser
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
          'req':req
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
  
  router.route('/users/:id')
    /**
    * @api {get} /users/:id Get a single User information
    * @apiVersion 0.1.0
    * @apiName GetUser
    * @apiGroup User
    *
    * @apiParam {String} id User ID.
    */
    .get(function(req, res, next) {
      UserService.show({
          'req':req
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
    * @api {put} /users/:id update a single User information
    * @apiVersion 0.1.0
    * @apiName PutUser
    * @apiGroup User
    *
    * @apiParam {String} id User ID.
    * @apiParam {String} name User new name.
    * @apiParam {Number} age User new age.
    * @apiParam {Number} height User new height.
    * @apiParam {Number} weight User new weight.
    * @apiParam {String} gender User new gender.
    */
    .put(function(req, res, next) {
      UserService.update({
          'req':req
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
    * @api {delete} /users/:id Delete a single User
    * @apiVersion 0.1.0
    * @apiName DeleteUser
    * @apiGroup User
    *
    * @apiParam {String} id User ID.
    */
    .delete(function(req, res, next) {
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
}
