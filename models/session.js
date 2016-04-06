
var mongoose = require('mongoose');

// define the schema for our user model
var sessionSchema = mongoose.Schema({
  heartRates: Array,
  location: String,
  time: Array,
  pulse: Number
});
