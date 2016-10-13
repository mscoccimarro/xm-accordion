/*
Copyright (c) <2014> - Scoccimarro Maximiliano

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
(function($) {

	var defaults = {
		// General
		mode: 'vertical',
		autoClose: true,
		startOpen: 0,
		easing: 'swing',
		speed: 600,
		offset: 0,
		
		// Callbacks
		onOptionClick: function() {}
	}

	$.fn.xmaccordion = function(options) {

		if(this.length == 0) return this;

		// namespace, reference and global
		var accordion = {},
			ac = this,
			minWidth, maxWidth;

		/**
		 * Initializes and validates namespace settings
		 */
		var init = function() {
			// merge settings
			accordion.settings = $.extend({}, defaults, options);
			// parse speed setting
			accordion.settings.speed = parseInt(accordion.settings.speed);
			// validate speed, return to default value if not valid
			if(accordion.settings.speed <= 0)
				accordion.settings.speed = 600;
			// parse startOpen setting
			accordion.settings.startOpen = parseInt(accordion.settings.startOpen);
			// validate startOpen, return to default value if not valid
			if(accordion.settings.startOpen < 0)
				accordion.settings.startOpen = 0;
			if(accordion.settings.mode != 'vertical') {
				minWidth = parseInt(ac.children('li').not('.selected').css('width')),
				maxWidth = parseInt(ac.find('.sub-items > li').css('width')) + minWidth - accordion.settings.offset;
			}
			// if startOpen is set, open set option 
			if(accordion.settings.startOpen)
				openOption(accordion.settings.mode, accordion.settings.startOpen);
			// event definition
			ac.children('li').on('click', showItems);
			// prevent the event from bubbling up de DOM tree
			ac.find('.sub-items li').on('click', stopBubbling);
		};

		/**
		 * Opens option on start
		 * optionNumber goes from 1 to n
		 */
		var openOption = function(mode, optionNumber) {
			if(mode == 'vertical') {
				ac
				  .children('li')
			      .eq(optionNumber-1)
			      .addClass('selected')
			      .children('.sub-items')
			      .show();
			} else {
				ac
				  .children('li')
				  .eq(optionNumber-1)
				  .addClass('selected')
				  .css('width', maxWidth);
			}
		};

		/**
		 * Shows sub-items of selected option
		 */
		var showItems = function(e) {
			if( $(this).find('.sub-items') ) e.preventDefault();
			var listItem = $(this);

			if(accordion.settings.mode == 'vertical') {
				// close current item if selected
				if(listItem.hasClass('selected')) {
					listItem
						.removeClass('selected')
						.children('.sub-items')
		 				.slideUp(accordion.settings.speed, accordion.settings.easing);
				} else {
					// if autoClose is set
					if(accordion.settings.autoClose) 
				 		closeItems(accordion.settings.mode);		
					// open current item
					listItem
						.addClass('selected')
						.children('.sub-items')
						.slideDown(accordion.settings.speed, accordion.settings.easing);
				}
			// if horizontal
			} else {
				// close current item if selected
				if(listItem.hasClass('selected')) {
					listItem
						.removeClass('selected')
						.animate({
						  	width: minWidth
						}, accordion.settings.speed, accordion.settings.easing);
				} else {
					// if autoClose is set
					if(accordion.settings.autoClose) 
				 		closeItems(accordion.settings.mode);
					// open current
					listItem
						.addClass('selected')
						.animate({
							width: maxWidth
						}, accordion.settings.speed, accordion.settings.easing);
				}
			}
		};

		/**
		 * Closes all sub-items
		 */
		var closeItems = function(mode) {
			if(mode == 'vertical') {
				ac
		 		  .children('li')
		 		  .filter('.selected')
				  .removeClass('selected') 			
				  .children('.sub-items')
				  .slideUp(accordion.settings.speed, accordion.settings.easing);
			} else {
				ac
				  .children('li')
				  .filter('.selected')
				  .removeClass('selected')
				  .animate({
				  	width: minWidth
				  }, accordion.settings.speed, accordion.settings.easing);
			}
		}

		/**
		 * Prevent sub-item click from bubbling up
		 */
		var stopBubbling = function(e) {
			e.stopPropagation();
		}

		init();
		return this;
	};

}(jQuery));