module.exports = function(grunt) {
  var seeder = require('mongoose-seed');
  var configDB = require('../config/database.js');

  grunt.registerTask('sessionSeed', 'Seed Session Collection.', function() {
    //Grunt tasks by default execute synchronously, 
    //the task will finish and not wait for the mongoose connection to open. 
    //Use this.async() within the task to have the task wait.
    
    var done = this.async();
    // Connect to MongoDB via Mongoose
    seeder.connect(configDB.url, function() {    
      // Load Mongoose models
      seeder.loadModels([
        './models/session.js'
      ]);
     
      // Clear specified collections 
      seeder.clearModels(['Session'], function() {
        // Callback to populate DB once collections have been cleared
        seeder.populateModels(data);
      });
    });
  });

  // Data array containing seed data - documents organized by Model 
  var data = [
    { 
      'model': 'Session',
      'documents': [
        {
          "heartRate": {
            "average": 92,
            "max": 161,
            "min": 77
          },
          "calories": 2682,
          "slot": [
            {
              "heartRate": 129,
              "secondsElapsed": 10
            },
            {
              "heartRate": 139,
              "secondsElapsed": 20
            },
            {
              "heartRate": 89,
              "secondsElapsed": 30
            },
            {
              "heartRate": 76,
              "secondsElapsed": 40
            },
            {
              "heartRate": 87,
              "secondsElapsed": 50
            }
          ],
          "end_time": 1460481444924,
          "start_time": 1460471932851,
          "exercise_id": "570f9433bacc4c2860d423de",
          "user_id": "5713dec6d98db0fa136fc3e5"
        },
        {
          "heartRate": {
            "average": 112,
            "max": 172,
            "min": 53
          },
          "calories": 1573,
          "slot": [
            {
              "heartRate": 129,
              "secondsElapsed": 10
            },
            {
              "heartRate": 139,
              "secondsElapsed": 20
            },
            {
              "heartRate": 89,
              "secondsElapsed": 30
            },
            {
              "heartRate": 76,
              "secondsElapsed": 40
            },
            {
              "heartRate": 87,
              "secondsElapsed": 50
            }
          ],
          "end_time": 1453170414536,
          "start_time": 1453162206548,
          "exercise_id": "570f945dbacc4c2860d423df",
          "user_id": "57113e4cb3dc728827bf9408"
        },
        {
          "heartRate": {
            "average": 88,
            "max": 115,
            "min": 97
          },
          "calories": 1012,
          "slot": [
            {
              "heartRate": 129,
              "secondsElapsed": 10
            },
            {
              "heartRate": 139,
              "secondsElapsed": 20
            },
            {
              "heartRate": 89,
              "secondsElapsed": 30
            },
            {
              "heartRate": 76,
              "secondsElapsed": 40
            },
            {
              "heartRate": 87,
              "secondsElapsed": 50
            }
          ],
          "end_time": 1457650449632,
          "start_time": 1457644821161,
          "exercise_id": "570f945dbacc4c2860d423df",
          "user_id": "570f52185608a754550a7a68"
        },
        {
          "heartRate": {
            "average": 150,
            "max": 108,
            "min": 55
          },
          "calories": 1292,
          "slot": [
            {
              "heartRate": 129,
              "secondsElapsed": 10
            },
            {
              "heartRate": 139,
              "secondsElapsed": 20
            },
            {
              "heartRate": 89,
              "secondsElapsed": 30
            },
            {
              "heartRate": 76,
              "secondsElapsed": 40
            },
            {
              "heartRate": 87,
              "secondsElapsed": 50
            }
          ],
          "end_time": 1459387798942,
          "start_time": 1459385600979,
          "exercise_id": "570f9433bacc4c2860d423de",
          "user_id": "570f52185608a754550a7a68"
        },
        {
          "heartRate": {
            "average": 92,
            "max": 149,
            "min": 60
          },
          "calories": 1072,
          "slot": [
            {
              "heartRate": 129,
              "secondsElapsed": 10
            },
            {
              "heartRate": 139,
              "secondsElapsed": 20
            },
            {
              "heartRate": 89,
              "secondsElapsed": 30
            },
            {
              "heartRate": 76,
              "secondsElapsed": 40
            },
            {
              "heartRate": 87,
              "secondsElapsed": 50
            }
          ],
          "end_time": 1452927201486,
          "start_time": 1452922863049,
          "exercise_id": "570f9433bacc4c2860d423de",
          "user_id": "570f52185608a754550a7a68"
        },
        {
          "heartRate": {
            "average": 91,
            "max": 198,
            "min": 49
          },
          "calories": 1800,
          "slot": [
            {
              "heartRate": 64,
              "secondsElapsed": 10
            },
            {
              "heartRate": 141,
              "secondsElapsed": 20
            },
            {
              "heartRate": 93,
              "secondsElapsed": 30
            },
            {
              "heartRate": 175,
              "secondsElapsed": 40
            },
            {
              "heartRate": 104,
              "secondsElapsed": 50
            },
            {
              "heartRate": 98,
              "secondsElapsed": 60
            },
            {
              "heartRate": 74,
              "secondsElapsed": 70
            },
            {
              "heartRate": 84,
              "secondsElapsed": 80
            },
            {
              "heartRate": 77,
              "secondsElapsed": 90
            },
            {
              "heartRate": 85,
              "secondsElapsed": 100
            }
          ],
          "end_time": 1453732098193,
          "start_time": 1453731202576,
          "exercise_id": "570f918232011be867ff7115",
          "user_id": "5713dec6d98db0fa136fc3e5"
        },
        {
          "heartRate": {
            "average": 151,
            "max": 135,
            "min": 43
          },
          "calories": 1222,
          "slot": [
            {
              "heartRate": 64,
              "secondsElapsed": 10
            },
            {
              "heartRate": 141,
              "secondsElapsed": 20
            },
            {
              "heartRate": 93,
              "secondsElapsed": 30
            },
            {
              "heartRate": 175,
              "secondsElapsed": 40
            },
            {
              "heartRate": 104,
              "secondsElapsed": 50
            },
            {
              "heartRate": 98,
              "secondsElapsed": 60
            },
            {
              "heartRate": 74,
              "secondsElapsed": 70
            },
            {
              "heartRate": 84,
              "secondsElapsed": 80
            },
            {
              "heartRate": 77,
              "secondsElapsed": 90
            },
            {
              "heartRate": 85,
              "secondsElapsed": 100
            }
          ],
          "end_time": 1455600864123,
          "start_time": 1455595810529,
          "exercise_id": "570f945dbacc4c2860d423df",
          "user_id": "570f52185608a754550a7a68"
        },
        {
          "heartRate": {
            "average": 150,
            "max": 96,
            "min": 100
          },
          "calories": 476,
          "slot": [
            {
              "heartRate": 64,
              "secondsElapsed": 10
            },
            {
              "heartRate": 141,
              "secondsElapsed": 20
            },
            {
              "heartRate": 93,
              "secondsElapsed": 30
            },
            {
              "heartRate": 175,
              "secondsElapsed": 40
            },
            {
              "heartRate": 104,
              "secondsElapsed": 50
            },
            {
              "heartRate": 98,
              "secondsElapsed": 60
            },
            {
              "heartRate": 74,
              "secondsElapsed": 70
            },
            {
              "heartRate": 84,
              "secondsElapsed": 80
            },
            {
              "heartRate": 77,
              "secondsElapsed": 90
            },
            {
              "heartRate": 85,
              "secondsElapsed": 100
            }
          ],
          "end_time": 1458209154651,
          "start_time": 1458204686614,
          "exercise_id": "570f9433bacc4c2860d423de",
          "user_id": "570f52185608a754550a7a68"
        },
        {
          "heartRate": {
            "average": 89,
            "max": 121,
            "min": 57
          },
          "calories": 2921,
          "slot": [
            {
              "heartRate": 64,
              "secondsElapsed": 10
            },
            {
              "heartRate": 141,
              "secondsElapsed": 20
            },
            {
              "heartRate": 93,
              "secondsElapsed": 30
            },
            {
              "heartRate": 175,
              "secondsElapsed": 40
            },
            {
              "heartRate": 104,
              "secondsElapsed": 50
            },
            {
              "heartRate": 98,
              "secondsElapsed": 60
            },
            {
              "heartRate": 74,
              "secondsElapsed": 70
            },
            {
              "heartRate": 84,
              "secondsElapsed": 80
            },
            {
              "heartRate": 77,
              "secondsElapsed": 90
            },
            {
              "heartRate": 85,
              "secondsElapsed": 100
            }
          ],
          "end_time": 1454707261328,
          "start_time": 1454703515939,
          "exercise_id": "570f918232011be867ff7115",
          "user_id": "570f52185608a754550a7a68"
        },
        {
          "heartRate": {
            "average": 76,
            "max": 151,
            "min": 71
          },
          "calories": 2663,
          "slot": [
            {
              "heartRate": 64,
              "secondsElapsed": 10
            },
            {
              "heartRate": 141,
              "secondsElapsed": 20
            },
            {
              "heartRate": 93,
              "secondsElapsed": 30
            },
            {
              "heartRate": 175,
              "secondsElapsed": 40
            },
            {
              "heartRate": 104,
              "secondsElapsed": 50
            },
            {
              "heartRate": 98,
              "secondsElapsed": 60
            },
            {
              "heartRate": 74,
              "secondsElapsed": 70
            },
            {
              "heartRate": 84,
              "secondsElapsed": 80
            },
            {
              "heartRate": 77,
              "secondsElapsed": 90
            },
            {
              "heartRate": 85,
              "secondsElapsed": 100
            }
          ],
          "end_time": 1453964981336,
          "start_time": 1453954867034,
          "exercise_id": "570f945dbacc4c2860d423df",
          "user_id": "570f52185608a754550a7a68"
        },
        {
          "heartRate": {
            "average": 98,
            "max": 175,
            "min": 83
          },
          "calories": 355,
          "slot": [
            {
              "heartRate": 185,
              "secondsElapsed": 10
            },
            {
              "heartRate": 121,
              "secondsElapsed": 20
            },
            {
              "heartRate": 186,
              "secondsElapsed": 30
            },
            {
              "heartRate": 88,
              "secondsElapsed": 40
            },
            {
              "heartRate": 121,
              "secondsElapsed": 50
            },
            {
              "heartRate": 184,
              "secondsElapsed": 60
            },
            {
              "heartRate": 98,
              "secondsElapsed": 70
            },
            {
              "heartRate": 190,
              "secondsElapsed": 80
            },
            {
              "heartRate": 98,
              "secondsElapsed": 90
            },
            {
              "heartRate": 61,
              "secondsElapsed": 100
            },
            {
              "heartRate": 189,
              "secondsElapsed": 110
            },
            {
              "heartRate": 96,
              "secondsElapsed": 120
            },
            {
              "heartRate": 114,
              "secondsElapsed": 130
            },
            {
              "heartRate": 66,
              "secondsElapsed": 140
            },
            {
              "heartRate": 172,
              "secondsElapsed": 150
            }
          ],
          "end_time": 1457906655641,
          "start_time": 1457904556021,
          "exercise_id": "570f918232011be867ff7115",
          "user_id": "570f52185608a754550a7a68"
        },
        {
          "heartRate": {
            "average": 156,
            "max": 199,
            "min": 71
          },
          "calories": 1816,
          "slot": [
            {
              "heartRate": 185,
              "secondsElapsed": 10
            },
            {
              "heartRate": 121,
              "secondsElapsed": 20
            },
            {
              "heartRate": 186,
              "secondsElapsed": 30
            },
            {
              "heartRate": 88,
              "secondsElapsed": 40
            },
            {
              "heartRate": 121,
              "secondsElapsed": 50
            },
            {
              "heartRate": 184,
              "secondsElapsed": 60
            },
            {
              "heartRate": 98,
              "secondsElapsed": 70
            },
            {
              "heartRate": 190,
              "secondsElapsed": 80
            },
            {
              "heartRate": 98,
              "secondsElapsed": 90
            },
            {
              "heartRate": 61,
              "secondsElapsed": 100
            },
            {
              "heartRate": 189,
              "secondsElapsed": 110
            },
            {
              "heartRate": 96,
              "secondsElapsed": 120
            },
            {
              "heartRate": 114,
              "secondsElapsed": 130
            },
            {
              "heartRate": 66,
              "secondsElapsed": 140
            },
            {
              "heartRate": 172,
              "secondsElapsed": 150
            }
          ],
          "end_time": 1459051096783,
          "start_time": 1459045640534,
          "exercise_id": "570f918232011be867ff7115",
          "user_id": "57113e4cb3dc728827bf9408"
        },
        {
          "heartRate": {
            "average": 128,
            "max": 133,
            "min": 76
          },
          "calories": 2092,
          "slot": [
            {
              "heartRate": 185,
              "secondsElapsed": 10
            },
            {
              "heartRate": 121,
              "secondsElapsed": 20
            },
            {
              "heartRate": 186,
              "secondsElapsed": 30
            },
            {
              "heartRate": 88,
              "secondsElapsed": 40
            },
            {
              "heartRate": 121,
              "secondsElapsed": 50
            },
            {
              "heartRate": 184,
              "secondsElapsed": 60
            },
            {
              "heartRate": 98,
              "secondsElapsed": 70
            },
            {
              "heartRate": 190,
              "secondsElapsed": 80
            },
            {
              "heartRate": 98,
              "secondsElapsed": 90
            },
            {
              "heartRate": 61,
              "secondsElapsed": 100
            },
            {
              "heartRate": 189,
              "secondsElapsed": 110
            },
            {
              "heartRate": 96,
              "secondsElapsed": 120
            },
            {
              "heartRate": 114,
              "secondsElapsed": 130
            },
            {
              "heartRate": 66,
              "secondsElapsed": 140
            },
            {
              "heartRate": 172,
              "secondsElapsed": 150
            }
          ],
          "end_time": 1460454300400,
          "start_time": 1460445811220,
          "exercise_id": "570f945dbacc4c2860d423df",
          "user_id": "5713dec6d98db0fa136fc3e5"
        },
        {
          "heartRate": {
            "average": 119,
            "max": 112,
            "min": 73
          },
          "calories": 1313,
          "slot": [
            {
              "heartRate": 185,
              "secondsElapsed": 10
            },
            {
              "heartRate": 121,
              "secondsElapsed": 20
            },
            {
              "heartRate": 186,
              "secondsElapsed": 30
            },
            {
              "heartRate": 88,
              "secondsElapsed": 40
            },
            {
              "heartRate": 121,
              "secondsElapsed": 50
            },
            {
              "heartRate": 184,
              "secondsElapsed": 60
            },
            {
              "heartRate": 98,
              "secondsElapsed": 70
            },
            {
              "heartRate": 190,
              "secondsElapsed": 80
            },
            {
              "heartRate": 98,
              "secondsElapsed": 90
            },
            {
              "heartRate": 61,
              "secondsElapsed": 100
            },
            {
              "heartRate": 189,
              "secondsElapsed": 110
            },
            {
              "heartRate": 96,
              "secondsElapsed": 120
            },
            {
              "heartRate": 114,
              "secondsElapsed": 130
            },
            {
              "heartRate": 66,
              "secondsElapsed": 140
            },
            {
              "heartRate": 172,
              "secondsElapsed": 150
            }
          ],
          "end_time": 1455067821502,
          "start_time": 1455065696410,
          "exercise_id": "570f918232011be867ff7115",
          "user_id": "5713dec6d98db0fa136fc3e5"
        },
        {
          "heartRate": {
            "average": 115,
            "max": 120,
            "min": 95
          },
          "calories": 1702,
          "slot": [
            {
              "heartRate": 185,
              "secondsElapsed": 10
            },
            {
              "heartRate": 121,
              "secondsElapsed": 20
            },
            {
              "heartRate": 186,
              "secondsElapsed": 30
            },
            {
              "heartRate": 88,
              "secondsElapsed": 40
            },
            {
              "heartRate": 121,
              "secondsElapsed": 50
            },
            {
              "heartRate": 184,
              "secondsElapsed": 60
            },
            {
              "heartRate": 98,
              "secondsElapsed": 70
            },
            {
              "heartRate": 190,
              "secondsElapsed": 80
            },
            {
              "heartRate": 98,
              "secondsElapsed": 90
            },
            {
              "heartRate": 61,
              "secondsElapsed": 100
            },
            {
              "heartRate": 189,
              "secondsElapsed": 110
            },
            {
              "heartRate": 96,
              "secondsElapsed": 120
            },
            {
              "heartRate": 114,
              "secondsElapsed": 130
            },
            {
              "heartRate": 66,
              "secondsElapsed": 140
            },
            {
              "heartRate": 172,
              "secondsElapsed": 150
            }
          ],
          "end_time": 1452970724274,
          "start_time": 1452967178035,
          "exercise_id": "570f945dbacc4c2860d423df",
          "user_id": "570f52185608a754550a7a68"
        }
      ]
    }
  ];
};