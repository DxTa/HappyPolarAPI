var User = require('../models/user');

var index = function(req,callback) {
  User.find(function(err,users) {
    callback(err,users);
  });
}

var show = function(req,callback) {
  User.findById(req.params.id, function(err,user) {
    callback(err,user);
  });
}

var update = function(req,callback) {
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

var create = function(req,callback) {
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

var destroy = function(req,callback) {
  User.remove({
    _id: req.params.id
  }, function(err, user) {
    callback(err,user)
  });
}

module.exports = {
  index: index,
  show: show,
  create: create,
  update: update,
  destroy: destroy
}
