/**
 * The following code automatically adds a specified class to the body element based on the current width of the browser window.
 * This is useful for specifying different styles for different screen resolutions
 *
 * Originally built on http://drupal.org/files/issues/class-width.js_.txt
 * Modified to fit with Twitter Bootstrap @media query widths
 */

// Setup classes and maximum widths
var classes = [
  ['screen-small', 320],
  ['screen-phone', 480],
  ['screen-tablet', 767],
  ['screen-desktop', 9999]
];

// Run code on page load and when resized
$(document).ready(setScreenClass);
$(window).resize(setScreenClass);

function setScreenClass() {
  // Get current width
  var width = $(document).width(),
    myClass = '';

  // Determine which class should be set for current width
  for (var i in classes) {
    if (width <= classes[i][1]) {
      myClass = classes[i][0];
      break;
    }
  }

  // Remove existing classes
  for (var j in classes) {
    $('html').removeClass(classes[j][0]);
  }

  // Add new class
  $('html').addClass(myClass);
}
