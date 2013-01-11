var expect = chai.expect
, jQ = jQuery.noConflict();

describe('slidify', function() {

  beforeEach(function(done) {
    jQ('body').load('base/test/fixtures/slifidy.html', function() {
      done();
    });
  });
  
  describe('access slidify object', function() {
    it('should exist an object slidify on window', function() {
      expect(window.slidify).to.be.an('object');
    });

    it('should return slidify object with requirejs', function(done) {
      require(["slidify"], function(slidify) {
        expect(slidify).to.be.an('object');
        done();
      });
    });
  });
});