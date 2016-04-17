var mongoose = require('mongoose');

// define the schema for our user model
var sessionSchema = mongoose.Schema({
  heartRates: Array,
  location: {
    lat: Number,
    long: Number
  },
  time: Array,
  pulse: Number
});

module.exports = mongoose.model('Session', sessionSchema);
