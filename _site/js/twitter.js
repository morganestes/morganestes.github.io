/**
 * Retrieves the latest tweet from a user and displays it using the
 * Twitter Bootstrap popover script
 * @type {object}
 */
$.getJSON("http://twitter.com/statuses/user_timeline/morganestes.json?callback=?", showLatestTweet);

function showLatestTweet(data) {
    // Don't popover on small screens
    if ($('html').hasClass('screen-small')) {
        return;
    } else {
        $("#twitter a").popover({
            html: true,
            placement: 'right',
            title: function() {
                return '<a href="http://twitter.com/morganestes">@morganestes</a>';
            },
            content: function() {
                return data[0].text;
            }
        });
    }
}
