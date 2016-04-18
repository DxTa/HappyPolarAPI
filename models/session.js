var mongoose = require('mongoose');

// define the schema for our user model
var sessionSchema = mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  exercise_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Exercise' 
  },
  start_time: Number,
  end_time: Number,
  slot: [ // Represent 1 reported time slot during training
    {
      secondsElapsed: Number,
      heartRate: Number,
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
