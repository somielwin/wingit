var isScrollingAllowed = true;
var win = $(window);
var doc = $(document);

//get all elements with class and get the biggest box
function get_biggest(elements){
	var biggest_height = 0;
	for ( var i = 0; i < elements.length ; i++ ){
		var element_height = $(elements[i]).height();
		//compare the height, if bigger, assign to variable
		if(element_height > biggest_height ) biggest_height = element_height;
	}
	return biggest_height;
}

function resize() {
	var windowWidth = $(window).width();
	var windowHeight = $(window).height();

	// STICKY FOOTER
	var headerHeight = $('header').outerHeight();
	var footerHeight = $('footer').outerHeight();
	var footerTop = (footerHeight) * -1
	$('footer').css({marginTop: footerTop});
	$('#main-wrapper').css({paddingBottom: footerHeight});

	// for vertically middle content
	$('.bp-middle').each(function() {
		var bpMiddleHeight = $(this).outerHeight() / 2 * - 1;
		$(this).css({marginTop: bpMiddleHeight});
	});

	// for equalizer
	$('.classname').css({minHeight: 0});
	  var ClassName = get_biggest($('.classname'));
	  $('.classname').css({minHeight: ClassName});
}


function initCustomForm() {
    $('select.custom-select').each(function() {
        $(this).wrap('<div class="custom-select-wrapper" />');
        $(this).before('<div class="custom-select-display" />');
        $(this).change(function() {
            $(this).siblings('.custom-select-display').text( $(this).find('option:selected').text() );
        });
        $(this).keyup(function() {
            $(this).siblings('.custom-select-display').text( $(this).find('option:selected').text() );
        });
        $(this).change();
    });
}

function pageInitAnim() {
	var userAgent = navigator.userAgent || navigator.vendor || window.opera;

	if (/android/i.test(userAgent)) {
        $('.hiding').removeClass('hiding').css('opacity','0');
		$('.animated').each(function() {
			var element = $(this);
			TweenMax.to(element, .3, { opacity: 1, ease: Expo.easeInOut});
		});
	} else {
		$('.animated').appear(function() {
            var element = $(this);
            var animation = element.data('animation');
            var animationDelay = element.data('delay');
            if(animationDelay) {
              setTimeout(function(){
                  element.addClass( animation + " visible" );
                  element.removeClass('hiding');
              }, animationDelay);
            } else {
              element.addClass( animation + " visible" );
              element.removeClass('hiding');
            }               
        }, {accY: -90});
	}
}

// SMOOTH SCROLL
function smoothScroll() {
    var scrollTime = 1;
    var scrollDistance = 150;

    $(window).on("mousewheel DOMMouseScroll", function(event) {
        event.preventDefault();
        if (isScrollingAllowed) {

            // var delta = event.originalEvent.wheelDelta / 120 || -event.originalEvent.detail / 3;
            var delta = ( Math.abs(event.originalEvent.wheelDelta) < 120 ? event.originalEvent.wheelDelta / 6 : event.originalEvent.wheelDelta / 120 ) || -event.originalEvent.detail;
            var scrollTop = win.scrollTop();
            var finalScroll = scrollTop - parseInt(delta * scrollDistance);

            TweenMax.to(win, scrollTime, {
                scrollTo: { y: finalScroll, autoKill: true },
                ease: Power1.easeOut,
                autoKill: true,
                overwrite: 5
            });
        }
    });

}

$(window).resize(function() {
	resize();

});

$(document).ready(function() {
	pageInitAnim();
});

$(window).load(function() {
	resize();

	// preloader once done
	Pace.on('done', function() {
		// totally hide the preloader especially for IE
		setTimeout(function() {
			$('.pace-inactive').hide();
			pageInitAnim();
			smoothScroll();
			initCustomForm();
			

			if (Modernizr.touch) {
				$('html').addClass('bp-touch');
			}

			$('.find-out-more').click(function(e){
				e.preventDefault();

			});

		}, 500);

	});
});




