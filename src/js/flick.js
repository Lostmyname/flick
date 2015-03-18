'use strict';

var $ = require('jquery');
var afterDelay = require('after-delay');
var isMobile = require('./helpers/isMobile');

$.flick = {};

$.flick.inputs = {
  mouseX: require('./inputs/mouseX'),
  mouseY: require('./inputs/mouseY'),
  tilt: require('./inputs/tilt')
};

/**
 * Make a flicky thing!
 *
 * @param {object} options Object containing some options.
 */
$.fn.flick = function flick(options) {
  if (isMobile()) {
    var $inputHandler = $.flick.inputs.tilt.call(this, options);
  } else {
    var $inputHandler = $.flick.inputs.mouseX.call(this, options);
  }

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
