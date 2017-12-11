$(window).load(function () {
    $(".site-loader").fadeOut("slow");;

    if ($(window).width() > 1170 && (msieversion() >= 10 || msieversion() == 'other')) {
        checkParallax();
    } else {
        console.log('no parallax');
        $('.full-animated-columns .full-column-text').css("transform", "none");
    }
});

jQuery(document).ready(function ($) {

    $('#searchform').submit(function(e) { 
        var s = $( this ).find("#s").val($.trim($( this ).find("#s").val()));
        if (!s.val()) { 
            e.preventDefault(); 
            $('#s').focus();
        }
    });

    if ($('input#acconsento').length > 0) {
        $('input#acconsento').unwrap();
    }

    //center content in home header and set it 100% height
    if ($('.site-home-slider').length > 0) {
        $('.site-home-slider').css('minHeight', $(window).height());

        $(window).on({
            'orientationchange resize': function () {
                $('.site-home-slider').css('minHeight', $(window).height());
            }
        });
    }

    $(window).on("resize orientationchange", function (event) {
        if ($(window).width() > 1170 && (msieversion() >= 10 || msieversion() == 'other')) {
            checkParallax();
        } else {
            console.log('no parallax');
            $('.full-animated-columns .full-column-text').css("transform", "none");
        }
    });

    $(window).scroll(function () {
        if ($(window).scrollTop() >= ($('.site-header').outerHeight(true))) {
            $('.site-header').addClass('fixed-header');
            $('.site-header .site-top').fadeOut(0);

        } else {
            $('.site-header').removeClass('fixed-header');
            $('.site-header .site-top').fadeIn(500);

        }

        if ($(this).scrollTop() > 100) {
            $('.scrollToTop').fadeIn();
        } else {
            $('.scrollToTop').fadeOut();
        }
    });

    if ($('img.aligncenter').length > 0) {
        $('img.aligncenter').parent('p').css('textAlign', 'center');
    }

    $("a[href^='#']").not('[href="#"]').on("click tap", function (e) {
        e.preventDefault();
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top
                }, 500);
                return false;
            }
        }
    });

    $('.site-header .site-header__hamburger').on("click tap", function (e) {
        e.preventDefault();
        $('.site-overlay').css('width', '100%');
    });

    $('.site-overlay .close').on("click tap", function (e) {
        e.preventDefault();
        $('.site-overlay').css('width', '0%');
    });

});

function checkParallax() {
    if ($('.full-animated-columns').length > 0 && $('.full-animated-columns .full-column-text').length > 0 && $('.full-animated-columns .full-column-image').length > 0) {
        var parallaxElements = $('.full-animated-columns .full-column-text'),
            parallaxQuantity = parallaxElements.length;
        var containerHeight = parallaxElements.parent().outerHeight(true);

        var valueToScroll = 1;
        var percentage = 0.2;

        window.requestAnimationFrame(function () {

            for (var y = 0; y < parallaxQuantity; y++) {
                var currentElement = parallaxElements.eq(y);
                var scrolled = $(window).scrollTop();
                var eTop = currentElement.offset().top;

                if ($(window).width() > 1600) {
                    valueToScroll = 1.8;
                } else if ($(window).width() > 1400 && $(window).width() <= 1600) {
                    valueToScroll = 1.5;
                } else if ($(window).width() > 1300 && $(window).width() <= 1400) {
                    valueToScroll = 1.1;
                } 

                currentElement.css({
                    'transform': 'translate3d(0,' + (((eTop - scrolled * valueToScroll) * -percentage)) + 'px, 0)'
                });

            }
        });




        $(window).on('scroll', function () {

            var valueToScroll = 1;
            var percentage = 0.2;

            window.requestAnimationFrame(function () {

                for (var y = 0; y < parallaxQuantity; y++) {
                    var currentElement = parallaxElements.eq(y);
                    var scrolled = $(window).scrollTop();
                    var eTop = currentElement.offset().top;

                    if ($(window).width() > 1600) {
                        valueToScroll = 1.8;
                    } else if ($(window).width() > 1400 && $(window).width() <= 1600) {
                        valueToScroll = 1.5;
                    } else if ($(window).width() > 1300 && $(window).width() <= 1400) {
                        valueToScroll = 1.1;
                    }



                    currentElement.css({
                        'transform': 'translate3d(0,' + ((eTop - scrolled * valueToScroll) * -percentage) + 'px, 0)'
                    });

                }
            });

        });
    }

    return true;
}


function is_touch_device() {
    return 'ontouchstart' in window // works on most browsers
        ||
        navigator.maxTouchPoints; // works on IE10/11 and Surface
};

function msieversion() {

    var toReturn = '';
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf('MSIE ');
    var trident = ua.indexOf('Trident/');

    if (msie > 0) {
        toReturn = parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    } else if (trident > 0) {
        var rv = ua.indexOf('rv:');
        toReturn = parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    } else {
        toReturn = 'other';
    }

    return toReturn;
};