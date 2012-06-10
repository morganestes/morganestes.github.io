// http://api.flickr.com/services/feeds/photos_public.gne?id=40222090@N00&lang=en-us&format=json
$(document).ready(function() {
    var url = "http://api.flickr.com/services/feeds/photos_public.gne?id=40222090@N00&lang=en-us&format=json&jsoncallback=?";
    $.getJSON(url, popPic);
});

function popPic(data) {

    // Start putting together the HTML string
    var htmlString = "",
        numRand = Math.floor(Math.random() * data.items.length),
        pic = data.items[numRand];

    $("<img/>").attr({
        src: pic.media.m,
        title: pic.title,
        alt: pic.title
    }).appendTo("#flickr-random");

    // display in a popover
    $('#flickr a').popover({
        html: true,
        placement: 'right',
        title: function() {
            return $('#flickr-random img').attr('title');
        },
        content: function() {
            return $('#flickr-random').html();
        }
    });
}
