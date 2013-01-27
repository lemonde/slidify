/*! slidify v0.2.0 lemonde.fr */

(function (window, undefined) {

  var Slidify = function ($) {

    /*
     * Private scope
     */

    // Slide constructor
    var Slide = function(data) {
      this.data = data;
      this.item = null;
    },

    /*
     * Constructor
     */
    Slidify = function (options) {

      // Merging default options with those in parameter
      this.options = $.extend({
        data: [], // JSON data or DOM objects
        index: 0, // Initial index
        loop: false, // Loop mode
        delay: 5000, // Time between slides in ms
        effect: null, // Effect
        root: $("<div>") // Root element
      }, options);

      // Slides properties
      this.slides = [];
      this.length = 0;
      this.index = null;
      this.progress = false;

      // DOM properties
      this.$root = this.options.root;
    };

    Slidify.prototype = {

      // Loader
      init: function () {

        // Without data, we can't do anything
        if (this.options.data.length > 0) {

          var data, i, l = this.options.data.length, inDOM = this.$root.children();

          // Transform data into slide items and store them in slides property
          for(i = 0; i < l; i++) {
            data = this.options.data[i];
            // If data is not an object, we convert it
            if(typeof data !== 'object') {
               data = {html: data};
            }
            // Check if data is already in DOM
            // If DOM HTML <> data html we use DOM HTML to avoid blink effect
            if(inDOM[i - this.options.index] !== undefined) {
               data.html = $(inDOM[i - this.index]).get(0);
            }
            // Store
            this.slides.push(new Slide(data));
          }

          // Store length
          this.length = this.slides.length;

          // Check currentIndex
          if (this.slides[this.options.index] !== undefined) {
            this.index = this.options.index;
          }

        }

        this.trigger('init');
      },

      /*
       * Traversing API
       */

      // Move to the slide corresponding to given index
      move: function (index, backward) {

        backward = backward || false;

        if(!this.progress) {
          this.progress = true;
          this.index = index;
          this.progress = false;

          this.trigger("move");
        }
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

      /*
       * Events API
       * Binding to non-dom elements doesn't work anymore since jQuery 1.4.4. :(
       * So we use the main DOM element to simulate event binding on the object
       */

      // Attach an event handler function for one or more events.
      on: function (types, selector, data, fn) {
        this.$root.on(types, selector, data, fn);
      },

      // Remove an event handler.
      off: function (types, selector, fn) {
        this.$root.off(types, selector, fn);
      },

      // Attach a handler to an event executed only one time.
      one: function (types, selector, data, fn) {
        this.$root.one(types, selector, data, fn);
      },

      // Execute all handlers and behaviors for the given event type.
      trigger: function (event, data) {
        if (typeof event === 'string') {
          event = $.Event(event);
        }

        event.slider = this; // hum, not sure we really need this trick
        return this.$root.trigger(event, data);
      }

    };

    return Slidify;
  };

  // Expose slidify as an AMD module
  if (typeof define === 'function' && define.amd) {
    define('slidify', ['jquery'], function ($) { return Slidify($); });
  }

  if (typeof window.jQuery === 'function') {
    // Expose to global
    if(window.slidify === undefined) {
      window.slidify = Slidify(window.jQuery);
    }
  }

})(window);