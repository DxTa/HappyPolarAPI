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
    if (params.req.body.heartRates) {
      var heartRatesObj = JSON.parse(params.req.body.heartRates);
      update.heartRates = [];
      for (var i = 0; i < heartRatesObj.length; i++) {
        update.heartRates[i] = heartRatesObj[i];
      }
    }
    if (params.req.body.location) {
      console.log('location:'+params.req.body.location);        
      var locationObj = JSON.parse(params.req.body.location);
      console.log('lat:'+locationObj.lat);
      console.log('long:'+locationObj.long);
      update.location = {
        lat: locationObj.lat,
        long: locationObj.long
      };
    }
    if (params.req.body.time) {
      var timeObj = JSON.parse(params.req.body.time);
      update.time = [];
      for (var i = 0; i < timeObj.length; i++) {
        update.time[i] = timeObj[i];
      }
    }
    if (params.req.body.pulse)
      update.pulse = params.req.body.pulse;

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
      if (params.req.body.heartRates) {
        var heartRatesObj = JSON.parse(params.req.body.heartRates);
        for (var i = 0; i < heartRatesObj.length; i++) {
          session.heartRates[i] = heartRatesObj[i];
        }
      }
      if (params.req.body.location) {
        console.log('location:'+params.req.body.location);        
        var locationObj = JSON.parse(params.req.body.location);
        console.log('lat:'+locationObj.lat);
        console.log('long:'+locationObj.long);
        session.location = {
          lat: locationObj.lat,
          long: locationObj.long
        };
      }
      if (params.req.body.time) {
        var timeObj = JSON.parse(params.req.body.time);
        for (var i = 0; i < timeObj.length; i++) {
          session.time[i] = timeObj[i];
        }
      }
      if (params.req.body.pulse)
        session.pulse = params.req.body.pulse;
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
