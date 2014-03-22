/*jshint undef:false expr:true */

describe('Slidify', function () {

  beforeEach(function (done) {
    $('body').load('base/test/fixtures/slidify.html', function () {
      done();
    });
  });

  it('should attach a Slidify object on window', function () {
    expect(window.Slidify).to.be.an('function');
  });

  it('should be correctly loaded by requirejs', function (done) {
    require(['slidify'], function (Slidify) {
      expect(Slidify).to.be.an('function');
      done();
    });
  });

  describe('once instanciated', function () {

    beforeEach(function () {
      slider = new window.Slidify();
    });

    it('should contain an object options', function () {
      expect(slider.options).to.be.an('object');
    });

    it('should contain each options', function () {
      expect(slider.options.data).to.be.an('array').and.be.empty;
      expect(slider.options.delay).to.be.a('number').and.equal(5000);
      expect(slider.options.loop).to.be.a('boolean').and.be.false;
      expect(slider.options.index).to.be.a('number').and.equal(0);
      expect(slider.options.effect).to.be.null;
    });

    it('should extend options correctly', function () {
      slider = new window.Slidify({
        delay: 5555
      });

      expect(slider.options.delay).to.equal(5555);
    });

    describe('$el property', function () {
      it('should be a jQuery object', function () {
        expect(slider.$el.children).to.be.a('function');
      });

      it('should contains a simple div', function () {
        expect(slider.$el.prop('outerHTML')).equal('<div></div>');
      });
    });

    describe('el property', function () {
      it('should be a div element', function () {
        expect(slider.el).to.have.property('innerHTML');
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

    describe('#build', function () {

      it('must work without data', function () {
        slider.build();
        expect(slider).to.have.property('slides').and.is.a('array');
      });

      it('must work with an empty array as data', function () {
        slider = new window.Slidify({data: []});
        slider.build();
        expect(slider).to.have.property('slides').and.is.a('array');
      });

      it('must work with an array of HTML strings as data', function () {
        slider = new window.Slidify({data: ['<div></div>']});
        slider.build();
        expect(slider).to.have.property('slides').and.is.a('array');
        expect(slider.slides[0]).to.have.property('item').and.is.an('object');
        expect(slider.slides[0].item.prop('outerHTML')).to.equal('<div></div>');
      });

      it('must work with an array of jQuery selectors as data', function () {
        slider = new window.Slidify({data: ['.slide']});
        slider.build();
        expect(slider).to.have.property('slides').and.is.a('array');
        expect(slider.slides[0]).to.have.property('item').and.is.an('object');
        expect(slider.slides[0].item.prop('outerHTML')).to.equal('<div class="slide"></div>');
      });

      it('must work with an array of jQuery objects as data', function () {
        slider = new window.Slidify({data: [$('.slide')]});
        slider.build();
        expect(slider).to.have.property('slides').and.is.a('array');
        expect(slider.slides[0]).to.have.property('item').and.is.an('object');
        expect(slider.slides[0].item.prop('outerHTML')).to.equal('<div class="slide"></div>');
      });

      it('must work with an array of custom objects with HTML string as item', function () {
        slider = new window.Slidify({data: [
          {item: '<div></div>', foo: 'bar'}
        ]});
        slider.build();
        expect(slider).to.have.property('slides').and.is.a('array');
        expect(slider.slides[0]).to.have.property('item').and.is.an('object');
        expect(slider.slides[0]).to.have.property('foo').and.is.equal('bar');
        expect(slider.slides[0].item.prop('outerHTML')).to.equal('<div></div>');
      });

      it('must work with an array of custom objects with jQuery selector as item', function () {
        slider = new window.Slidify({data: [
          {item: '.slide', foo: 'bar'}
        ]});
        slider.build();
        expect(slider).to.have.property('slides').and.is.a('array');
        expect(slider.slides[0]).to.have.property('item').and.is.an('object');
        expect(slider.slides[0]).to.have.property('foo').and.is.equal('bar');
        expect(slider.slides[0].item.prop('outerHTML')).to.equal('<div class="slide"></div>');
      });

      it('must work with an array of custom objects with jQuery object as item', function () {
        slider = new window.Slidify({data: [
          {item: $('.slide'), foo: 'bar'}
        ]});
        slider.build();
        expect(slider).to.have.property('slides').and.is.a('array');
        expect(slider.slides[0]).to.have.property('item').and.is.an('object');
        expect(slider.slides[0]).to.have.property('foo').and.is.equal('bar');
        expect(slider.slides[0].item.prop('outerHTML')).to.equal('<div class="slide"></div>');
      });

      it('must work with a jQuery selector', function () {
        slider = new window.Slidify({data: '.slides'});
        slider.build();
        expect(slider).to.have.property('slides').and.is.a('array');
        expect(slider.slides[0]).to.have.property('item').and.is.an('object');
        expect(slider.slides[0].item.prop('outerHTML')).to.equal('<div class="slide"></div>');
      });

      it('must work with a jQuery object', function () {
        slider = new window.Slidify({data: $('.slides')});
        slider.build();
        expect(slider).to.have.property('slides').and.is.a('array');
        expect(slider.slides[0]).to.have.property('item').and.is.an('object');
        expect(slider.slides[0].item.prop('outerHTML')).to.equal('<div class="slide"></div>');
      });

      it('must work with no data and a DOM element', function () {
        slider = new window.Slidify({el: $('.slides')});
        slider.build();
        expect(slider).to.have.property('slides').and.is.a('array');
        expect(slider.slides[0]).to.have.property('item').and.is.an('object');
        expect(slider.slides[0].item.prop('outerHTML')).to.equal('<div class="slide"></div>');
      });

      it('must work with no data and a jQuery selector as element', function () {
        slider = new window.Slidify({el: '.slides'});
        slider.build();
        expect(slider).to.have.property('slides').and.is.a('array');
        expect(slider.slides[0]).to.have.property('item').and.is.an('object');
        expect(slider.slides[0].item.prop('outerHTML')).to.equal('<div class="slide"></div>');
      });

      it('must use element in priority of data', function () {
        slider = new window.Slidify({el: '.slides', data: ['<div>test1</div>', '<div>slide2</div>']});
        slider.build();
        expect(slider).to.have.property('slides').and.is.a('array');
        expect(slider.slides[0]).to.have.property('item').and.is.an('object');
        expect(slider.slides[0].item.prop('outerHTML')).to.equal('<div class="slide"></div>');
        expect(slider.slides[1]).to.have.property('item').and.is.an('object');
        expect(slider.slides[1].item.prop('outerHTML')).to.equal('<div>slide2</div>');
      });
    });

    describe('#render', function () {
      it('must place slides in $el and clone if needed', function () {
        var data = ['<div>1</div>', '<div>2</div>', '<div>3</div>'];
        slider = new window.Slidify({data: data});
        slider.build();
        slider.depth = 1;
        slider.render();

        expect(slider.$el.html()).equal('<div>3</div><div>1</div><div>2</div>');
      });

      it('must place slides in $el and clone if needed', function () {
        var data = ['<div>1</div>', '<div>2</div>'];
        slider = new window.Slidify({data: data});
        slider.build();
        slider.depth = 1;
        slider.render();

        expect(slider.$el.html()).equal('<div>2</div><div>1</div><div>2</div>');
      });
    });

    describe('#init', function () {
      it('must trigger an "init" event', function (done) {
        slider.on('init', function () {
          done();
        });

        slider.init();
      });

      it('must build and render', function () {
        var data = ['<div>1</div>', '<div>2</div>'];
        slider = new window.Slidify({data: data});
        slider.init();

        expect(slider.$el.html()).equal('<div>2</div><div>1</div><div>2</div>');
      });
    });

    describe('#range', function () {
      it('must compute an index in the current range', function () {
        slider.length = 7;
        expect(slider.range(10)).equal(3);
        expect(slider.range(-2)).equal(5);
      });
    });

    describe('#get', function () {
      it('must get a slide by index', function () {
        var data = ['<div>1</div>', '<div>2</div>'];
        slider = new window.Slidify({data: data});
        slider.build();

        expect(slider.get(0).item.prop('outerHTML')).to.be.equal(data[0]);
      });

      it('must get a slide by index out of range', function () {
        var data = ['<div>1</div>', '<div>2</div>'];
        slider = new window.Slidify({data: data});
        slider.build();

        expect(slider.get(2).item.prop('outerHTML')).to.be.equal(data[0]);
        expect(slider.get(7).item.prop('outerHTML')).to.be.equal(data[1]);
      });
    });

    describe('#current', function () {
      it('must return current slide', function () {
        var data = ['<div>1</div>', '<div>2</div>'];
        slider = new window.Slidify({data: data});
        slider.build();

        slider.index = 0;
        expect(slider.current().item.prop('outerHTML')).to.be.equal(slider.slides[slider.index].item.prop('outerHTML'));

        slider.index = 1;
        expect(slider.current().item.prop('outerHTML')).to.be.equal(slider.slides[1].item.prop('outerHTML'));

        slider.index = 4;
        expect(slider.current().item.prop('outerHTML')).to.be.equal(slider.slides[0].item.prop('outerHTML'));
      });
    });

    describe('#empty', function () {
      it('must empty the $el element and domIndexes', function () {
        slider.$el = $('<div>TEST</div>');
        slider.domIndexes = [0, 1];

        slider.empty();
        expect(slider.$el.html()).to.be.equal('');
        expect(slider.domIndexes.length).equal(0);
      });
    });

    describe('#attach', function () {
      var data = ['<div>1</div>', '<div>2</div>', '<div>3</div>', '<div>4</div>'];

      it('must append or preprend element to DOM', function () {
        slider = new Slidify({data: data});
        slider.build();

        slider.attach(0, 'append');

        expect(slider.$el.html()).equal(data[0]);

        slider.attach(2, 'append');

        expect(slider.$el.html()).equal(data[0] + data[2]);

        slider.attach(1, 'prepend');

        expect(slider.$el.html()).equal(data[1] + data[0] + data[2]);
      });

      it('must clone element if it is already in DOM', function () {
        slider = new Slidify({data: data});
        slider.build();

        slider.attach(2, 'append');

        expect(slider.$el.html()).equal(data[2]);

        slider.attach(2, 'append');

        expect(slider.$el.html()).equal(data[2] + data[2]);
      });
    });

    describe('#appendUpTo', function () {
      it('must append all slides to $el since this.index to index', function () {
        var data = ['<div>0</div>', '<div>1</div>', '<div>2</div>', '<div>3</div>'];
        slider = new Slidify({data: data});
        slider.init();

        expect(slider.$el.html()).equal('<div>3</div><div>0</div><div>1</div>');

        slider.empty();
        slider.init();
        slider.appendUpTo(1);
        expect(slider.$el.html()).equal('<div>3</div><div>0</div><div>1</div>');

        slider.empty();
        slider.init();
        slider.appendUpTo(2);
        expect(slider.$el.html()).equal('<div>3</div><div>0</div><div>1</div><div>2</div>');

        slider.empty();
        slider.init();
        slider.appendUpTo(3);
        expect(slider.$el.html()).equal('<div>3</div><div>0</div><div>1</div><div>2</div><div>3</div>');

        slider.empty();
        slider.init();
        slider.appendUpTo(4);
        expect(slider.$el.html()).equal('<div>3</div><div>0</div><div>1</div>');

        slider.empty();
        slider.init();
        slider.appendUpTo(5);
        expect(slider.$el.html()).equal('<div>3</div><div>0</div><div>1</div>');
      });
    });

    describe('#prependUpTo', function () {
      it('must prepend all slides to $el since this.index to index', function () {
        var data = ['<div>0</div>', '<div>1</div>', '<div>2</div>', '<div>3</div>'];
        slider = new Slidify({data: data});
        slider.init();

        expect(slider.$el.html()).equal('<div>3</div><div>0</div><div>1</div>');

        slider.empty();
        slider.init();
        slider.prependUpTo(-1);
        expect(slider.$el.html()).equal('<div>3</div><div>0</div><div>1</div>');

        slider.empty();
        slider.init();
        slider.prependUpTo(-2);
        expect(slider.$el.html()).equal('<div>2</div><div>3</div><div>0</div><div>1</div>');

        slider.empty();
        slider.init();
        slider.prependUpTo(-3);
        expect(slider.$el.html()).equal('<div>1</div><div>2</div><div>3</div><div>0</div><div>1</div>');

        slider.empty();
        slider.init();
        slider.prependUpTo(-4);
        expect(slider.$el.html()).equal('<div>3</div><div>0</div><div>1</div>');

        slider.empty();
        slider.init();
        slider.prependUpTo(-5);
        expect(slider.$el.html()).equal('<div>3</div><div>0</div><div>1</div>');
      });
    });

    describe('#move', function () {

    });

    /*

     // OLD TESTS

     var data = [1, 2, 3];
     var slides = jQ.map(data, function (d) {
     return { html: d, item: { '0': d, length: 1 } };
     });
     var slider;

     it('must have all functions', function () {
     slider = new Slidify();
     expect(slider.get).to.be.a('function');
     expect(slider.current).to.be.a('function');
     expect(slider.length).to.be.a('function');
     expect(slider.move).to.be.a('function');
     expect(slider.next).to.be.a('function');
     expect(slider.previous).to.be.a('function');
     });

     it('must return good slide on get() call', function () {
     slider = new Slidify({data: data});
     slider.init();
     expect(slider.get(0)).to.be.deep.equal(slides[0]);
     expect(slider.get(2)).to.be.deep.equal(slides[2]);
     });

     it('must return slides length on length() call', function () {
     slider = new Slidify({data: data});
     slider.init();
     expect(slider.length()).to.be.equal(3);
     });

     it('must change current slide on move() call', function () {
     slider = new Slidify({data: data});
     slider.init();
     slider.move(1);
     expect(slider.index).to.be.equal(1);
     expect(slider.current()).to.be.deep.equal(slides[1]);
     });

     it('must trigger a move event on move() call', function (done) {
     slider = new Slidify({data: data});
     slider.init();
     slider.on('move', function () {
     done();
     });
     slider.move(1);
     });

     it('must return good slide on current() call', function () {
     slider = new Slidify({data: data});
     slider.init();
     expect(slider.current()).to.be.deep.equal(slides[0]);
     slider.move(1);
     expect(slider.current()).to.be.deep.equal(slides[1]);
     });

     it('must increase current slide index on next() call', function () {
     // instantiate without change index, index = 0
     slider = new Slidify({data: data});
     slider.init();
     slider.next();
     expect(slider.index).to.be.equal(1);
     expect(slider.current()).to.be.deep.equal(slides[1]);
     });

     it('must not change current on next() call with no loop option', function () {
     // instantiate with given index, index = 2
     slider = new Slidify({data: data, loop: false, index: 2});
     slider.init();
     slider.next();
     expect(slider.index).to.be.equal(2);
     expect(slider.current()).to.be.deep.equal(slides[2]);
     });

     it('must go back to first slide on next() call with loop option', function () {
     // instantiate with given index, index = 2
     slider = new Slidify({data: data, loop: true, index: 2});
     slider.init();
     slider.next();
     expect(slider.index).to.be.equal(0);
     expect(slider.current()).to.be.deep.equal(slides[0]);
     });

     it('must decrease current slide index on previous() call', function () {
     // instantiate with given index, index = 2
     slider = new Slidify({data: data, index: 2});
     slider.init();
     slider.previous();
     expect(slider.index).to.be.equal(1);
     expect(slider.current()).to.be.deep.equal(slides[1]);
     });

     it('must not change slide index on previous() with no loop option', function () {
     // instantiate with given index, index = 0
     slider = new Slidify({data: data, loop: false});
     slider.init();
     slider.previous();
     expect(slider.index).to.be.equal(0);
     expect(slider.current()).to.be.deep.equal(slides[0]);
     });

     it('must go to last index on previous() call with loop option', function () {
     // instantiate with given index, index = 0
     slider = new Slidify({data: data, loop: true});
     slider.init();
     slider.previous();
     expect(slider.index).to.be.equal(2);
     expect(slider.current()).to.be.deep.equal(slides[2]);
     });
     */

  });
});