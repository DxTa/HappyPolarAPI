var express = require('express');
var router = express.Router();
var User = require('../models/user');

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
router.get('/', function(req, res, next) {
  console.log('find ALL');
  User.find(function(err,users) {
    if (err) {
      console.log('error:'+err);
      res.status(404);
      res.json({ error: 'UserNotFound' });
    }
    console.log('error:'+err);
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
 *       "error": "UserNotFound"
 *     }
 */
router.get('/:id', function(req, res, next) {
  console.log('find One');
  User.findById(req.params.id, function(err,user) {
    if (err) {
      console.log('error:'+err);
      res.status(404);
      res.render('UserNotFound');
    }
    res.json(user);
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
router.put('/:id', function(req, res, next) {
  var update = {};
  var options = {
     'new': true 
  };
  console.log(req.body);
  if (req.body.name)
    update.name = req.body.name;
  if (req.body.age)
    update.age = req.body.age;
  if (req.body.height)  
    update.height = req.body.height;
  if (req.body.height)   
    update.weight = req.body.weight;
  console.log(update);
  User.findOneAndUpdate(req.params.id, update, options, function(err,user) {
    if (err) {
      console.log('error:'+err);
      res.status(404);
      res.json({ error: 'UserNotFound' });
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
router.post('/', function(req, res, next) {        
  var user = new User();      // create a new instance of the Bear model
  if (req.body.name)
    user.name = req.body.name;
  if (req.body.age)
    user.age = req.body.age;
  if (req.body.height)  
    user.height = req.body.height;
  if (req.body.height)   
    user.weight = req.body.weight;
  // save the bear and check for errors
  user.save(function(err, user) {
      if (err)
          res.send(err);
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
 *       "error": "UserNotFound"
 *     }
 */
router.delete('/:id', function(req, res, next) {
  User.remove({
      _id: req.params.id
  }, function(err, user) {
    if (err) {
  console.log('error:'+err);
      res.status(404);
      res.json({ error: 'UserNotFound' });
    }
    res.json({ message: 'Successfully deleted' });
  });
});

module.exports = router;
