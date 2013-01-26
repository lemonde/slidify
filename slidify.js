/*! slidify v0.2.0 lemonde.fr */

(function (window, undefined) {

  var build = function ($) {
    var slidify = {};

    slidify.Slider = function (options) {

      // Default options
      this.options = {
        data: [], // JSON data or DOM objects
        index: 0, // Initial index
        loop: false, // Loop mode
        delay: 5000, // Time between slides in ms
        effect: null // Effect
      };

      // Merging default options with those in parameter
      this.options = $.extend(this.options, options);

      // Slider's slides
      this.slides = [];

      // Slides length
      this.length = 0;

      // Current index
      this.index = null;

      this.$el = $('<div></div>');

      this.on = $.proxy($(this.$el).on, this.$el);
      this.one = $.proxy($(this.$el).one, this.$el);
      this.off = $.proxy($(this.$el).off, this.$el);
    };

    slidify.Slider.prototype = {

      init: function () {
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

      trigger: function (event, data) {
        if (typeof event === 'string') {
          event = $.Event(event);
        }

        event.slider = this;
        return $(this.$el).trigger(event, data);
      }
    };

    // Export slidify to the global object
    window.slidify = slidify;

    return slidify;
  };
  

  // Expose slidify as an AMD module
  if (typeof define === 'function' && define.amd) {
    define('slidify', ['jquery'], function ($) { return build($); });
  }

  if (typeof window.jQuery === 'function') {
    build(window.jQuery);
  }

})(window);