$.getJSON("https://github.com/morganestes.json?callback=?", showLatestAction);

/**
 * Gets the lastest action on a GitHub account's repositories,
 * and displays it as HTML in a popover window using Twitter Bootstrap.
 * @param  {object} data JSON object using jQuery's getJSON
 * @return {string}      A line of HTML to inject into the DOM.
 */
function showLatestAction(data) {
    var contentString = "",
        action = data[0],
        bitly_login = "morganestes",
        bitly_apikey = "R_bf730b3615bf021fd8c0a38634b151ee";

    get_short_url(action.url, bitly_login, bitly_apikey, function(link) {
        contentString += "Type: " + action.type + '<br>';
        contentString += "Repository: " + action.repository.name + '<br>';
        contentString += 'URL: <a href="' + link + '">' + link + '</a>';
    });

    $("#github a").popover({
        title: 'Latest action on GitHub',
        content: function() {
            return contentString;
        },
        html: true
    });
}

/**
 * Uses Bitly.com to shorten a URL
 * @param  {string} long_url The URL to be shortened.
 * @param  {string} login    The Bitly account name to use.
 * @param  {string} api_key  The public API key from the Bitly account.
 * @param  {callback} func      The callback function.
 * @return {string}          The shortened URL.
 */
function get_short_url(long_url, login, api_key, func) {
    $.getJSON("http://api.bitly.com/v3/shorten?callback=?", {
        "format": "json",
        "apiKey": api_key,
        "login": login,
        "longUrl": long_url
    }, function(response) {
        return func(response.data.url);
    });
}
