/*! slidify v0.2.0 lemonde.fr */

(function (window, undefined) {

  var Slidify = function ($) {

    // Constructor

    var Slider = function (options) {

      // Merging default options with those in parameter
      this.options = $.extend({
        data: [], // JSON data or DOM objects
        index: 0, // Initial index
        loop: false, // Loop mode
        delay: 5000, // Time between slides in ms
        effect: null // Effect
      }, options);

      // Slides properties
      this.slides = [];
      this.length = 0;
      this.index = null;

      // DOM properties
      this.$el = $('<div></div>');

      // Events
      this.on = $.proxy(this.$el.on, this.$el);
      this.off = $.proxy(this.$el.off, this.$el);
      this.one = $.proxy(this.$el.one, this.$el);
    };

    Slider.prototype = {

      // Loader
      init: function() {
        // Without data, we can't do anything
        if (this.options.data.length > 0) {
          // Store data in slides property
          this.slides = this.options.data;
          // Store length
          this.length = this.slides.length;
          // Check currentIndex
          if (this.slides[this.options.index] !== undefined) {
            this.index = this.options.index;
          }
        }

        this.trigger('init');
      },

      // Event API
      trigger: function(event, data) {
        if (typeof event === 'string') {
          event = $.Event(event);
        }

        event.slider = this;
        return this.$el.trigger(event, data);
      }

    };

    // Export to global
    if(window.slidify === undefined) {
      window.slidify = Slider;
    }

    return Slider;
  }

  // Expose slidify as an AMD module
  if (typeof define === 'function' && define.amd) {
    define('slidify', ['jquery'], function ($) { return Slidify($); });
  }

  if (typeof window.jQuery === 'function') {
    Slidify(window.jQuery);
  }

})(window);