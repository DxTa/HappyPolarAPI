
var mongoose = require('mongoose');

// define the schema for our model
var dailyStatSchema = mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User'
  },
  created_time: {
    type: Date, 
    default: Date.now
  },
  updated_time: {
    type: Date, 
    default: Date.now
  },
  calories: Number
});

// create the model and expose it to our app
module.exports = mongoose.model('DailyStat', dailyStatSchema);