module.exports = function (grunt) {

  grunt.initConfig({

    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: ['slidify.js', 'test/**/*.js']
    },

    karma: {
      unit: {
        configFile: 'test/karma.conf.js',
        autoWatch: true,
        browsers: ['PhantomJS']
      },
      single: {
        configFile: 'test/karma.conf.js',
        singleRun: true,
        browsers: ['PhantomJS']
      }
    },

    copy: {
      all: {
        files: {
          'dist/': 'slidify.js'
        }
      }
    },

    uglify: {
      options: {
        'preserveComments': 'some'
      },

      all: {
        files: {
          'dist/slidify.min.js': ['slidify.js']
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