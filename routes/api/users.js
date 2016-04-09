var passport = require('passport');
var UserService = require('../../services/user');

module.exports = function(router) {
  /**
  * @api {get} /users Get All User
  * @apiVersion 0.1.0
  * @apiName GetUsers
  * @apiGroup User
  *
  *
  * @apiSuccessExample Success-Response:
  *   HTTP/1.1 200 OK
  *
  *     [
  *       {
  *       "name"        : "John Doe",
  *       "age"         : 24,
  *       "height"      : 175,
  *       "weight"      : 60,
  *       "facebook"         : {
  *         "id"           : "10205575948543560",
  *         "token"        : "CAAHDBKNQaDABAMQIYr",
  *         "email"        : "john.doe@mail.com",
  *         "name"         : "John Doe"
  *       },
  *       ...
  *     ]
  *
  *
  */
  router.get('/users', function(req, res, next) {
    UserService.index(req,function(err,users) {
      if (err) {
        console.log('error:'+err);
        res.status(404);
        res.json({ error: err });
      }
      res.json(users);
    });
  });


  /**
  * @api {get} /users/:id Get a single User information
  * @apiVersion 0.1.0
  * @apiName GetUser
  * @apiGroup User
  *
  * @apiParam {String} id User ID.
  *
  * @apiSuccessExample Success-Response:
  *   HTTP/1.1 200 OK
  *   {
  *     "name"        : "John Doe",
  *     "age"         : 24,
  *     "height"      : 175,
  *     "weight"      : 60,
  *     "facebook"         : {
  *       "id"           : "10205575948543560",
  *       "token"        : "CAAHDBKNQaDABAMQIYr",
  *       "email"        : "john.doe@mail.com",
  *       "name"         : "John Doe"
  *     }
  *   }
  *
  * @apiErrorExample Error-Response:
  *     HTTP/1.1 404 Not Found
  *     {
  *       "error": "Error Message"
  *     }
  */
  router.get('/users/:id', function(req, res, next) {
    UserService.show(req, function(err,user) {
      if (err) {
        console.log('error:'+err);
        res.status(404);
        res.json({ error: err });
      }
      else {
        res.json(user);
      }
    });
  });

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
  *
  * @apiSuccessExample Success-Response:
  *   HTTP/1.1 200 OK
  *   {
  *     [updatedUser]
  *   }
  *
  *   @apiErrorExample Error-Response:
  *     {
  *       "error": "Error Message"
  *     }
  */
  router.put('/users/:id', function(req, res, next) {
    UserService.update(req,function(err,user) {
      if (err) {
        console.log('error:'+err);
        res.status(404);
        res.json({ error: err });
      }
      res.json(user);
    });
  });

  /**
  * @api {post} /users Create a new User
  * @apiVersion 0.1.0
  * @apiName PostUser
  * @apiGroup User
  *
  * @apiParam {String} name User new name.
  * @apiParam {Number} age User new age.
  * @apiParam {Number} height User new height.
  * @apiParam {Number} weight User new weight.
  *
  * @apiSuccessExample Success-Response:
  *   HTTP/1.1 200 OK
  *   {
  *     message: "User created!",
  *     user: [updatedUser]
  *   }
  *
  *   @apiErrorExample Error-Response:
  *     {
  *       "error": "Error Message"
  *     }
  */
  router.post('/users/', function(req, res, next) {
    UserService.create(function(err, user) {
      if (err){        
        console.log('error:'+err);
        res.status(404);
        res.json({ error: err });
      }
      res.json({
        message: 'User created!',
        user: user
      });
    });
  });

  /**
  * @api {delete} /users/:id Delete a single User
  * @apiVersion 0.1.0
  * @apiName DeleteUser
  * @apiGroup User
  *
  * @apiParam {String} id User ID.
  *
  * @apiSuccessExample Success-Response:
  *   HTTP/1.1 200 OK
  *   {
  *     "message": "Successfully deleted"
  *   }
  *
  * @apiErrorExample Error-Response:
  *     HTTP/1.1 404 Not Found
  *     {
  *       "error": "Error Message"
  *     }
  */
  router.delete('/users/:id', function(req, res, next) {
    UserService.destroy(req, function(err, user) {
      if (err) {
        console.log('error:'+err);
        res.status(404);
        res.json({error: err});
      }
      res.json({ message: 'Successfully deleted' });
    });
  });
}
