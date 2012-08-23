define(["lib/zepto"], function($)
{
	"use strict";
	
	var Slide = function(options)
	{
		$.extend(this, options);
	};

	Slide.prototype = {
	   
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
		   if(typeof this.container !== "undefined")
            this.container = $(this.container);
         else
            this.container = slider.root;
		   
		   var slideWidth = this.getSlideWidth(slider),
         containerWidth = this.container.width();
         
         slider.attachedSlides().show().css("float", "left");
         slider.wrapper.css("position", "absolute");
         slider.wrapper.width(slideWidth * 5);
         
         var initLeft = - (slideWidth - (containerWidth - slideWidth) / 2);
         
         if(!forward)
         {
            initLeft = - (slideWidth*3 - (containerWidth - slideWidth) / 2);
         }
         
         slider.wrapper.css("left", initLeft);
         
		   var animLeft = parseInt(slider.wrapper.css("left")) - slideWidth;
		   
		   if(!forward)
		   {
		      animLeft = parseInt(slider.wrapper.css("left")) + slideWidth;
		   }
		   
			slider.wrapper.animate({left: animLeft}, {duration: 400, complete: callback});
		}
	};

	return Slide;
});