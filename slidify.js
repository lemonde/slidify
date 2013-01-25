/*! slidify v0.0.2 lemonde.fr */

(function (window, undefined) {

  var build = function ($) {
    var slidify = {};

    slidify.Slider = function (options) {
      this.options = {
        data: [], // JSON data or DOM objects
        delay: 5000, // Time between slides in ms
        loop: true, // Loop mode
        startIndex: 0, // Start slide index
        effect: null, // Effect
        wrapper: null, // Wrapper
        root: null // Root element
      };

      this.options = $.extend(this.options, options);
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