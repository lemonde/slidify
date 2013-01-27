module.exports = function(grunt) {

  grunt.initConfig({

    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: ['slidify.js', 'test/**/*.js']
    },

    testacular: {
      unit: {
        configFile: 'test/testacular.conf.js'
      },
      single: {
        configFile: 'test/testacular.conf.js',
        singleRun: true
      }
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
  grunt.loadNpmTasks('gruntacular');

  grunt.registerTask('default', ['jshint', 'testacular:single', 'copy', 'uglify']);
  grunt.registerTask('lint', ['jshint']);
  grunt.registerTask('test', ['testacular']);
  grunt.registerTask('test:single', ['testacular:single']);
};