var User = require('../models/user');

var index = function(req,callback) {  
  var validatedRequest = validate(req);
  if (validatedRequest.valid == true) {
    User.find(function(err,users) {
      callback(err,users);
    });
  }
  else{
    callback(validatedRequest.error);
  }  
}

var show = function(req,callback) {
  var validatedRequest = validate(req);
  if (validatedRequest.valid == true) {
    console.log('findById');
    User.findById(req.params.id, function(err,user) {
      callback(err,user);
    });
  }
  else{
    callback(validatedRequest.error);
  }
}

var update = function(req,callback) {
  var validatedRequest = validate(req);
  if (validatedRequest.valid == true) {
    var update = {};
    var options = {
      'new': true
    };

    if (req.body.name)
      update.name = req.body.name;
    if (req.body.age)
      update.age = req.body.age;
    if (req.body.height)
      update.height = req.body.height;
    if (req.body.height)
      update.weight = req.body.weight;

    User.findOneAndUpdate(req.params.id, update, options, function(err,user) {
      callback(err,user);
    });
  }
  else{
    callback(validatedRequest.error);
  }
}

var create = function(req,callback) {
  var validatedRequest = validate(req);
  if (validatedRequest.valid == true) {
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
      callback(err,user);
    });
  }
  else{
    callback(validatedRequest.error);
  }
}

var destroy = function(req,callback) {
  var validatedRequest = validate(req);
  if (validatedRequest.valid == true) {
    User.remove({
      _id: req.params.id
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
