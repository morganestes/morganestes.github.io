/**
 * Gets just the hostname from a URL,
 * stripping away the protocol and subdirectories
 * @param  {string} url The full URL.
 * @return {string || object}     Returns the hostname as a string, or NULL.
 */

function get_hostname(url) {
  var m = ((url || '') + '').match(/^https?:\/\/[^/]+/);

  if (m === null) {
    if (((url || '') + '').match(/^(mailto|tel):/)) {
      m = '';
    }
    return m;
  }
  return m ? m[0] : null;
}

/**
 * Replaces CSS icons with favicons in each of the contact list items.
 * @return {object} Favicon image using Google.
 */
$('#contact li a').each(function() {
  var href = $(this).attr('href'),
    host = get_hostname(href).replace('http://', '').replace('https://', '').replace('www.', '').replace('morganestes.', '');

  if (host !== '' || host !== null) {
    var icon = $('<img/>').attr('src', 'http://www.google.com/s2/favicons?domain=' + host);
    console.log(host);
    $(this).children('i[class^="icon-"]').html(icon).attr("class", "icon-");
  }
});
