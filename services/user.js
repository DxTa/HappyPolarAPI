var User = require('../models/user');
var Utils = require('../services/utils');

var index = function(params,callback) {
  var validatedRequest = Utils.validate(params.req);
  if (validatedRequest.valid == true) {
    User.find(function(err,users) {
      callback(err,users);
    });
  }
  else{
    callback(validatedRequest.error);
  }  
}

var show = function(params,callback) {
  var validatedRequest = Utils.validate(params.req);
  if (validatedRequest.valid == true) {
    console.log('findById');
    User.findById(params.req.params.userId, function(err,user) {
      callback(err,user);
    });
  }
  else{
    callback(validatedRequest.error);
  }
}

var update = function(params,callback) {
  var validatedRequest = Utils.validate(params.req);
  if (validatedRequest.valid == true) {
    var update = {};
    var options = {
      'new': true,
      'runValidators': true
    };
    if (params.req.body.name)
      update.name = params.req.body.name;
    if (params.req.body.age)
      update.age = params.req.body.age;
    if (params.req.body.height)
      update.height = params.req.body.height;
    if (params.req.body.height)
      update.weight = params.req.body.weight;
    if (params.req.body.gender)
      update.gender = params.req.body.gender;

    User.findOneAndUpdate({"_id":params.req.params.userId}, update, options, function(err,user) {
      callback(err,user);
    });
  }
  else{
    callback(validatedRequest.error);
  }
}

var create = function(params,callback) {
  var user = new User();
  // If create with POST
  if (params.req) {
    var validatedRequest = Utils.validate(params.req);
    if (validatedRequest.valid == true) {
      // create a new instance of the Bear model
      if (params.req.body.name)
        user.name = params.req.body.name;
      if (params.req.body.age)
        user.age = params.req.body.age;
      if (params.req.body.height)
        user.height = params.req.body.height;
      if (params.req.body.height)
        user.weight = params.req.body.weight;
      if (params.req.body.gender)
        user.gender = params.req.body.gender;
    }
    else{
      callback(validatedRequest.error);
    }
  }

  // If create with Facebook Authentication
  if (params.profile) {
    user.facebook.id    = params.profile.id;
    user.facebook.token = params.profile.token;
    user.facebook.name = params.profile.displayName;
    user.facebook.email = params.profile.emails[0].value;
    // Fill in user name with Facebook name
    user.name = params.profile.displayName;
  }
  // save user and check for errors
  user.save(function(err, user) {
    callback(err,user);
  });  
}

var destroy = function(params,callback) {
  var validatedRequest = Utils.validate(params.req);
  if (validatedRequest.valid == true) {
    User.remove({
      _id: params.req.params.userId
    }, function(err, user) {
      callback(err,user)
    });
  }
  else{
    callback(validatedRequest.error);
  }
}

module.exports = {
  index: index,
  show: show,
  create: create,
  update: update,
  destroy: destroy
}
