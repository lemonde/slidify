define(["lib/zepto"], function($)
{
	"use strict";
	
	var Slide = function(options)
	{
		$.extend(this, options);
	};

	Slide.prototype = {
	      
	   init : function(slider)
	   {
	      if(typeof this.container !== "undefined")
	         this.container = $(this.container);
	      else
	         this.container = slider.root;
	   },
	   
	   getSlideWidth : function(slider)
	   {
	      if(typeof this.slideWidth !== "undefined")
	      {
	         return this.slideWidth;
	      }
	      else
	      {
	         return slider.currentSlide.item.width();
	      }
	   },
	   
		animate : function(slider, forward, callback)
		{  
		   var slideWidth = this.getSlideWidth(slider),
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
         
         var slideWidth = this.getSlideWidth(slider),
             containerWidth = this.container.width();
         
         slider.wrapper.width(slideWidth * 5);
         
         slider.wrapper.css("position", "absolute");
         slider.wrapper.css("left", - (slideWidth*2 - (containerWidth - slideWidth) / 2));
      }
	};

	return Slide;
});