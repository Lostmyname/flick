'use strict';

var $ = require('jquery');
var afterDelay = require('after-delay');
var isTouch = require('touch-screen');

$.flick = {};

$.flick.inputs = {
  mouseX: require('./inputs/mouseX'),
  tilt: require('./inputs/tilt')
};

$.flick.defaults = {
  input: 'auto'
}

/**
 * Make a flicky thing!
 *
 * @param {object} options Object containing some options.
 */
$.fn.flick = function flick(options) {
  options = $.extend({}, $.flick.defaults, options);

  if (options.input === 'auto') {
    options.input = isTouch() ? 'tilt' : 'mouseX';
  }

  var $inputHandler = $.flick.inputs[options.input].call(this, options);

  var $pages = $(this).find('img');
  var lastPageNumber = 0;

  $inputHandler.on('change', function (e, percent) {
    var pageNumber = Math.floor(($pages.length + 1) * percent);

    if (pageNumber === lastPageNumber) {
      return;
    }
    lastPageNumber = pageNumber;

    $pages.filter('.active').removeClass('active').end()
      .eq(pageNumber).addClass('active');

    afterDelay('flick', function () {
      goHighRes($pages.eq(pageNumber));
    }, 100);
  });

  $inputHandler.triggerHandler('change', [0]);
};

function goHighRes($page) {
  if (!$page.data('high')) {
    return;
  }

  $page.attr('src', $page.data('high'));
  $page.data('high', null);
}

// Automatically flick from classname
$('.js-flick').flick();
