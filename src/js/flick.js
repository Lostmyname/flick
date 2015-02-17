'use strict';

var $ = require('jquery');

$.flick = {};

$.flick.inputs = {
  mouseX: require('./inputs/mouseX'),
  mouseY: require('./inputs/mouseY')
};

$.flick.defaults = {
  input: 'mouseX' // String or function
};

/**
 * Make a flicky thing!
 *
 * @param {object} options Object containing some options.
 */
$.fn.flick = function flick(options) {
  options = $.extend({}, $.flick.defaults, options);

  if (typeof options.input === 'string') {
    options.input = $.flick.inputs[options.input];
  }

  var $inputHandler = options.input.call(this, options);
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
  });

  $inputHandler.triggerHandler('change', [0]);
};

// Automatically flick from data-key
$('.js-flick').flick();
