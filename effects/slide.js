define(["lib/zepto"], function($)
{
	"use strict";
	
	var Slide = function(options)
	{
		$.extend(this, options);
		
		this.initialized = false;
	};

	Slide.prototype = {
	      
	   initialize : function(slider)
	   {
	      if(this.initialized)
	         return ;
	      
	      if(typeof this.container !== "undefined")
            this.container = $(this.container);
         else
            this.container = slider.root;
	      
	      this.slider = slider;
	      
	      this.initialized = true;
	   },
	   
	   gotoSlideIndex : function(index)
      {
         var slideWidth = this.getSlideWidth(),
         containerWidth = this.container.width();
         
         this.slider.attachedSlides().show().css("float", "left");
         this.slider.wrapper.css("position", "absolute");
         this.slider.wrapper.width(slideWidth * 5);
         
         var initLeft = - (slideWidth*(index+2) - (containerWidth - slideWidth) / 2);
         
         this.slider.wrapper.css("left", initLeft);
      },
         
      getSlideWidth : function()
      {
         if(typeof this.slideWidth !== "undefined")
         {
            return this.slideWidth;
         }
         else
         {
            return this.slider.currentSlide.item.width();
         }
      },
	   
	   start : function(slider)
	   {
	      this.initialize(slider);
	      this.gotoSlideIndex(0);
	   },
	   
		animate : function(slider, backward, callback)
		{  
		   this.initialize(slider);
		   
         if(backward)
            this.gotoSlideIndex(1);
         else
            this.gotoSlideIndex(-1);
         
         var slideWidth = this.getSlideWidth(),
             animLeft = parseInt(this.slider.wrapper.css("left")) - slideWidth;
		   
		   if(backward)
		   {
		      animLeft = parseInt(this.slider.wrapper.css("left")) + slideWidth;
		   }
		   
			this.slider.wrapper.animate({left: animLeft}, {duration: 400, complete: callback});
		}
	};

	return Slide;
});