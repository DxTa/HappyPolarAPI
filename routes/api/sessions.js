var passport = require('passport');
var SessionService = require('../../services/session');


module.exports = function(router) {

  router.route('/sessions')
    .get(function(req,res) {
      console.log('index');
    })
    .post(function(req,res) {
      console.log('create');
    });

  router.route('/sessions/:id')
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



