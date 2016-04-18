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
  start_time: {
    type: Date, 
    default: Date.now
  },
  end_time: {
    type: Date, 
    default: Date.now
  },
  slot: [ // Represent 1 reported time slot during training
    {
      seconds_elapsed: Number,
      heart_rate: Number,
      location: {
        lat: Number,
        long: Number
      }
    }
  ],
  heart_rate: {
    min: Number,
    max: Number,
    average: Number
  },
  calories: Number
});

module.exports = mongoose.model('Session', sessionSchema);
