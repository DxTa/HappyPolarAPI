
var mongoose = require('mongoose');

// define the schema for our user model
var exerciseSchema = mongoose.Schema({
  name: String,
  description: String,
  image: String
});
