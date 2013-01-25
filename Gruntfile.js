module.exports = function(grunt) {

  grunt.initConfig({

    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: ['slidify.js', 'test/**/*.js']
    },

    copy: {
      all: {
        files: {
          'build/' : 'slidify.js'
        }
      }
    },

    uglify: {
      options: {
        'preserveComments': 'some'
      },

      all: {
        files: {
          'build/slidify.min.js' : ['slidify.js']
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['jshint', 'copy', 'uglify']);
  grunt.registerTask('lint', ['jshint']);
};