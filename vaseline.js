/*! vaseline v0.1 lemonde.fr */

define(["$"], function($) {

	return (function ($, window, document, undefined) {

		"use strict";

		// Defaults parameters
		var defaults = {
			data: [], // Data
			delay: 5000, // Time between slides in ms
			loop: false, // Loop mode
			startIndex: 0, // First slide
			effect: null, // Effect
			wrapper: null // Wrapper
		};

		//  constructor
		var Slider = function (options)
		{
			var closure = this;

			// Default Options
			this.options = $.extend(defaults, options);

			// slider is not in progress by default
			this.progress = false;

			// No cycling by default, it may be activate later
			this.cycling = false;

			// Init currentSlide
			this.currentIndex = null;
			this.currentSlide = null;

			// Init lastIndex
			this.lastIndex = null;
			this.lastItem = null;

			// Define wrapper object
			this.wrapper = $(this.options.wrapper);

			// Map events
			this.on = $.proxy(this.wrapper.on, this.wrapper);
			this.one = $.proxy(this.wrapper.one, this.wrapper);
			this.off = $.proxy(this.wrapper.off, this.wrapper);

			// Trigger with slider
			this.trigger = function(event, data) {
				if (typeof event == 'string') event = $.Event(event);
				event.slider = closure;
				return closure.wrapper.trigger(event, data);
			}
		};

		// !Prototype with API & Private Methode
		Slider.prototype = {

			init : function() {

				var closure = this;

				// Init slides (html OR data)

				this.slides = [];

				if (this.options.data.length > 0)
				{
					var i, il = this.options.data.length, slide;

					for(i = 0; i < il; i++)
					{
						slide = new Slide(this.options.data[i]);
						this.slides.push(slide);
					}
				}
				
				// Move to start Index
				this.move(this.options.startIndex);

				this.trigger("init");
			},

			move : function (index, forward)
			{
				var closure = this;
				
				// If inProgress flag is not set & not already on requested slide
				if (!this.progress && index !== this.currentIndex)
				{
					this.lastIndex = this.currentIndex;
					this.lastSlide = this.currentSlide;

					this.currentIndex = index;
					this.currentSlide = this.slides[index];
					
					this.trigger("move");

					// Set in progress to prevent other move
					this.progress = true;
					
					this.render(this.currentSlide);
					
					if(!this.lastSlide)
						this._completeMove();
					else
						this.options.effect.animate(this, $.proxy(this._completeMove, this));
				}
			},
			
			_completeMove : function()
			{
				this.trigger("move_complete");
				this.progress = false;
			},
			
			render : function(slide)
			{
				slide.item = slide.data;
			},

			next : function ()
			{
				// If on final slide, loop back to first slide
				if (this.currentIndex === this.slides.length - 1) {
					if (this.options.loop === true)
					this.move(0, true);
				}
				else
				this.move(this.currentIndex + 1, true);
			},

			previous : function ()
			{
				// If on first slide, loop round to final slide
				if (this.currentIndex == 0) {
					if (this.options.loop === true)
					this.move(this.slides.length - 1, false);
				}
				else
				this.move(this.currentIndex - 1, false);
			},

			play: function ()
			{
				this.cycling = setInterval($.proxy(this.next, this), this.options.delay);

				// Listen for slider mouseover
				$(this.wrapper).one('mouseover', $.proxy(this.pause, this));
			},

			pause: function()
			{
				clearInterval(this.cycling); 
				
				// Listen for slider mouseout
				$(this.wrapper).one('mouseout', $.proxy(this.play, this));
			},

			plug : function(plugin)
			{
				plugin.attachTo(this);
			}

		};

		var Slide = function(data)
		{
			this.data = data;
			this.item = null;
		};

		var Transition = function (slider, effect, forward)
		{
			this.slider = slider;
			this.effect = effect;
			this.__init();
		}

		Transition.prototype = {

			// fallback
			fallback: 'fade',

			// Array of possible animations
			anims: ['fade', 'slide'],

			// which element the transition is listening to
			listenTo: false,

			// ! transition public interface

			execute : function ( forward ) {

				var closure = this;

				// DOM shortcuts
				this.lastItem = this.slider.lastItem;
				this.currentItem = this.slider.currentItem;

				// Set in progress to prevent other transition
				this.slider.progress = true;

				// Check if currentItem has his item
				if (typeof this.currentItem.item === "undefined" && this.currentItem.html !== "undefined") {
					// @todo Virer le li quand il sera géré dans la Rosae_View du decorateur
					this.currentItem.item = $('<li>' + this.currentItem.html + '</li>');
				}

				// Check if item is attached to DOM
				if(this.currentItem.attached === false) {
					// Init some properties
					$(this.currentItem.item).css({
						position: 'absolute',
						left: this.wrapper.width() + 'px'
					});
					// Attach item to wrapper
					$(this.currentItem.item).appendTo(this.wrapper);
					// Set attached value to true
					this.currentItem.attached = true;
				}

				closure.slider.trigger("change");

				// no setup by default
				this.setup = false;

				// which sense to move (forward by default)
				this.forward = forward;

				// Call requested transition method
				if (typeof this.transition === "function" ) {
					this.transition();
				}
			},

			// ! transition private methods

			__init : function () {

				$(this.wrapper).css({
					overflow: 'hidden'
				});

			},

			__animate : function (callback) {

				var closure = this;

				this.__setup();

				// Check if transition describes a setup method
				if (typeof this.setup === 'function') {
					// Setup required by transition
					var transition = this.setup();
					setTimeout(function () {
						callback(transition);
						}, 40);
					}
					else {
						// Transition execution
						callback();
					}

					// Listen for CSS transition end on elem (set by transition)
					if (canBrowser.cssTransitions() && this.listenTo) {
						$(this.listenTo).one('webkitTransitionEnd transitionend oTransitionEnd msTransitionend MSTransitionEnd', function() {
							closure.__reset();
						});
					}

				},

				__reset : function () {

					// Additional reset steps required by transition (if any exist)
					if (typeof this.reset === 'function') {
						this.reset();
					}

					this.slider.trigger("after_change");

					// Remove slider obj inProgress flag (i.e. allow new Transition to be instantiated)
					this.slider.progress = false;
				},

				__prefixes : function(obj, props) {

					var output = [];

					// Loop through props, add with each vendor prefix to output array
					for (var prop in props) {
						if(props.hasOwnProperty(prop)) {
							var i = canBrowser.browserVendors.length;
							while (i--) {
								output[canBrowser.browserVendors[i] + prop] = props[prop];
							}
						}
					}

					// Add output array of vendor-ised props to elem
					$(obj).css(output);

				},

				__setup : function() {

				},

				// ! transition effects

				slide : function() {

					var closure = this,
					animation;

					var width = this.wrapper.width();

					this.reset = function () {
						closure.__prefixes(closure.lastItem.item, {'transition' : ''});
						closure.__prefixes(closure.currentItem.item, {'transition' : ''});
						closure.lastItem.item.css({left: width + 'px'});
					};

					// If CSS transitions are supported by browser
					if (canBrowser.cssTransitions()) {

						// Setup steps
						this.setup = function () {

							var left = closure.forward ? width : -1 * width;

							closure.currentItem.item.css({left: left + 'px'});

							// Set event listener to next slide elem
							closure.listenTo = closure.lastItem.item;
						};

						// Execution steps
						animation = function () {

							var left = closure.forward ? -1 * width : width;

							// Add CSS3 transition vendor prefixes
							closure.__prefixes(closure.lastItem.item, {'transition' : 'left ' + closure.options['transitionDuration'] + 'ms ease-in-out'});
							closure.__prefixes(closure.currentItem.item, {'transition' : 'left ' + closure.options['transitionDuration'] + 'ms ease-in-out'});

							// Display next slide over current slide
							closure.lastItem.item.css({'left': left + 'px'});
							closure.currentItem.item.css({'left': 0});

						};
					} 
					else {
						// JS animation fallback
						this.setup = function() {
							closure.currentItem.item.css({'transition':'','opacity':1, 'left': width + 'px'});
						}

						animation = function () {
							closure.lastItem.item.animate({'left': '-' + width + 'px'}, closure.options['transitionDuration']);
							closure.currentItem.item.animate({'left': '0'}, closure.options['transitionDuration'], function () {
								// Reset steps
								closure.__reset();
							});
						};
					}

					this.__animate(animation);

				},

				fade : function() {

					var closure = this,
					animation;

					// If CSS transitions are supported by browser
					if (canBrowser.cssTransitions()) {

						// Setup steps
						this.setup = function () {
							// Set event listener to next slide elem
							closure.listenTo = closure.currentItem.item;
							closure.currentItem.item.css({opacity: 0, left: 0});
						};

						// Execution steps
						animation = function () {

							// Add CSS3 transition vendor prefixes
							closure.__prefixes(closure.lastItem.item, {'transition' : 'opacity ' + closure.options['transitionDuration'] + 'ms ease-in-out'});

							// Add CSS3 transition vendor prefixes
							closure.__prefixes(closure.currentItem.item, {'transition' : 'opacity ' + closure.options['transitionDuration'] + 'ms ease-in-out'});

							// Display next slide over current slide
							if (closure.lastItem !== false) {
								// Add listener on current slide animation
								$(closure.lastItem.item).one('webkitTransitionEnd transitionend oTransitionEnd msTransitionend MSTransitionEnd', function() {
									closure.currentItem.item.css({'opacity' : 1});
								});

								closure.lastItem.item.css({'opacity' : 0});
							}
							else {
								closure.currentItem.item.css({'opacity' : 1});
							}

						};

					} 
					else { 
						// JS animation fallback
						animation = function () {
							closure.lastItem.item.animate({'opacity' : 0}, closure.options['transitionDuration'], function () {
								// Reset steps
								closure.reset();
								closure.__reset();
							});
						};
					}

					this.__animate(animation);
				}

			};

			// ! canBrowser
			// Obj to check browser capabilities
			var canBrowser = {

				// Browser vendor CSS prefixes
				browserVendors: ['', '-webkit-', '-moz-', '-ms-', '-o-', '-khtml-'],

				// Browser vendor DOM prefixes
				domPrefixes: ['', 'Webkit', 'Moz', 'ms', 'O', 'Khtml'],

				// Method to iterate over a property (using all DOM prefixes)
				// Returns true if prop is recognised by browser (else returns false)
				testDom: function (prop) {
					var i = this.domPrefixes.length;
					while (i--) {
						if (document.body.style[this.domPrefixes[i] + prop] !== undefined) {
							return true;
						}
					}
					return false;
				},

				cssTransitions: function () {
					// Use testDom method to check prop (returns bool)
					return this.testDom('Transition');
				},

				cssTransforms3d: function () {
					// Check for vendor-less prop
					if (document.body.style['perspectiveProperty'] !== undefined) {
						return true;
					}
					// Use testDom method to check prop (returns bool)
					return this.testDom('Perspective');
				}

			};

			return Slider;

			})($, window, document);

		});