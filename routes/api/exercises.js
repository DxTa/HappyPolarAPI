var passport = require('passport');
var ExerciseService = require('../../services/exercise');



module.exports = function(router) {
  /**
  * @api {get} /exercises Get All Exercises
  * @apiVersion 0.1.0
  * @apiName GetExercises
  * @apiGroup Exercise
  */
  router.route('/exercises')
    .get(function(req, res, next) {
      console.log('index');
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
    * @apiName PostExercise
    * @apiGroup Exercise
    *
    * @apiParam {String} name Exercise name.
    * @apiParam {String} description Exercise description.
    * @apiParam {String} image Exercise image url.
    */
    .post(function(req, res, next) {
      console.log('create');
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

  router.route('/exercises/:id')
    /**
    * @api {get} /exercises/:id Get a single Exercise information
    * @apiVersion 0.1.0
    * @apiName GetExercise
    * @apiGroup Exercise
    *
    * @apiParam {String} id Exercise ID.
    */
    .get(function(req, res, next) {
      console.log('show');
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
    * @api {put} /exercises/:id update an Exercise
    * @apiVersion 0.1.0
    * @apiName PutExercise
    * @apiGroup Exercise
    *
    * @apiParam {String} id Exercise ID.
    * @apiParam {String} name Exercise new name.
    * @apiParam {String} description Exercise new description.
    * @apiParam {String} image Exercise new image url.
    */
    .put(function(req, res, next) {
      console.log('update');
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
    * @apiName DeleteExercise
    * @apiGroup Exercise
    *
    * @apiParam {String} id Exercise ID.
    */
    .delete(function(req, res, next) {
      console.log('delete');
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

}
