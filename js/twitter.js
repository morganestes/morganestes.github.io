$.getJSON("http://twitter.com/statuses/user_timeline/morganestes.json?callback=?", showLatestTweet);

function showLatestTweet(data) {
    $("#twitter a").popover({
        title: function() {
            return '<a href="http://twitter.com/morganestes">@morganestes</a>';
        },
        content: function() {
            return data[0].text;
        },
        html: true
    });
}
