var User = require('../models/user');

var index = function(params,callback) {
  var validatedRequest = validate(params.req);
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
  var validatedRequest = validate(params.req);
  if (validatedRequest.valid == true) {
    console.log('findById');
    User.findById(params.req.params.id, function(err,user) {
      callback(err,user);
    });
  }
  else{
    callback(validatedRequest.error);
  }
}

var update = function(params,callback) {
  var validatedRequest = validate(params.req);
  if (validatedRequest.valid == true) {
    var update = {};
    var params = {
      'new': true
    };

    if (params.req.body.name)
      update.name = params.req.body.name;
    if (params.req.body.age)
      update.age = params.req.body.age;
    if (params.req.body.height)
      update.height = params.req.body.height;
    if (params.req.body.height)
      update.weight = params.req.body.weight;

    User.findOneAndUpdate(params.req.params.id, update, params, function(err,user) {
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
    var validatedRequest = validate(params.req);
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
  var validatedRequest = validate(params.req);
  if (validatedRequest.valid == true) {
    User.remove({
      _id: params.req.params.id
    }, function(err, user) {
      callback(err,user)
    });
  }
  else{
    callback(validatedRequest.error);
  }
}

function validate(req){
  console.log('validateRequest');
  var result = {'valid': true};
  //check if valid ObjectId, proceed to findByID
  if (req.params.id && !req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    console.log('Invalid ObjectId');
    result.valid = false;
    result.error = 'Invalid ObjectId';
  }
  return result;
}

module.exports = {
  index: index,
  show: show,
  create: create,
  update: update,
  destroy: destroy
}
