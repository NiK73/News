/* First tile animation */
$(document).ready(function() {
	var controller = new ScrollMagic.Controller();

	hero_animation = function () {
		var scroll_length = 480;

		/* Stop move header block */
		var header_block = new ScrollMagic.Scene({
			duration: scroll_length
		})
			.setPin(".sell-hero--animation")
			.addTo(controller);

		/* Move tablet and phone */
		new ScrollMagic.Scene({
			duration: scroll_length
		})
			.setTween(
				TweenMax.fromTo(".sell-hero--animation .sell-hero__tablet", 1,
					{right: "-28%"},
					{right: "-90%"}
				)
			)
			.addTo(controller);

		new ScrollMagic.Scene({
			duration: scroll_length
		})
			.setTween(
				TweenMax.fromTo(".sell-hero--animation .sell-hero__phone", 1,
					{top: -550, left: "20%"},
					{top: -200, left: "-10%"}
				)
			)
			.addTo(controller);

		/* Increase tablet */
		new ScrollMagic.Scene({
			duration: scroll_length
			//offset: sell_hero_length*.35,
			//duration: sell_hero_length*.65
		})
			.setTween(
				TweenMax.fromTo(".sell-hero--animation .sell-hero__tablet", 1,
					{height: 620},
					{height: 0}
				)
			)
			.addTo(controller);

		/* Move descr */
		new ScrollMagic.Scene({
			duration: scroll_length
			//offset: sell_hero_length*.35,
			//duration: sell_hero_length*.65
		})
			.setTween(
				TweenMax.fromTo(".sell-hero--animation .sell-hero__tablet img", 1,
					{top: 0, width: "65%"},
					{top: -280, width: "80%"}
				)
			)
			.addTo(controller);

		new ScrollMagic.Scene({
			duration: scroll_length
			//offset: sell_hero_length*.35,
			//duration: sell_hero_length*.65
		})
			.setTween(
				TweenMax.fromTo(".sell-hero--animation .sell-hero__phone img", 1,
					{width: "25%"},
					{width: "20%"}
				)
			)
			.addTo(controller);

		new ScrollMagic.Scene({
			duration: scroll_length
		})
			.setTween(
				TweenMax.fromTo(".sell-hero--animation .sell-hero__descr", 1,
					{opacity: 0.3},
					{opacity: 1}
				)
			)
			.addTo(controller);

		new ScrollMagic.Scene({
			duration: scroll_length
		})
			.setTween(
				TweenMax.fromTo(".sell-hero--animation .sell-hero__block", 1,
					{'margin-top': 64},
					{'margin-top': 0}
				)
			)
			.addTo(controller);

		$(".sticky-promo").each(function () {
			var sticky_promo_id = $(this).attr("data-sticky-promo-id");
			var sticky_promo_height = $(this).height() + 128;
			if (sticky_promo_id) {
				new ScrollMagic.Scene({
					triggerElement: "#sticky-promo--" + sticky_promo_id,
					duration: sticky_promo_height
				})
					.setClassToggle("#sticky-promo__image--" + sticky_promo_id, "hpc-slider__slide--animated")
					//.addIndicators()
					.addTo(controller);
			}
		});

	};

	var check_hero_animation = function () {
		if ($(".sell-hero__container").width() > 912) {
			if(!controller.length) {
				controller.destroy();
				$(".sell-hero *, .scrollmagic-pin-spacer").attr("style", "");
				controller = new ScrollMagic.Controller();
				$(".sell-hero").addClass("sell-hero--animation");
				hero_animation();
				if ($(document).scrollTop() > 280) {
					setTimeout(function () {
						$(".scrollmagic-pin-spacer").css("min-height", 0);
					}, 100);
				}
			}
		} else {
			controller.destroy();
			$(".sell-hero *, .scrollmagic-pin-spacer").attr("style", "");
			$(".sell-hero").removeClass("sell-hero--animation");

			$(".sticky-promo__image").trigger("sticky_kit:detach");
		}
	};

	check_hero_animation();
	$(window).resize(function() {
		check_hero_animation();
	});

	/* Second tile animation */
	/*
	$(".sticky-promo__image.hpc-slider").stick_in_parent({
		parent: ".sticky-promo"
	});
	*/

	/*
	$(".sticky-promo").each(function() {
		let id = $(this).attr("data-sticky-promo-id");
		let sticky_height = $(this).find(".sticky-promo__image img").height();
		$(this).find(".sticky-promo__image").css("height", sticky_height);
		// build scenes
		new ScrollMagic.Scene({triggerElement: "#sticky-promo--" + id, duration: sticky_height/5})
			.triggerHook(0)
			.setPin("#sticky-promo--" + id + " .sticky-promo__image img")
			.setClassToggle("#sticky-promo--" + id + " .sticky-promo__image", "sticky-promo__image--animation")
			//.on("enter leave", updateBox)
			.addIndicatorsadd indicators (requires plugin)
			.addTo(controller);
	});
	*/
});