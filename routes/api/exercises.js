var passport = require('passport');
var ExerciseService = require('../../services/exercise');



module.exports = function(router) {

  router.route('/routers')
    .get(function(req,res) {
      console.log('index');
    })
    .post(function(req,res) {
      console.log('create');
    });

  router.route('/routers/:id')
    .get(function(req,res) {
      console.log('show');
    })
    .put(function(req,res) {
      console.log('update');
    })
    .delete(function(req,res) {
      console.log('delete');
    });

}
