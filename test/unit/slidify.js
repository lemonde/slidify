/*jshint undef:false expr:true */
var expect = chai.expect
, jQ = jQuery.noConflict();

define('jquery', function () {
  return jQ;
});

describe('Slidify', function () {

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
        var slider = new slidify();
        expect(slider.options).to.be.an('object');
      });

      it('should contain all options', function () {
        var slider = new slidify();

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
          expect(slider.$root[0].outerHTML).to.equal('<div></div>');
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

    });

    describe('init', function() {

      var data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      var slides = jQ.map(data, function(d) {
        return { data: {html: d}, item: null };
      });
      var slider;

      beforeEach(function () {
        slider = new window.slidify({data: data});
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
        expect(slider).to.have.property('slides').and.is.a('array');
      });

      it('must initalize fine with empty data', function () {
        var emptySlide = new window.slidify();
        emptySlide.init();
        expect(emptySlide).to.have.property('index').and.is.null;
        expect(emptySlide).to.have.property('slides').and.is.empty;
      });

    });

    describe('Slides API', function() {

      var dataStr = ['<div>1</div>'];
      var dataObj = [{html: '<div>1</div>'}];
      var slide = { html: '<div>1</div>', item: jQ('<div>1</div>') };
      var slider;

      it('must render Slide correctly with simple data', function () {
        slider = new window.slidify({data: dataStr});
        slider.init();
        expect(slider.current()).to.be.deep.equal(slide);
      });

      it('must render Slide correctly with object data', function () {
        slider = new window.slidify({data: dataObj});
        slider.init();
        expect(slider.current()).to.be.deep.equal(slide);
      });

      it('must add & render Slide correctly', function () {
        slider = new window.slidify();
        slider.init();
        expect(slider.length()).to.be.equal(0);
        slider.addSlide('<div>1</div>');
        expect(slider.length()).to.be.equal(1);
        expect(slider.current()).to.be.deep.equal(slide);
        slider.addSlide('<div>2</div>');
        expect(slider.length()).to.be.equal(2);
        expect(slider.current()).to.be.deep.equal(slide);
      });

    });

    describe('Traversing API', function () {

      var data = [1, 2, 3];
      var slides = jQ.map(data, function(d) {
        return { html: d, item: { '0': d, length: 1 } };
      });
      var slider;

      it('must have all functions', function () {
        slider = new slidify();
        expect(slider.get).to.be.a('function');
        expect(slider.current).to.be.a('function');
        expect(slider.length).to.be.a('function');
        expect(slider.move).to.be.a('function');
        expect(slider.next).to.be.a('function');
        expect(slider.previous).to.be.a('function');
      });

      it('must return good slide on get() call', function () {
        slider = new slidify({data: data});
        slider.init();
        expect(slider.get(0)).to.be.deep.equal(slides[0]);
        expect(slider.get(2)).to.be.deep.equal(slides[2]);
      });

      it('must return slides length on length() call', function () {
        slider = new slidify({data: data});
        slider.init();
        expect(slider.length()).to.be.equal(3);
      });

      it('must change current slide on move() call', function () {
        slider = new slidify({data: data});
        slider.init();
        slider.move(1);
        expect(slider.index).to.be.equal(1);
        expect(slider.current()).to.be.deep.equal(slides[1]);
      });

      it('must trigger a move event on move() call', function (done) {
        slider = new slidify({data: data});
        slider.init();
        slider.on('move', function() {
          done();
        });
        slider.move(1);
      });

      it('must return good slide on current() call', function () {
        slider = new slidify({data: data});
        slider.init();
        expect(slider.current()).to.be.deep.equal(slides[0]);
        slider.move(1);
        expect(slider.current()).to.be.deep.equal(slides[1]);
      });

      it('must increase current slide index on next() call', function () {
        // instantiate without change index, index = 0
        slider = new slidify({data: data});
        slider.init();
        slider.next();
        expect(slider.index).to.be.equal(1);
        expect(slider.current()).to.be.deep.equal(slides[1]);
      });

      it('must not change current on next() call with no loop option', function () {
        // instantiate with given index, index = 2
        slider = new slidify({data: data, loop: false, index: 2});
        slider.init();
        slider.next();
        expect(slider.index).to.be.equal(2);
        expect(slider.current()).to.be.deep.equal(slides[2]);
      });

      it('must go back to first slide on next() call with loop option', function () {
        // instantiate with given index, index = 2
        slider = new slidify({data: data, loop: true, index: 2});
        slider.init();
        slider.next();
        expect(slider.index).to.be.equal(0);
        expect(slider.current()).to.be.deep.equal(slides[0]);
      });

      it('must decrease current slide index on previous() call', function () {
        // instantiate with given index, index = 2
        slider = new slidify({data: data, index: 2});
        slider.init();
        slider.previous();
        expect(slider.index).to.be.equal(1);
        expect(slider.current()).to.be.deep.equal(slides[1]);
      });

      it('must not change slide index on previous() with no loop option', function () {
        // instantiate with given index, index = 0
        slider = new slidify({data: data, loop: false});
        slider.init();
        slider.previous();
        expect(slider.index).to.be.equal(0);
        expect(slider.current()).to.be.deep.equal(slides[0]);
      });

      it('must go to last index on previous() call with loop option', function () {
        // instantiate with given index, index = 0
        slider = new slidify({data: data, loop: true});
        slider.init();
        slider.previous();
        expect(slider.index).to.be.equal(2);
        expect(slider.current()).to.be.deep.equal(slides[2]);
      });

    });

  });
});