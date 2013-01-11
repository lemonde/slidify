var expect = chai.expect
, jQ = jQuery.noConflict();

define('jquery', function() {
  return jQ;
});

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

  describe('Slider', function() {
    describe('should exist a Slider prototype', function() {
      expect(window.slidify.Slider).to.be.a('function');
    });

    describe('default options', function() {
      it('should contain an object options', function() {
        var slider = new window.slidify.Slider();
        expect(slider.options).to.be.an('object');
      });

      it('should contain all options', function() {
        var slider = new window.slidify.Slider();

        expect(slider.options.data).to.be.an('array');
        expect(slider.options.delay).to.be.a('number');
        expect(slider.options.loop).to.be.a('boolean');
        expect(slider.options.startIndex).to.be.a('number');
        expect(slider.options.effect).to.be.a('null');
        expect(slider.options.wrapper).to.be.a('null');
        expect(slider.options.root).to.be.a('null');
      });
    });

    describe('extend options', function() {
      it('should contain an object options extended', function() {
        var slider = new window.slidify.Slider({
          delay: 5555
        });

        expect(slider.options.delay).to.equal(5555);
      });
    });

  });
});