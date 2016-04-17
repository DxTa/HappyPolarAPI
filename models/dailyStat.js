
var mongoose = require('mongoose');

// define the schema for our model
var dailyStatSchema = mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User'
  },
  createdTime: Number,
  updatedTime: Number,
  calories: Number
});

// create the model and expose it to our app
module.exports = mongoose.model('DailyStat', dailyStatSchema);