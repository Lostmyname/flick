'use strict';

var $ = require('jquery');

/**
 * Phone input. Tilt the phone to go through a book.
 *
 * WOAH WHAT THE FUCK.
 *
 * @returns {jQuery} Input handler: fires "change" events between 0 and 1.
 */
module.exports = function flickMouseInputX() {
  var $inputHandler = $({});
  var lastInput = -1;

  window.addEventListener('deviceorientation', function orientationChange(e) {
    var vertical = (window.innerHeight > window.innerWidth);
    var input = calculateInput(vertical ? e.gamma : e.beta);

    if (input !== lastInput) {
      lastInput = input;

      $inputHandler.triggerHandler('change', input);
    }
  });

  return $inputHandler;
};

/**
 * Takes a y value, and returns a number between 0 and 100.
 *
 * 30 turns into 0, -30 turns into 100, everything in between is on the scale,
 * and everything above or below is 0 or 100.
 *
 * @param {number} y The y value. Between -90 and 90.
 * @returns {number} The final value. Between 0 and 100.
 */
function calculateInput(y) {
  var maxVal = 25;
  return Math.round(Math.min(Math.max(0, -y + maxVal), maxVal * 2) / maxVal * 50) / 100;
}
