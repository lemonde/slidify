define(["lib/zepto"], function($)
{
	"use strict";
	
	var Slide = function(options)
	{
		$.extend(this, options);
	};

	Slide.prototype = {
	      
	   init : function(slider, backward)
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
         
         if(!backward)
         {
            initLeft = - (slideWidth*2 - (containerWidth - slideWidth) / 2);
         }
         
         slider.wrapper.css("left", initLeft);
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
	   
		animate : function(slider, backward, callback)
		{  
		   var slideWidth = this.getSlideWidth(slider),
		       animLeft = parseInt(slider.wrapper.css("left")) - slideWidth;
		   
		   if(!backward)
		   {
		      animLeft = parseInt(slider.wrapper.css("left")) + slideWidth;
		   }
		   
			slider.wrapper.animate({left: animLeft}, {duration: 400, complete: callback});
		}
	};

	return Slide;
});