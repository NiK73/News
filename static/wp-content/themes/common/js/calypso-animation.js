var initScrollAnimation = function(){
	var elements = $('.animate');
	var windowHeight = $(window).height();
	$(window).on('load scroll', scrollAnimation);

	function scrollAnimation() {
		var windowScrollTop = $(window).scrollTop();
		var windowBottom = (windowScrollTop + windowHeight);
		$.each(elements, function () {
			var element = $(this);
			var elementTop = element.offset().top;
			var elementBottom = (elementTop + element.outerHeight());
			var elementMiddle = elementTop + element.outerHeight()/2;

			if ( (elementBottom >= windowScrollTop) && (elementTop <= windowBottom) ) {
				element.addClass('animate--animated');
			}
		});
	}
}

$(document).ready(function () {
	initScrollAnimation();

	(function($){
		$.fn.parallax = function(options){
			var $$ = $(this);
			var defaults = {
				relative: 'body',
				coeff: 0.95,
				min_width: 320
			};

			var opts = $.extend(defaults, options);

			return this.each(function() {
				if ($(opts.relative).length > 0) {
					var relativeTop = $(opts.relative).offset().top;
					var relativeBottom = relativeTop + $(opts.relative).height();
				} else {
					relativeTop = relativeBottom = 0;
				}

				$(window).bind('scroll', function() {
					var visibleTop = $(window).scrollTop(), visibleBottom = visibleTop+$(window).height(), windowWidth = $(window).width();
					if (windowWidth >= opts.min_width) {
						if ((visibleTop <= relativeBottom) && (visibleBottom > relativeTop)) {
							newCoord = (visibleTop - relativeTop) * opts.coeff;
							$$.css({
								'transform': 'translate3d(0, ' + newCoord + 'px, 0px)',
								'transition': 'none'
							}).addClass("scrolling");
						}
					} else {
						$$.css({
							'transform': '',
							'transition': ''
						}).removeClass("scrolling")
					}
				});
			});
		};

		$.fn.calypso_tabs = function(options) {
			var $$ = $(this);
			var prefix = "calypso-tabs";
			if (options.prefix) {
				prefix = options.prefix;
			}

			if (options.active) {
				$(this).find("." + prefix + "__title[data-tab=" + options.active + "]").addClass(prefix + "__title--active");
				$(this).find("." + prefix + "__content[data-tabcontent=" + options.active + "]").addClass(prefix + "__content--active");
			}
			return this.find("." + prefix + "__title").each(function() {
				$(this).click(function () {
					$$.find("." + prefix + "__title").removeClass(prefix + "__title--active");
					$(this).addClass(prefix + "__title--active");
					$$.find("." + prefix + "__content").removeClass(prefix + "__content--active");
					id = $(this).attr("data-tab");
					$$.find("." + prefix + "__content[data-tabcontent=" + id + "]").addClass(prefix + "__content--active");
				});
			});
		};
	})(jQuery);

	$(window).on('load', function () {
			var videoWidth = $(".calypso-video iframe").width();
			var height = videoWidth * 0.565;
			$(".calypso-video iframe").height(height);
		}
	);

	/*
	$('ul.tabs li').click(function(){
		var tab_id = $(this).attr('data-tab');

		$('ul.tabs li').removeClass('current');
		$('.tab-content').removeClass('current');

		$(this).addClass('current');
		$("#"+tab_id).addClass('current').slick({
			infinite: true,
			slidesToShow: 5,
			slidesToScroll: 5,
			dots: true
		});
	})
	*/
});