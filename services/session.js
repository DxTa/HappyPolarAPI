var Session = require('../models/session');
var Utils = require('../services/utils');

var index = function(params,callback) {
  var validatedRequest = Utils.validate(params.req);
  if (validatedRequest.valid == true) {
    Session.find(function(err,sessions) {
      callback(err,sessions);
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
    Session.findById(params.req.params.id, function(err,session) {
      callback(err,session);
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
    if (params.req.body.user_id)
      update.user_id = params.req.body.user_id;
    if (params.req.body.exercise_id)
      update.exercise_id = params.req.body.exercise_id;
    if (params.req.body.start_time)
      update.start_time = params.req.body.start_time;
    if (params.req.body.end_time)
      update.end_time = params.req.body.end_time;
    if (params.req.body.slot) {
      update.slot = [];    
      var slotObj = JSON.parse(params.req.body.slot);
      for (var i = 0; i < slotObj.length; i++) {     
        update.slot.push(slotObj[i]);
      }
    }
    if (params.req.body.heart_rate) {     
      var heartRateObj = JSON.parse(params.req.body.heart_rate);
      update.heart_rate = {
        min: heartRateObj.min,
        max: heartRateObj.max,
        average: heartRateObj.average
      };
    }
    if (params.req.body.calories)
      update.calories = params.req.body.calories;

    Session.findOneAndUpdate({"_id":params.req.params.id}, update, options, function(err,session) {
      callback(err,session);
    });
  }
  else{
    callback(validatedRequest.error);
  }
}

var create = function(params,callback) {
  var session = new Session();
  if (params.req) {
    var validatedRequest = Utils.validate(params.req);
    if (validatedRequest.valid == true) {
      if (params.req.body.user_id)
        session.user_id = params.req.body.user_id;
      if (params.req.body.exercise_id)
        session.exercise_id = params.req.body.exercise_id;
      if (params.req.body.start_time)
        session.start_time = params.req.body.start_time;
      if (params.req.body.end_time)
        session.end_time = params.req.body.end_time;
      if (params.req.body.slot) {
        session.slot = [];    
        var slotObj = JSON.parse(params.req.body.slot);
        for (var i = 0; i < slotObj.length; i++) {     
          session.slot.push(slotObj[i]);
        }
      }
      if (params.req.body.heart_rate) {     
        var heartRateObj = JSON.parse(params.req.body.heart_rate);
        session.heart_rate = {
          min: heartRateObj.min,
          max: heartRateObj.max,
          average: heartRateObj.average
        };
      }
      if (params.req.body.calories)
        session.calories = params.req.body.calories;
    }
    else{
      callback(validatedRequest.error);
    }
  }
  // save session and check for errors
  session.save(function(err, session) {
    callback(err,session);
  });
}

var destroy = function(params,callback) {
  var validatedRequest = Utils.validate(params.req);
  if (validatedRequest.valid == true) {
    Session.remove({
      _id: params.req.params.id
    }, function(err, session) {
      callback(err,session)
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
