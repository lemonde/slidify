/*! slidify v0.0.2 lemonde.fr */

(function(window, undefined) {
	var slidify = {};

	// Export slidify to the global object
	window.slidify = slidify;

	// Expose slidify as an AMD module
	if(typeof define === "function" && define.amd) {
		define("slidify", function() { return slidify; });
	}
})(window);