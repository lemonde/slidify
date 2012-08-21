define(["lib/zepto"], function($)
{
	"use strict";
	
	var Slide = function(options)
	{
		this.container = $('.portfolio_slider.une'); // to pass

		$.extend(this, options);
	};

	Slide.prototype = {
	      
	   init : function(slider)
	   {
	      
	   },
	   
		animate : function(slider, forward, callback)
		{  
		   var slideWidth = slider.currentSlide.item.width(),
		       computedWidth = parseInt(slider.wrapper.css("left")) - slideWidth;
		   
		   if(!forward)
		   {
		      computedWidth = parseInt(slider.wrapper.css("left")) + slideWidth;
		   }
		   
			slider.wrapper.animate({left: computedWidth}, {duration: 300, complete: callback});
		},
		
		end : function(slider)
      {
         slider.wrapper.html('');
         
         slider.attachSlide(slider.getRelativeSlide(-2));
         slider.attachSlide(slider.getRelativeSlide(-1));
         slider.attachSlide(slider.currentSlide);
         slider.attachSlide(slider.getRelativeSlide(1));
         slider.attachSlide(slider.getRelativeSlide(2));
         
         var slideWidth = slider.currentSlide.item.width(),
             containerWidth = this.container.width();
         
         slider.wrapper.width(slideWidth * 5);
         
         slider.wrapper.css("position", "absolute");
         slider.wrapper.css("left", - (slideWidth*2 - (containerWidth - slideWidth) / 2));
      }
	};

	return Slide;
});