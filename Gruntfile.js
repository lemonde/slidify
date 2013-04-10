module.exports = function(grunt) {

  grunt.initConfig({

    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: ['slidify.js', 'test/**/*.js']
    },

    karma: {
      unit: {
        configFile: 'test/karma.conf.js'
      },
      single: {
        configFile: 'test/karma.conf.js',
        browsers: ['PhantomJS'],
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
  grunt.loadNpmTasks('grunt-karma');

  grunt.registerTask('default', ['jshint', 'test:single', 'copy', 'uglify']);
  grunt.registerTask('lint', ['jshint']);
  grunt.registerTask('test', ['karma']);
  grunt.registerTask('test:single', ['karma:single']);
};