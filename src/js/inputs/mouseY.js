'use strict';

var $ = require('jquery');

/**
 * Mouse input. Output based on how far the mouse is across the y-axis.
 *
 * @returns {jQuery} Input handler: fires "change" events between 0 and 1.
 */
module.exports = function flickMouseInputY() {
  var $this = $(this);
  var $inputHandler = $({});

  var offset = $this.offset().top;
  var height = $this.find('img').eq(0).height();

  $this.on('mousemove', function (e) {
    var top = e.pageY - offset;
    $inputHandler.triggerHandler('change', top / height);
  });

  return $inputHandler;
};
