'use strict';

var isTouch = require('touch-screen');

/**
 * Returns whether browser is a mobile or not. Tests for touch support and
 * screen width.
 *
 * @returns {boolean} True if mobile.
 */
module.exports = function () {
  // If doesn't support touch
  if (!isTouch) {
    return false;
  }

  if (!window.matchMedia) {
    return false;
  }

  return window.matchMedia('(max-width: 770px)').matches;
};
