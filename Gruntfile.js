module.exports = function(grunt) {
  var files = {
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
        script: 'bin/www'
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
      files: files.scripts,
      tasks: ['jshint']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-apidoc');
  grunt.loadNpmTasks('grunt-nodemon');

  grunt.registerTask('default', ['jshint','apidoc','nodemon']);
};