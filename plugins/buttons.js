define(["$"], function($)
{
   var Buttons = function(options)
   {
      this.previous = ".previous-button";
      this.next = ".next-button";
      
      $.extend(this, options);
   };
   
   Buttons.prototype = {
         
      attachTo : function(slider)
      {
         this.slider = slider;
         this.previous = $(this.previous);
         this.next = $(this.next);
         
         this.next.on("click", function() {
            slider.next();
         });

         this.previous.on("click", function() {
            slider.previous();
         });
         
         slider.on("move", $.proxy(this._checkButtonDisplay, this));
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
      }
   };
   
   return Buttons;
});