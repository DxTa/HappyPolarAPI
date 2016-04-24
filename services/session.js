var Session = require('../models/session');
var Utils = require('../services/utils');

var index = function(params,callback) {
  var validatedRequest = Utils.validate(params.req);
  if (validatedRequest.valid == true) {
    console.log("index");
    var query = {};
    //check filter params and add to query
    if (params.req.query.from_time) {      
        query.end_time = {"$gte": params.req.query.from_time};      
      if (params.req.query.to_time) {
        query.start_time = {"$lte": params.req.query.to_time};
      }
    }
    if (params.req.params.userId) {
      query.user_id = params.req.params.userId;
    }
    //execute query
    Session.find(query, function(err,sessions) {
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
    console.log("show");
    if (params.req.params.userId) {
      //show Session by sessionId
      console.log('findById sessionId');
      Session.find({"user_id":params.req.params.id}, function(err,session) {
        callback(err,session);
      });
    }
    else {
      //show Session by userId
      console.log('findById userId');
      Session.findById(params.req.params.id, function(err,session) {
        callback(err,session);
      });
    }
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
    //userId from request body OR from url (/users/:userId/sessions)
    if (params.req.body.user_id) // from body
      update.user_id = params.req.body.user_id;
    else if (params.req.params.userId) // from url
      update.user_id = params.req.params.userId;
    if (params.req.body.exercise_id)
      update.exercise_id = params.req.body.exercise_id;
    if (params.req.body.start_time)
      update.start_time = params.req.body.start_time;
    if (params.req.body.end_time)
      update.end_time = params.req.body.end_time;
    if (params.req.body.slot) {
      update.slot = [];    
      var slotObj = params.req.body.slot;
      for (var i = 0; i < slotObj.length; i++) {     
        update.slot.push(slotObj[i]);
      }
    }
    if (params.req.body.heart_rate) {     
      var heartRateObj = params.req.body.heart_rate;
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
      //userId from request body OR from url (/users/:userId/sessions)
      if (params.req.body.user_id) // from body
        session.user_id = params.req.body.user_id;
      else if (params.req.params.userId) // from url
        session.user_id = params.req.params.userId;
      if (params.req.body.exercise_id)
        session.exercise_id = params.req.body.exercise_id;
      if (params.req.body.start_time)
        session.start_time = params.req.body.start_time;
      if (params.req.body.end_time)
        session.end_time = params.req.body.end_time;
      if (params.req.body.slot) {
        session.slot = [];
        var slotObj = params.req.body.slot;
        for (var i = 0; i < slotObj.length; i++) {
          session.slot.push(slotObj[i]);
        }
      }
      if (params.req.body.heart_rate) {
        var heartRateObj = params.req.body.heart_rate;
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
