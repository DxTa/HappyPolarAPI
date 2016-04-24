var express = require('express');
var router = express.Router({mergeParams: true});

var passport = require('passport');
var SessionService = require('../../services/session');

router.route('/')
  /**
  * @api {get} /sessions Get All Session
  * @apiVersion 0.1.0
  * @apiHeader {String} Authorization Bearer authorization key.
  * @apiName GetSessions
  * @apiGroup Session
  */
  .get(function(req, res, next) {
    console.log('GET /sessions');
    console.log('userId: '+req.params.userId);
    SessionService.index({
        'req': req
      },function(err,sessions) {
      if (err) {
        console.log('error:'+err);
        res.status(404);
        res.json({ error: err });
      }
      else {
        res.json(sessions);
      }
    });
  })
  /**
  * @api {post} /sessions Create a new Session
  * @apiVersion 0.1.0
  * @apiHeader {String} Authorization Bearer authorization key.
  * @apiName PostSession
  * @apiGroup Session
  *
  * @apiParam {ObjectId} user_id User who create the sesison.
  * @apiParam {ObjectId} exercise_id Exercise type of the session.
  * @apiParam {Number} start_time Session start time.
  * @apiParam {Number} end_time Session end time.
  * @apiParam {Array} slot User's heart rate recorded during session e.g:  {"secondsElapsed":10,"heartRate":79,"location":{"lat":122, "long":14}}.
  * @apiParam {String} heartRate Session heart rate stats e.g: {"min": 70, "max": 160, "average": 120}
  * @apiParam {Number} calories Session total calories burned.
  */
  .post(function(req, res, next) {
    console.log('POST /sessions');
    SessionService.create({
        'req': req
      }, function(err, session) {
      if (err){        
        console.log('error:'+err);
        res.status(404);
        res.json({ error: err });
      }
      else {
        res.json({
          message: 'Session created!',
          session: session
        });
      }
    });
  });

router.route('/:id')
  /**
  * @api {get} /sessions/:id Get a single Session information
  * @apiVersion 0.1.0
  * @apiHeader {String} Authorization Bearer authorization key.
  * @apiName GetSession
  * @apiGroup Session
  *
  * @apiParam {String} id Session ID.
  */
  .get(function(req, res, next) {
    SessionService.show({
        'req': req
      }, function(err,session) {
      if (err) {
        console.log('error:'+err);
        res.status(404);
        res.json({ error: err });
      }
      else {
        res.json(session);
      }
    });
  })
  /**
  * @api {put} /sessions/:id update an Session
  * @apiVersion 0.1.0
  * @apiHeader {String} Authorization Bearer authorization key.
  * @apiName PutSession
  * @apiGroup Session
  *
  * @apiParam {Array} heartRates User's heart rate recorded during session [79,82,103].
  * @apiParam {String} location Session location e.g: {"lat":108,"long":41}.
  * @apiParam {Array} time Session time.
  * @apiParam {Number} pulse Session pulse.
  */
  .put(function(req, res, next) {    
    console.log('PUT /sessions');
    SessionService.update({
        'req': req
      }, function(err,session) {
      if (err) {
        console.log('error:'+err);
        res.status(404);
        res.json({ error: err });
      }
      else {
        res.json(session);
      }
    });
  })
  /**
  * @api {delete} /sessions/:id Delete a single Session
  * @apiVersion 0.1.0
  * @apiHeader {String} Authorization Bearer authorization key.
  * @apiName DeleteSession
  * @apiGroup Session
  *
  * @apiParam {String} id Session ID.
  */
  .delete(function(req, res, next) {
    SessionService.destroy({
        'req':req
      }, function(err, session) {
      if (err) {
        console.log('error:'+err);
        res.status(404);
        res.json({error: err});
      }
      else {
        res.json({ message: 'Successfully deleted' });
      }
    });
  });

module.exports = router;
