var Exercise = require('../models/exercise');
var Utils = require('../services/utils');

var index = function(params,callback) {  
  var validatedRequest = Utils.validate(params.req)
  if (validatedRequest.valid == true) {
    Exercise.find(function(err,exercises) {
      callback(err,exercises);
    });
  }
  else{
    callback(validatedRequest.error);
  }
}

var show = function(params,callback) {
  var validatedRequest = Utils.validate(params.req)
  if (validatedRequest.valid == true) {
    console.log('findById');
    Exercise.findById(params.req.params.id, function(err,exercise) {
      callback(err,exercise);
    });
  }
  else{
    callback(validatedRequest.error);
  }
}

var update = function(params,callback) {
  var validatedRequest = Utils.validate(params.req)
  if (validatedRequest.valid == true) {
    var update = {};
    var options = {
      'new': true
    };
    if (params.req.body.name)
      update.name = params.req.body.name;
    if (params.req.body.description)
      update.description = params.req.body.description;
    if (params.req.body.image)
      update.image = params.req.body.image;

    Exercise.findOneAndUpdate({"_id":params.req.params.id}, update, options, function(err,exercise) {
      callback(err,exercise);
    });
  }
  else{
    callback(validatedRequest.error);
  }
}

var create = function(params,callback) {
  var validatedRequest = Utils.validate(params.req)
  if (validatedRequest.valid == true) {
    var exercise = new Exercise();      // create a new instance of the Bear model
    if (params.req.body.name)
      exercise.name = params.req.body.name;
    if (params.req.body.description)
      exercise.description = params.req.body.description;
    if (params.req.body.image)
      exercise.image = params.req.body.image;
    // save the bear and check for errors
    exercise.save(function(err, exercise) {
      callback(err,exercise);
    });
  }
  else{
    callback(validatedRequest.error);
  }
}

var destroy = function(params,callback) {
  var validatedRequest = Utils.validate(params.req)
  if (validatedRequest.valid == true) {
    Exercise.remove({
      _id: params.req.params.id
    }, function(err, exercise) {
      callback(err,exercise)
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
