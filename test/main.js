(function () {
  'use strict';

  var tests = Object.keys(window.__karma__.files).filter(function (file) {
    return (/test\/unit/).test(file);
  });

  requirejs.config({
    baseUrl: '/base/src',
    paths: {
      'chai': '../node_modules/chai/chai',
      'chai-things': '../node_modules/chai-things/lib/chai-things',
      'chai-jquery': '../node_modules/chai-jquery/chai-jquery',
      'sinon': '../node_modules/sinon/pkg/sinon',
      'sinon-chai': '../node_modules/sinon-chai/lib/sinon-chai',
      'jquery': '../examples/components/jquery/dist/jquery.min'
    },
    shim: {
      'sinon': {
        exports: 'sinon'
      }
    },
    deps: ['jquery'],
    callback: function () {
      var deps = ['chai', 'sinon', 'chai-things', 'chai-jquery', 'sinon-chai'].concat(tests);
      require(deps, function (chai, sinon, chaiThings, chaiJquery, sinonChai) {
        chai.use(chaiThings);
        chai.use(chaiJquery);
        chai.use(sinonChai);
        window.sinon = sinon;
        window.expect = chai.expect;
        window.mocha.checkLeaks();
        window.__karma__.start();
      });
    }
  });
})();
