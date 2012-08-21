define(["lib/zepto"], function($)
{
	"use strict";

	var Buttons = function(options)
	{
		this.previous = ".previous-button";
		this.next = ".next-button";
		this.preventDefault = true;

		$.extend(this, options);
	};

	Buttons.prototype = {

		attachTo : function(slider)
		{
		   var closure = this;
		   
			this.slider = slider;
			this.previous = $(this.previous, this.slider.root);
			this.next = $(this.next, this.slider.root);

			this.next.on("click", function(e) {
				slider.next();
				
				if(closure.preventDefault)
				   e.preventDefault();
			});

			this.previous.on("click", function(e) {
				slider.previous();
				
				if(closure.preventDefault)
               e.preventDefault();
			});

			slider.on("move", $.proxy(this._checkButtonDisplay, this));
			slider.on("init", $.proxy(this._checkButtonDisplay, this));
		},

		_checkButtonDisplay : function()
		{
			if(this.slider.options.loop === false)
			{
				if(this.slider.currentIndex === this.slider.slides.length - 1)
				   this.next.hide();
				else
				   this.next.show();

				if(this.slider.currentIndex === 0)
				   this.previous.hide();
				else
				   this.previous.show();
			}
			else
			{
			   this.next.show();
			   this.previous.show();
			}
		}
	};

	return Buttons;
});