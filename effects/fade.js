define(["lib/zepto"], function($)
{
	"use strict";
	
	var Fade = function(options)
	{
		this.fadeOutDuration = 400;
		this.fadeInDuration = 2000;

		$.extend(this, options);
	};

	Fade.prototype = {
	      
	   start : function(slider, backward)
	   {
	      
	   },
	   
		animate : function(slider, backward, callback)
		{
		   slider.lastSlide.item.show().css("opacity", 1).css("position", "absolute");
         slider.currentSlide.item.show().css("opacity", 0.01).css("position", "absolute");
         
			slider.lastSlide.item.animate({opacity: 0}, {
				duration: this.fadeOutDuration,
				complete : function()
				{
					slider.currentSlide.item.animate({opacity: 1}, {duration: this.fadeInDuration, complete: callback});
				}
			});
		}
	};

	return Fade;
});