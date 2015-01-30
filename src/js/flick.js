'use strict';

var $ = require('jquery');

$.flick = {};

$.flick.inputs = {
  mouse: require('./inputs/mouse')
};

$.flick.defaults = {
  input: 'mouse' // String or function
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

  $inputHandler.on('change', function (e, percent) {
    var pageNumber = Math.floor(($pages.length + 1) * percent);

    $pages.css('z-index', 1)
      .eq(pageNumber).css('z-index', 2);
  });
};

// Automatically flick from data-key
$('.js-flick').flick();
