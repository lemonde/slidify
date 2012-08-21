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
	      
	   init : function(slider)
	   {
	      slider.attachSlide(slider.currentSlide);
	   },

		animate : function(slider, forward, callback)
		{
		   slider.lastSlide.item.show().css("opacity", 1);
         slider.currentSlide.item.show().css("opacity", 0.01);
         
			slider.lastSlide.item.animate({opacity: 0}, {
				duration: this.fadeOutDuration,
				complete : function()
				{
					slider.currentSlide.item.animate({opacity: 1}, {duration: this.fadeInDuration, complete: callback});
				}
			});
		},
	   
	   end : function(slider)
	   {
	   }
	};

	return Fade;
});