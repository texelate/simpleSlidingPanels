/*!
 *
 * jQuery simpleSlidingPanels
 *
 * Simple sliding panels
 *
 * @author 			Tim Bennett
 * @version 		1.0
 *
 * Download the latest version at www.texelate.co.uk/lab/simple-sliding-panels/
 *
 * Open source under the MIT license:
 *
 * Copyright (c) 2014 Tim Bennett, Texelate Ltd, www.texelate.co.uk
 *  
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *  
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *  
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 */

 

;(function($){

	$.fn.simpleSlidingPanels = function(options) {  
	
		/**
		 * Defaults
		 */
		var defaults = {  
			
			linkElement:		'a.ssp-link',
			contentElement:		'div.ssp-content',
			activeClass:		'ssp-active',
			easing:				'',
			speed:				500,
			automaticClose:		false,
			linkHTMLOpen:		'[-]',
			linkHTMLClosed:		'[+]',
			linkHTMLClass:		'ssp-dynamic-html'
			
		};
		
		
		/**
		 * Options
		 */
		var options = $.extend(defaults, options);
		
		
		/**
		 * Element counter
		 */
		var elementCounter = 1;
		
		
		/**
		 * Warning prefix
		 */
		var warningPrefix = 'simpleSlidingPanels Warning: ';


		/**
		 * Return each object
		 */
		return this.each(function() {

			/**
			 * Cache elements
			 */
			var $this		= $(this);
			
			var $link		= $this.find(options.linkElement)
			                       .eq(0);	
			
			var $content	= $this.find(options.contentElement)
			                       .eq(0);
			                       
			                       
			/**
			 * Issue warnings if the link and/or content aren't there
			 */
			if($link.length === 0) {
			
				console.log(warningPrefix + 'Link missing')
			
			}
			
			if($content.length === 0) {
			
				console.log(warningPrefix + 'Content missing')
			
			}
			
			
			/**
			 * Close
			 */
			$content.hide();
			
			
			/**
			 * Create extra link HTML
			 */
			$link.prepend('<span class="' + options.linkHTMLClass + '">' + options.linkHTMLClosed + '</span>');
			
			
			/**
			 * Click event handler
			 */
			$this.on('click', options.linkElement, function(e) {

				// Prevent click
				e.preventDefault();
				
				// Cache current object
				var $click = $(this);
				
				// Slide all jobs up
				if(options.automaticClose === true) {
				
					// Animation
					$(options.contentElement).slideUp(options.speed, options.easing);
					
					$(options.linkElement).removeClass(options.activeClass) // Remove active class
									      .children('span.' + options.linkHTMLClass)
									      .eq(0)
									      .html(options.linkHTMLClosed); // Update HTML

				}
				
				// Cache the current content
				var $content = $this.find(options.contentElement)
				                    .eq(0); 
		
				// If the content is not visible, slide down, etc
				if($content.is(':visible') === true) {
				
					// Slide down
					$content.slideUp(options.speed, options.easing);
					
					$click.removeClass(options.activeClass) // Add active class
					      .children('span.' + options.linkHTMLClass)
					      .eq(0)
					      .html(options.linkHTMLClosed); // Update HTML
				
				}
				else {
				
					// Animation
					$content.slideDown(options.speed, options.easing);
					
					$click.addClass(options.activeClass) // Remove active class
					      .children('span.' + options.linkHTMLClass)
					      .eq(0)
					      .html(options.linkHTMLOpen); // Update HTML
				
				}
			
			});
			
			
		});
	
	};

})(jQuery);