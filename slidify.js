/*! vaseline v0.1 lemonde.fr */

define(["lib/zepto"], function($) {

	return (function ($, window, document, undefined) {

		"use strict";

      var Slide = function(data)
      {
         this.data = data;
         this.item = null;
      };

      //  constructor
      var Slider = function (options)
      {
         this.options = {
            data: [], // Data
            delay: 5000, // Time between slides in ms
            loop: true, // Loop mode
            startIndex: 0, // First slide
            effect: null, // Effect
            wrapper: null, // Wrapper
            root: null // Root element
         };
         
         // Default Options
         this.options = $.extend(this.options, options);

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
			this.root = $(this.options.root);
			this.wrapper = $(this.options.wrapper, this.root);

			// Map events
			this.on = $.proxy(this.wrapper.on, this.wrapper);
			this.one = $.proxy(this.wrapper.one, this.wrapper);
			this.off = $.proxy(this.wrapper.off, this.wrapper);
			
			this.currentEffect = null;
		};

		// !Prototype with API & Private Methode
		Slider.prototype = {
		      
		   trigger : function(event, data)
		   {
		      if (typeof event == 'string') event = $.Event(event);
            event.slider = this;
            return this.wrapper.trigger(event, data);
		   },

			init : function() {

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
				
				this.wrapper.html('');
				
				// Move to start Index
				this.move(this.options.startIndex);

				this.trigger("init");
			},
			
			/**
			 * Get a slide relatively to the current index
			 * getRelativeSlide(1)
			 * getRelativeSlide(0)
			 * getRelativeSlide(-1)
			 */
			getRelativeSlide : function(relativeIndex)
			{
			   var computedIndex = this.currentIndex + relativeIndex;
			   
			   if(computedIndex > this.slides.length - 1)
			   {
			      computedIndex -= this.slides.length;
               this.getRelativeSlide(computedIndex);
			   }
			   
			   if(computedIndex < 0)
            {
			      computedIndex += this.slides.length;
               this.getRelativeSlide(computedIndex);
            }
			   
			   return this.slides[computedIndex];
			},
			
			attachSlide : function(slide)
			{
			   this.renderSlide(slide);
			   slide.item.appendTo(this.wrapper);
			},
			
			detachSlide : function (slide)
			{
			   if(slide.item)
			      slide.item.remove();
			},
			
			renderSlide : function(slide)
         {
			   if(!slide.item)
			      slide.item = $(this.render(slide.data));
         },

			move : function (index, backward)
			{
			   backward = typeof backward !== "undefined" && backward;
			   
				// If inProgress flag is not set & not already on requested slide
				if (!this.progress && index !== this.currentIndex)
				{
					this.lastIndex = this.currentIndex;
					this.lastSlide = this.currentSlide;

					this.currentIndex = index;
					this.currentSlide = this.slides[index];
					
					this.progress = true;
					
					if(typeof this.options.effect.length !== "undefined" && this.options.effect.length > 0)
					   this.currentEffect = this.options.effect[Math.floor(Math.random()*this.options.effect.length)];
					else
					   this.currentEffect = this.options.effect;
					
					this.clear();
					
					if(!backward)
					   this.detachSlide(this.getRelativeSlide(-3));
					else
					   this.detachSlide(this.getRelativeSlide(3));
					
	            this.attachSlide(this.getRelativeSlide(-2));
	            this.attachSlide(this.getRelativeSlide(-1));
	            this.attachSlide(this.currentSlide);
	            this.attachSlide(this.getRelativeSlide(1));
	            this.attachSlide(this.getRelativeSlide(2));
	            
	            this.getRelativeSlide(-2).item.hide();
	            this.getRelativeSlide(-1).item.hide();
	            this.getRelativeSlide(1).item.hide();
	            this.getRelativeSlide(2).item.hide();
	            this.currentSlide.item.show();
	            
	            this.trigger("move");
	            
					if(!this.lastSlide)
					{
					   this.currentEffect.start(this);
						this._completeMove();
					}
					else
					{
					   this.currentEffect.animate(this, backward, $.proxy(this._completeMove, this));
					}
				}
			},
			
			attachedSlides : function()
			{
			   return this.wrapper.children();
			},
			
			clear : function()
			{
			   this.wrapper.attr("style", "");
			   this.attachedSlides().attr("style", "");
			},
			
			_completeMove : function()
			{
            this.progress = false;
				this.trigger("move_complete");
			},
			
			render : function(data)
			{
				return data;
			},

			next : function ()
			{
				// If on final slide, loop back to first slide
				if (this.currentIndex === this.slides.length - 1) {
					if (this.options.loop === true)
					this.move(0, false);
				}
				else
				this.move(this.currentIndex + 1, false);
			},

			previous : function ()
			{
				// If on first slide, loop round to final slide
				if (this.currentIndex == 0) {
					if (this.options.loop === true)
					this.move(this.slides.length - 1, true);
				}
				else
				this.move(this.currentIndex - 1, true);
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

		return Slider;

	})($, window, document);
});