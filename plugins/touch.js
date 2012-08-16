define(["$"], function($)
{
   var Touch = function(options)
   {
      this.preventDefault = true;
      
      $.extend(this, options);
   };
   
   Touch.prototype = {
         
      attachTo : function(slider)
      {
         var closure = this;
         
         //Private variables for each element
         var originalCoord = { x: 0, y: 0 };
         var finalCoord = { x: 0, y: 0 };
         var threshold = {
            x: slider.wrapper.width() * .15,
            y: slider.wrapper.height() * .1
         };

         // Screen touched, store the original coordinate
         function touchStart(event)
         {
            originalCoord.x = event.targetTouches[0].pageX;
            originalCoord.y = event.targetTouches[0].pageY;
         };

         // Store coordinates as finger is swiping
         function touchMove(event)
         {
            if (closure.preventDefault)
               event.preventDefault();
            
            finalCoord.x = event.targetTouches[0].pageX; // Updated X,Y coordinates
            finalCoord.y = event.targetTouches[0].pageY;
         };

         // Done Swiping
         // Swipe should only be on X axis, ignore if swipe on Y axis
         // Calculate if the swipe was left or right
         function touchEnd(event)
         {
            var changeY = originalCoord.y - finalCoord.y;
            if(changeY < threshold.y && changeY > (threshold.y*-1))
            {
               changeX = originalCoord.x - finalCoord.x;
               
               if(changeX > threshold.x)
                  slider.next()
                  
               if(changeX < (threshold.x*-1))
                  slider.prev()
            }
         };

         // Add gestures to all swipable areas
         slider.wrapper.on("touchstart", touchStart);
         slider.wrapper.on("touchmove", touchMove);
         slider.wrapper.on("touchend", touchEnd);
      }
   };
   
   return Touch;
});