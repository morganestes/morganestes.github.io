###
The following code automatically adds a specified class to the body element based on the current width of the browser window.
This is useful for specifying different styles for different screen resolutions

Originally built on http://drupal.org/files/issues/class-width.js_.txt
Modified to fit with Twitter Bootstrap @media query widths
###

setScreenClass = ->
  classes = [
    [ "screen-small", 320 ]
    [ "screen-phone", 480 ]
    [ "screen-tablet", 767 ]
    [ "screen-desktop", 9999 ]]
  width = $(document).width()
  screenClass = ""
  $el = $('html')

  for i of classes
    if width <= classes[i][1]
      screenClass = classes[i][0]
      break

  for j of classes
      $el.removeClass classes[j][0]

  $el.addClass screenClass

$ ->
  setScreenClass()

$(window).resize ->
  setScreenClass()
