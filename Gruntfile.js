module.exports = function(grunt) {
  //Seeding Data
  var sessionSeeder = require('./seed/session');

  var files = {
    api: ['routes/*.js'],
    scripts: ['*.js', 'config/*.js', 'models/*.js','routes/*.js']
  };
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    apidoc: {
      myapp: {
        src: 'routes/',
        dest: 'public/doc',
        options: {
            includeFilters: [ ".*\\.js$" ]
        }
      }
    },
    nodemon: {
      dev: {
        script: 'bin/www',
      }
    },
    jshint: {
      files: files.scripts,
      options: {
        globals: {
          jQuery: true
        }
      }
    },
    watch: {
      jshint: {
        files: files.scripts,
        tasks: ['jshint']
      },
      apidoc: {
        files: files.api,
        tasks: ['apidoc']
      }
    },
    // run watch and nodemon at the same time
    concurrent: {
      options: {
        logConcurrentOutput: true
      },
      tasks: ['nodemon', 'watch']
    } 
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-apidoc');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');

  grunt.registerTask('default', ['jshint','apidoc','concurrent']);

  grunt.loadTasks('seed');
};