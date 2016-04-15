var passport = require('passport');
var SessionService = require('../../services/session');


module.exports = function(router) {

  router.route('/sessions')
    /**
    * @api {get} /sessions Get All Session
    * @apiVersion 0.1.0
    * @apiName GetSessions
    * @apiGroup Session
    */
    .get(function(req, res, next) {
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
    * @apiName PostSession
    * @apiGroup Session
    *
    * @apiParam {Array} heartRates User's heart rate recorded during session [79,82,103].
    * @apiParam {String} location Session location e.g: {"lat":108,"long":41}.
    * @apiParam {Array} time Session time.
    * @apiParam {Number} pulse Session pulse.
    */
    .post(function(req, res, next) {
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

  router.route('/sessions/:id')
    /**
    * @api {get} /sessions/:id Get a single Session information
    * @apiVersion 0.1.0
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
    * @apiName PutSession
    * @apiGroup Session
    *
    * @apiParam {Array} heartRates User's heart rate recorded during session [79,82,103].
    * @apiParam {String} location Session location e.g: {"lat":108,"long":41}.
    * @apiParam {Array} time Session time.
    * @apiParam {Number} pulse Session pulse.
    */
    .put(function(req, res, next) {
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
}
