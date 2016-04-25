var express = require('express');
var router = express.Router({mergeParams: true});

var passport = require('passport');
var ExerciseService = require('../../services/exercise');

// Nested sessions in exercise. GET all sessions of one exercise type
/**
* @api {get} /exercises/:exerciseId/sessions Get Sessions of an Exercise
* @apiVersion 0.1.0
* @apiHeader {String} Authorization Bearer authorization key.
* @apiName GetSessionByExercise
* @apiGroup Session
*/
router.use('/:exerciseId/sessions', require('./sessions'));

router.route('/')
  /**
  * @api {get} /exercises Get All Exercises
  * @apiVersion 0.1.0
  * @apiHeader {String} Authorization Bearer authorization key.
  * @apiName GetExercises
  * @apiGroup Exercise
  */
  .get(passport.authenticate('bearer', { session: false }), function(req, res, next) {
    console.log('GET /exercises');
    ExerciseService.index({
      'req': req
    }, function(err,exercises){
      if (err) {
        console.log('error:'+err);
        res.status(404);
        res.json({ error: err });
      }
      else {
        res.json(exercises);
      }
    });
  })
  /**
  * @api {post} /exercises Create a new Exercise
  * @apiVersion 0.1.0
  * @apiHeader {String} Authorization Bearer authorization key.
  * @apiName PostExercise
  * @apiGroup Exercise
  *
  * @apiParam {String} name Exercise name.
  * @apiParam {String} description Exercise description.
  * @apiParam {String} image Exercise image url.
  */
  .post(passport.authenticate('bearer', { session: false }), function(req, res, next) {
    console.log('POST /exercises');
    ExerciseService.create({
      'req': req
    }, function(err, exercise){
      if (err) {
        console.log('error:'+err);
        res.status(404);
        res.json({ error: err });
      }
      else {
        res.json(exercise);
      }
    })
  });

router.route('/:id')
  /**
  * @api {get} /exercises/:id Get a single Exercise information
  * @apiVersion 0.1.0
  * @apiHeader {String} Authorization Bearer authorization key.
  * @apiName GetExercise
  * @apiGroup Exercise
  *
  * @apiParam {String} id Exercise ID.
  */
  .get(passport.authenticate('bearer', { session: false }), function(req, res, next) {
    console.log('GET /exercises/:id');
    ExerciseService.show({
      'req': req
    }, function(err, exercise){
      if (err) {
        console.log('error:'+err);
        res.status(404);
        res.json({ error: err });
      }
      else {
        res.json(exercise);
      }
    })
  })
  /**
  * @api {put} /exercises/:id Update an Exercise
  * @apiVersion 0.1.0
  * @apiHeader {String} Authorization Bearer authorization key.
  * @apiName PutExercise
  * @apiGroup Exercise
  *
  * @apiParam {String} id Exercise ID.
  * @apiParam {String} name Exercise new name.
  * @apiParam {String} description Exercise new description.
  * @apiParam {String} image Exercise new image url.
  */
  .put(passport.authenticate('bearer', { session: false }), function(req, res, next) {
    console.log('PUT /exercises/:id');
    ExerciseService.update({
        'req':req
      }, function(err,exercise) {
      if (err) {
        console.log('error:'+err);
        res.status(404);
        res.json({ error: err });
      }
      else {
        res.json(exercise);
      }
    });
  })
  /**
  * @api {delete} /exercises/:id Delete a single Exercise
  * @apiVersion 0.1.0
  * @apiHeader {String} Authorization Bearer authorization key.
  * @apiName DeleteExercise
  * @apiGroup Exercise
  *
  * @apiParam {String} id Exercise ID.
  */
  .delete(passport.authenticate('bearer', { session: false }), function(req, res, next) {
    console.log('DELETE /exercises/:id');
    ExerciseService.destroy({
        'req':req
      }, function(err, exercise) {
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