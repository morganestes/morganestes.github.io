$.getJSON("https://github.com/morganestes.json?callback=?", showLatestAction);

function showLatestAction(data) {
    var contentString = "",
        login = "morganestes",
        api_key = "R_bf730b3615bf021fd8c0a38634b151ee",
        long_url = data[0].url;

        get_short_url(long_url, login, api_key, function(short_link){
            console.log(short_link);
            return short_link;
        });
        console.log('short link: ' + link);
    contentString += "Type: " + data[0].type + '<br>';
    contentString += "Repository: " + data[0].repository.name + '<br>';
    contentString += 'URL: <a href="' + long_url + '">' + get_short_url(long_url, login, api_key, function(short_link){
            console.log(short_link);
            return short_link;
        }); + '</a>';
    $("#github a").popover({
        title: 'Latest action on GitHub',
        content: function() {
            return contentString;
        },
        html: true
    });
}

function get_short_url(long_url, login, api_key, func) {
    $.getJSON(
        "http://api.bitly.com/v3/shorten?callback=?",
        {
            "format": "json",
            "apiKey": api_key,
            "login": login,
            "longUrl": long_url
        },
        function(response) {
            func(response.data.url);

        }
    );
}
