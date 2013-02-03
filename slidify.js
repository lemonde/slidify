/*! slidify v0.2.0 lemonde.fr */

(function (window, undefined) {

  var make = function ($) {

    /*
     * Private scope
     */

    /*
     * Constructor
     */
    var Slidify = function (options) {

      // Merging default options with those in parameter
      this.options = $.extend({
        data: [], // JSON data or DOM objects
        index: 0, // Initial index
        depth: 1, // Initial depth
        loop: false, // Loop mode
        delay: 5000, // Time between slides in ms
        effect: null, // Effect
        el: $('<div>') // DOM element
      }, options);

      // Slides properties
      this.slides = [];
      this.domIndexes = [];
      this.length = 0;
      this.index = this.options.index;
      this.depth = this.options.depth;

      // DOM element
      this.$el = $(this.options.el);
      this.el = this.$el.get(0);

      // Events
      this.on = $.proxy(this.$el.on, this.$el);
      this.one = $.proxy(this.$el.one, this.$el);
      this.off = $.proxy(this.$el.off, this.$el);
    };

    Slidify.prototype = {

      /* Event API */

      // Execute all handlers and behaviors for the given event type.
      trigger: function (event, data) {
        if (typeof event === 'string') {
          event = $.Event(event);
        }

        event.slider = this; // hum, not sure we really need this trick
        return this.$el.trigger(event, data);
      },

      /* base API */

      // Loader
      init: function () {

        this.build();

        if (this.length > 0) {
          this.render();
        }

        this.trigger('init');
      },

      // Internal method to build slides
      build: function () {
        var i, l, $root, data;

        this.slides = [];

        // Data is an array
        if ($.type(this.options.data) === 'array' && this.options.data.length > 0) {

          l = this.options.data.length;

          for (i = 0; i < l; i++) {

            // Data contained in DOM is a priority
            if (typeof this.$el.children()[i] !== 'undefined') {
              this.slides.push({item: this.$el.children().eq(i)});
            }
            else {

              data = this.options.data[i];

              // of HTML strings
              // of jQuery selectors
              // of jQuery objects
              if (typeof data === 'string' || typeof data.children !== 'undefined') {
                this.slides.push({item: $(data)});
              }

              // of custom objects
              else {
                data.item = $(data.item);
                this.slides.push(data);
              }
            }
          }
        }

        // Data is contained in
        else {
          
          // a jQuery selector
          // a jQuery object
          if (typeof this.options.data === 'string' || typeof this.options.data.children !== 'undefined') {
            $root = $(this.options.data);
          }

          // the DOM element
          else {
            $root = this.$el;
          }

          l = $root.children().length;
          for (i = 0; i < l; i++) {
            this.slides.push({item: $root.children().eq(i)});
          }
        }

        this.length = this.slides.length;
      },

      // Compute range index
      range: function (index) {
        if (index >= this.length) {
          return index % this.length;
        }

        if (index < 0) {
          return (this.length + index % this.length) % this.length;
        }

        return index;
      },

      /* !Traversing API */

      // Return the slide by given index
      get: function (index) {
        index = this.range(index);
        return this.slides[index];
      },

      // Return the current slide
      current: function () {
        return this.get(this.index);
      },

      // Move to the slide corresponding to given index
      move: function (index, backward) {
        backward = backward || false;

        if (backward) {
          this.prependUpTo(index);
        }
        else {
          this.appendUpTo(index);
        }

        this.index = index;

        this.trigger('move');
      },

      // Move to next slide
      next: function () {
        if (this.index === this.length - 1) {
          if (this.options.loop === true) {
            this.move(0);
          }
        }
        else {
          this.move(this.index + 1);
        }
      },

      // Move to previous slide
      previous: function () {

        if (this.index === 0) {
          if (this.options.loop === true) {
            this.move(this.length - 1, true);
          }
        }
        else {
          this.move(this.index - 1, true);
        }

      },

      /* DOM Manipulation API */

      // Render slidify at current index
      render: function () {
        var i, index, indexes = [];

        // Empty slider
        this.empty();

        // Append current index
        indexes.push(this.index);

        // Append others index
        for (i = 1; i < this.depth + 1; i++) {
          indexes.unshift(this.range(this.index - i));
          indexes.push(this.range(this.index + i));
        }

        // Append slides
        for (i = 0; i < indexes.length; i++) {
          index = indexes[i];
          this.attach(index, 'append');
        }
      },

      // Empty slides
      empty: function () {
        this.$el.empty();
        this.domIndexes = [];
      },

      // Attach slide to DOM by index
      attach: function (index, method) {
        var item = this.get(index).item;

        if (this.domIndexes.indexOf(index)) {
          item = item.clone();
        }

        this.$el[method](item);
        this.domIndexes.push(index);
      },

      // Append slides up to index
      appendUpTo: function (index) {
        var i;

        index = this.range(index);

        for (i = this.index + this.depth + 1; i <= index; i++) {
          this.attach(i, 'append');
        }
      },

      // Prepend slides up to index
      prependUpTo: function (index) {
        var i;

        index = this.range(index);

        for (i = this.range(this.index - this.depth - 1); i >= index; i--) {
          if (index !== this.index) {
            this.attach(i, 'prepend');
          }
        }
      }

    };

    return Slidify;
  };

  // Expose slidify as an AMD module
  if (typeof define === 'function' && define.amd) {
    define('slidify', ['jquery'], function ($) { return make($); });
  }

  if (typeof window.jQuery === 'function') {
    // Expose to global
    if (window.Slidify === undefined) {
      window.Slidify = make(window.jQuery);
    }
  }

})(window);