/*jshint undef:false expr:true */
var expect = chai.expect
, jQ = jQuery.noConflict();

define('jquery', function () {
  return jQ;
});

describe('slidify', function () {

  beforeEach(function (done) {
    jQ('body').load('base/test/fixtures/slifidy.html', function () {
      done();
    });
  });

  describe('access slidify object', function () {
    it('should exist an object slidify on window', function () {
      expect(window.slidify).to.be.an('function');
    });

    it('should return slidify object with requirejs', function (done) {
      require(['slidify'], function (slidify) {
        expect(slidify).to.be.an('function');
        done();
      });
    });
  });

  describe('Slider', function () {

    describe('default options', function () {
      it('should contain an object options', function () {
        var slider = new window.slidify();
        expect(slider.options).to.be.an('object');
      });

      it('should contain all options', function () {
        var slider = new window.slidify();

        expect(slider.options.data).to.be.an('array').and.be.empty;
        expect(slider.options.delay).to.be.a('number').and.equal(5000);
        expect(slider.options.loop).to.be.a('boolean').and.be.false;
        expect(slider.options.index).to.be.a('number').and.equal(0);
        expect(slider.options.effect).to.be.null;
      });
    });

    describe('extend options', function () {
      it('should contain an object options extended', function () {
        var slider = new window.slidify({
          delay: 5555
        });

        expect(slider.options.delay).to.equal(5555);
      });
    });

    describe('on instanciate slider', function () {

      var slider;

      beforeEach(function () {
        slider = new window.slidify();
      });

      describe('wrapper', function () {
        it('must be a div element', function () {
          expect(slider.$el[0].outerHTML).to.equal('<div></div>');
        });
      });

      describe('events', function () {

        it('must exist an #trigger function', function () {
          expect(slider.trigger).to.be.a('function');
        });

        it('must exist an #on function', function () {
          expect(slider.on).to.be.a('function');
        });

        it('must exist a #one function', function () {
          expect(slider.on).to.be.a('function');
        });

        it('must exist an #off function', function () {
          expect(slider.off).to.be.a('function');
        });

        it('must exist a slider object on event', function (done) {
          slider.on('test', function (event) {
            expect(event.slider).to.equal(slider);
            done();
          });

          slider.trigger('test');
        });

      });

      describe('init', function() {

        it('must exist an #init function', function () {
          expect(slider.init).to.be.a('function');
        });

      });

    });

    describe('init', function() {

      var data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      var slider;

      beforeEach(function () {
        slider = new window.slidify({
          data: data
        });
      });

      it('must exist an #init function', function () {
        expect(slider.init).to.be.a('function');
      });

      it('must trigger an #init event', function (done) {
        slider.on('init', function (event) {
          expect(event.slider).to.equal(slider);
          done();
        });

        slider.init();
      });

      it('must initalize fine with given data', function () {
        slider.init();
        expect(slider).to.have.property('index', slider.options.index);
        expect(slider).to.have.property('slides').and.deep.equal(data);
        expect(slider).to.have.property('length', data.length);
      });

      it('must initalize fine with empty data', function () {
        var emptySlide = new window.slidify();
        emptySlide.init();
        expect(emptySlide).to.have.property('index').and.is.null;
        expect(emptySlide).to.have.property('slides').and.is.empty;
        expect(emptySlide).to.have.property('length', 0);
      });

    });


  });
});