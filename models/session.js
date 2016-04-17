var mongoose = require('mongoose');

// define the schema for our user model
var sessionSchema = mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User'
  },
  exercise: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Exercise' 
  },
  start_time: Number,
  end_time: Number,
  slot: [
    {
      timeElapsed: Number,
      heartRates: Number,
      location: {
        lat: Number,
        long: Number
      }
    }
  ],
  heartRate: {
    min: Number,
    max: Number,
    average: Number
  },
  calories: Number
});

module.exports = mongoose.model('Session', sessionSchema);
