
var mongoose = require('mongoose');

// define the schema for our model
var exerciseSchema = mongoose.Schema({
  name: String,
  description: String,
  image: String
});

// create the model and expose it to our app
module.exports = mongoose.model('Exercise', exerciseSchema);