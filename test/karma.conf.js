'use strict';

module.exports = function (config) {
  config.set({
    plugins: [
      'karma-mocha',
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-safari-launcher',
      'karma-phantomjs-launcher',
      'karma-requirejs',
      'karma-spec-reporter'
    ],
    frameworks: ['mocha', 'requirejs'],
    basePath: '..',
    singleRun: false,
    autoWatch: true,
    colors: true,
    reporters: ['spec'],
    browsers: ['Chrome'],
    files: [
      //App-specific Code
      'examples/components/jquery/dist/jquery.min.js',
      'examples/components/requirejs/require.js',
      'dist/slidify.js',

      //Test-Specific Code
      { pattern: 'node_modules/chai/chai.js', included: false, watched: false},
      { pattern: 'node_modules/chai-things/lib/chai-things.js', included: false, watched: false},
      { pattern: 'node_modules/chai-jquery/chai-jquery.js', included: false, watched: false},
      { pattern: 'node_modules/sinon/pkg/sinon.js', included: false, watched: false},
      { pattern: 'node_modules/sinon-chai/lib/sinon-chai.js', included: false, watched: false},

      //test files
      { pattern: 'test/fixtures/**/*', included: false},
      { pattern: 'test/unit/**/*.js', included: false },
      'test/main.js'
    ],
    logLevel: config.LOG_WARN
  });
};