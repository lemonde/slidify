slidify
=======

Slidify is a slideshow written in javascript and based on zepto / jQuery and AMD / CommonJS modules. It's light, we can add some plugins, some effects very easyly.

How to use it ?
---------------

````javascript
require(["slidify", "effects/slide", "plugins/buttons"], function(Slider, Slide, Buttons)
  {		
		var slider = new Slider({
		   root: ".slidify",
			 wrapper: ".slider",
			 data : $('.slidify .slider li'),
			 effect : new Slide
		});
		
		slider.plug(new Buttons);
		slider.init();
	});
````

License
=======

Copyright (c) 2012 Bergé Greg

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

Credits
=======

Written and maintained by [Ludowic Werwinski][ludow], [Greg Bergé][neoziro].

Build an used on [Le Monde.fr](http://www.lemonde.fr).

[neoziro]: http://github.com/ludow
[neoziro]: http://github.com/neoziro
