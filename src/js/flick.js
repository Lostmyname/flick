'use strict';

var $ = require('jquery');

$.flick = {};

$.flick.mouseInput = function flickMouseInput() {
  var $this = $(this);
  var $inputHandler = $({});

  var offset = $this.offset().left;
  var width = $this.find('img').eq(0).width();

  $this.on('mousemove', function (e) {
    var left = e.pageX - offset;
    $inputHandler.triggerHandler('change', left / width);
  });

  return $inputHandler;
};

$.flick.defaults = {
  input: $.flick.mouseInput
};

$.fn.flick = function flick(options) {
  options = $.extend({}, $.flick.defaults, options);

  var $inputHandler = options.input.call(this, options);
  var $pages = $(this).find('img');

  $inputHandler.on('change', function (e, percent) {
    var pageNumber = Math.floor(($pages.length + 1) * percent);

    $pages.css('z-index', 1)
      .eq(pageNumber).css('z-index', 2);
  });
};

// Automatically flick from data-key
$('.js-flick').flick();
