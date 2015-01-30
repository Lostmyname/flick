'use strict';

var $ = require('jquery');

/**
 * Mouse input. Output based on how far the mouse is across an element.
 *
 * @returns {*|jQuery|HTMLElement}
 */
module.exports = function flickMouseInput() {
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
