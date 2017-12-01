/*$(window).load(function() {
    $(".site-loader").fadeOut("slow");;
});*/

jQuery(document).ready(function($){

    /*$('#searchform').submit(function(e) { 
        var s = $( this ).find("#s").val($.trim($( this ).find("#s").val()));
        if (!s.val()) { 
            e.preventDefault(); 
            $('#s').focus();
        }
    });*/
    
    //center content in home header and set it 100% height
    if($('.site-home-slider').length > 0){
        $('.site-home-slider').css('minHeight',$(window).height());

        $(window).on({'orientationchange resize' : function(){
               $('.site-home-slider').css('minHeight',$(window).height());
            }
        });
    }

    $(window).scroll(function(){
        if ($(window).scrollTop() >= ($('.site-header').outerHeight(true))) {
            $('.site-header').addClass('fixed-header');
            $('.site-header .site-top').fadeOut(0);

        }
        else {
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
      $('img.aligncenter').parent('p').css('textAlign','center');
    }

    $("a[href^='#']").not('[href="#"]').on("click tap", function(e) {
        e.preventDefault();
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
          if (target.length) {
            $('html,body').animate({
              scrollTop: target.offset().top
            }, 500);
            return false;
          }
        }
    });

    $('.site-header .site-header__hamburger').on("click tap", function(e) {
        e.preventDefault();
        $('.site-overlay').css('width','100%');
    });

    $('.site-overlay .close').on("click tap", function(e) {
        e.preventDefault();
        $('.site-overlay').css('width','0%');
    });

})


function is_touch_device() {
  return 'ontouchstart' in window        // works on most browsers
      || navigator.maxTouchPoints;       // works on IE10/11 and Surface
};