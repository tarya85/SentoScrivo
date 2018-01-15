"use strict";

(function ($) {

  /**
   * Copyright 2012, Digital Fusion
   * Licensed under the MIT license.
   * http://teamdf.com/jquery-plugins/license/
   *
   * @author Sam Sehnert
   * @desc A small plugin that checks whether elements are within
   *     the user visible viewport of a web browser.
   *     only accounts for vertical position, not horizontal.
   */

  $.fn.visible = function (partial) {

    var $t = $(this),
        $w = $(window),
        viewTop = $w.scrollTop(),
        viewBottom = viewTop + $w.height(),
        _top = $t.offset().top,
        _bottom = _top + $t.height(),
        compareTop = partial === true ? _bottom : _top,
        compareBottom = partial === true ? _top : _bottom;

    return compareBottom <= viewBottom && compareTop >= viewTop;
  };
})(jQuery);

var win = $(window);

var allMods = $(".module");

allMods.each(function (i, el) {
  var el = $(el);
  if (el.visible(true)) {
    el.addClass("already-visible");
  }
});

win.scroll(function (event) {

  allMods.each(function (i, el) {
    var el = $(el);
    if (el.visible(true)) {
      el.addClass("come-in");
    }
  });
});

var allMods2 = $(".module2");

allMods2.each(function (i, el) {
  var el = $(el);
  if (el.visible(true)) {
    el.addClass("already-visible2");
  }
});

win.scroll(function (event) {

  allMods2.each(function (i, el) {
    var el = $(el);
    if (el.visible(true)) {
      el.addClass("come-in2");
    }
  });
});
"use strict";

// ----------------------------------------------------------------------------------------------------
// ScrollMe
// A jQuery plugin for adding simple scrolling effects to web pages
// http://scrollme.nckprsn.com
// ----------------------------------------------------------------------------------------------------
var scrollme = function (a) {
  var d = {};var c = a(document);var b = a(window);d.body_height = 0;d.viewport_height = 0;d.viewport_top = 0;d.viewport_bottom = 0;d.viewport_top_previous = -1;d.elements = [];d.elements_in_view = [];d.property_defaults = { opacity: 1, translatex: 0, translatey: 0, translatez: 0, rotatex: 0, rotatey: 0, rotatez: 0, scale: 1, scalex: 1, scaley: 1, scalez: 1 };d.scrollme_selector = ".scrollme";d.animateme_selector = ".animateme";d.update_interval = 10;d.easing_functions = { linear: function linear(e) {
      return e;
    }, easeout: function easeout(e) {
      return e * e * e;
    }, easein: function easein(e) {
      e = 1 - e;return 1 - e * e * e;
    }, easeinout: function easeinout(e) {
      if (e < 0.5) {
        return 4 * e * e * e;
      } else {
        e = 1 - e;return 1 - 4 * e * e * e;
      }
    } };d.init_events = ["ready", "page:load", "page:change"];d.init_if = function () {
    return true;
  };d.init = function () {
    if (!d.init_if()) {
      return false;
    }d.init_elements();d.on_resize();b.on("resize orientationchange", function () {
      d.on_resize();
    });b.load(function () {
      setTimeout(function () {
        d.on_resize();
      }, 100);
    });setInterval(d.update, d.update_interval);return true;
  };d.init_elements = function () {
    a(d.scrollme_selector).each(function () {
      var e = {};e.element = a(this);var f = [];a(this).find(d.animateme_selector).addBack(d.animateme_selector).each(function () {
        var h = {};h.element = a(this);h.when = h.element.data("when");h.from = h.element.data("from");h.to = h.element.data("to");if (h.element.is("[data-crop]")) {
          h.crop = h.element.data("crop");
        } else {
          h.crop = true;
        }if (h.element.is("[data-easing]")) {
          h.easing = d.easing_functions[h.element.data("easing")];
        } else {
          h.easing = d.easing_functions.easeout;
        }var g = {};if (h.element.is("[data-opacity]")) {
          g.opacity = h.element.data("opacity");
        }if (h.element.is("[data-translatex]")) {
          g.translatex = h.element.data("translatex");
        }if (h.element.is("[data-translatey]")) {
          g.translatey = h.element.data("translatey");
        }if (h.element.is("[data-translatez]")) {
          g.translatez = h.element.data("translatez");
        }if (h.element.is("[data-rotatex]")) {
          g.rotatex = h.element.data("rotatex");
        }if (h.element.is("[data-rotatey]")) {
          g.rotatey = h.element.data("rotatey");
        }if (h.element.is("[data-rotatez]")) {
          g.rotatez = h.element.data("rotatez");
        }if (h.element.is("[data-scale]")) {
          g.scale = h.element.data("scale");
        }if (h.element.is("[data-scalex]")) {
          g.scalex = h.element.data("scalex");
        }if (h.element.is("[data-scaley]")) {
          g.scaley = h.element.data("scaley");
        }if (h.element.is("[data-scalez]")) {
          g.scalez = h.element.data("scalez");
        }h.properties = g;f.push(h);
      });e.effects = f;d.elements.push(e);
    });
  };d.update = function () {
    window.requestAnimationFrame(function () {
      d.update_viewport_position();if (d.viewport_top_previous != d.viewport_top) {
        d.update_elements_in_view();d.animate();
      }d.viewport_top_previous = d.viewport_top;
    });
  };d.animate = function () {
    var C = d.elements_in_view.length;for (var A = 0; A < C; A++) {
      var h = d.elements_in_view[A];var f = h.effects.length;for (var D = 0; D < f; D++) {
        var w = h.effects[D];switch (w.when) {case "view":case "span":
            var r = h.top - d.viewport_height;var n = h.bottom;break;case "exit":
            var r = h.bottom - d.viewport_height;var n = h.bottom;break;default:
            var r = h.top - d.viewport_height;var n = h.top;break;}if (w.crop) {
          if (r < 0) {
            r = 0;
          }if (n > d.body_height - d.viewport_height) {
            n = d.body_height - d.viewport_height;
          }
        }var g = (d.viewport_top - r) / (n - r);var x = w.from;var j = w.to;var o = j - x;var k = (g - x) / o;var v = w.easing(k);var l = d.animate_value(g, v, x, j, w, "opacity");var t = d.animate_value(g, v, x, j, w, "translatey");var u = d.animate_value(g, v, x, j, w, "translatex");var s = d.animate_value(g, v, x, j, w, "translatez");var B = d.animate_value(g, v, x, j, w, "rotatex");var z = d.animate_value(g, v, x, j, w, "rotatey");var y = d.animate_value(g, v, x, j, w, "rotatez");var E = d.animate_value(g, v, x, j, w, "scale");var q = d.animate_value(g, v, x, j, w, "scalex");var p = d.animate_value(g, v, x, j, w, "scaley");var m = d.animate_value(g, v, x, j, w, "scalez");if ("scale" in w.properties) {
          q = E;p = E;m = E;
        }w.element.css({ opacity: l, transform: "translate3d( " + u + "px , " + t + "px , " + s + "px ) rotateX( " + B + "deg ) rotateY( " + z + "deg ) rotateZ( " + y + "deg ) scale3d( " + q + " , " + p + " , " + m + " )" });
      }
    }
  };d.animate_value = function (i, h, j, k, n, m) {
    var g = d.property_defaults[m];if (!(m in n.properties)) {
      return g;
    }var e = n.properties[m];var f = k > j ? true : false;if (i < j && f) {
      return g;
    }if (i > k && f) {
      return e;
    }if (i > j && !f) {
      return g;
    }if (i < k && !f) {
      return e;
    }var l = g + h * (e - g);switch (m) {case "opacity":
        l = l.toFixed(2);break;case "translatex":
        l = l.toFixed(0);break;case "translatey":
        l = l.toFixed(0);break;case "translatez":
        l = l.toFixed(0);break;case "rotatex":
        l = l.toFixed(1);break;case "rotatey":
        l = l.toFixed(1);break;case "rotatez":
        l = l.toFixed(1);break;case "scale":
        l = l.toFixed(3);break;default:
        break;}return l;
  };d.update_viewport_position = function () {
    d.viewport_top = b.scrollTop();d.viewport_bottom = d.viewport_top + d.viewport_height;
  };d.update_elements_in_view = function () {
    d.elements_in_view = [];var f = d.elements.length;for (var e = 0; e < f; e++) {
      if (d.elements[e].top < d.viewport_bottom && d.elements[e].bottom > d.viewport_top) {
        d.elements_in_view.push(d.elements[e]);
      }
    }
  };d.on_resize = function () {
    d.update_viewport();d.update_element_heights();d.update_viewport_position();d.update_elements_in_view();d.animate();
  };d.update_viewport = function () {
    d.body_height = c.height();d.viewport_height = b.height();
  };d.update_element_heights = function () {
    var g = d.elements.length;for (var f = 0; f < g; f++) {
      var h = d.elements[f].element.outerHeight();var e = d.elements[f].element.offset();d.elements[f].height = h;d.elements[f].top = e.top;d.elements[f].bottom = e.top + h;
    }
  };c.on(d.init_events.join(" "), function () {
    d.init();
  });return d;
}(jQuery);
"use strict";

$(window).load(function () {
    setTimeout(function () {
        $(".site-loader").fadeOut("slow");
    }, 1000);
    $('.site-overlay').addClass('closed');

    if ($(window).width() > 1170 && (msieversion() >= 10 || msieversion() == 'other')) {
        checkParallax();
    } else {
        $('.full-animated-columns .full-column-text').css("transform", "none");
    }
});

jQuery(document).ready(function ($) {

    $('#searchform').submit(function (e) {
        var s = $(this).find("#s").val($.trim($(this).find("#s").val()));
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
            'orientationchange resize': function orientationchangeResize() {
                $('.site-home-slider').css('minHeight', $(window).height());
            }
        });
    }

    $(window).on("resize orientationchange", function (event) {
        if ($(window).width() > 1170 && (msieversion() >= 10 || msieversion() == 'other')) {
            checkParallax();
        } else {
            $('.full-animated-columns .full-column-text').css("transform", "none");
        }
    });

    $(window).scroll(function () {
        //if ($(window).scrollTop() >= ($('.site-header').outerHeight(true))) {
        if ($(window).scrollTop() >= 50) {
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
        //$('.site-overlay').css('width', '100%');
        $('.site-overlay').removeClass('closed').addClass('opened');
    });

    $('.site-overlay .close').on("click tap", function (e) {
        e.preventDefault();
        //$('.site-overlay').css('width', '0%');
        $('.site-overlay').removeClass('opened').addClass('closed');
    });

    $('.site-header .site-header__menu ul.menu li ul').mouseover(function () {
        $(this).parent('li').addClass('active');
    }).mouseout(function () {
        $(this).parent('li').removeClass('active');
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
                    'transform': 'translate3d(0,' + (eTop - scrolled * valueToScroll) * -percentage + 'px, 0)'
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
                        'transform': 'translate3d(0,' + (eTop - scrolled * valueToScroll) * -percentage + 'px, 0)'
                    });
                }
            });
        });
    }

    return true;
}

function is_touch_device() {
    return 'ontouchstart' in window // works on most browsers
    || navigator.maxTouchPoints; // works on IE10/11 and Surface
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