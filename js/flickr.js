// http://api.flickr.com/services/feeds/photos_public.gne?id=40222090@N00&lang=en-us&format=json
$(document).ready(function() {
    var url = "http://api.flickr.com/services/feeds/photos_public.gne?id=40222090@N00&lang=en-us&format=json&jsoncallback=?";
    $.getJSON(url, popPic);
});

function popPic(data) {

    // Count the number of images returned in the JSON reponse
    // select one at random and start working on it.
    var numRand = Math.floor(Math.random() * data.items.length),
        pic = data.items[numRand];

    // Get the data from the JSON info
    // Create an image element and put it in a hidden div
    $("#flickr-random img").attr({
        src: pic.media.m,
        title: pic.title,
        alt: pic.title
    });

    // Get the generated image and display in a popover
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
