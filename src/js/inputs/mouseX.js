'use strict';

var $ = require('jquery');

/**
 * Mouse input. Output based on how far the mouse is across the x-axis.
 *
 * @returns {jQuery} Input handler: fires "change" events between 0 and 1.
 */
module.exports = function flickMouseInputX() {
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
