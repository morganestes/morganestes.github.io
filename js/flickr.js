// http://api.flickr.com/services/feeds/photos_public.gne?id=40222090@N00&lang=en-us&format=json
$(document).ready(function() {
    var url = "http://api.flickr.com/services/feeds/photos_public.gne?id=40222090@N00&lang=en-us&format=json&jsoncallback=?";
    $.getJSON(url, displayImages);


    function displayImages(data) {

        // Start putting together the HTML string
        var htmlString = "";

        // Now start cycling through our array of Flickr photo details
        $.each(data.items, function(i, item) {

            // I only want the ickle square thumbnails
            var sourceSquare = (item.media.m).replace("_m.jpg", "_m.jpg");

            // Here's where we piece together the HTML
            htmlString += '<a href="' + item.link + '" target="_blank">';
            htmlString += '<img title="' + item.title + '" src="' + sourceSquare;
            htmlString += '" alt="';
            htmlString += item.title + '" />';
            htmlString += '</a>';

        });

        // Pop our HTML in the #images DIV
        $('#flickr-holder').html(htmlString);

        // Close down the JSON function call
           randomPic();
           showRandomPic();

    }
});

function randomPic() {

    // select one of the thumbnails at random
    var $list = $('#flickr-holder a'),
        start = Math.floor(Math.random() * $list.length),
        end = start + 1;

    if (start == $list.length) {
        end = start;
    }
    console.log('start: ' + start);
    console.log('end:' + end);
    console.log('length: ' + $list.length);


    $('#flickr-random').html($list.slice(start, end).html());

}

function showRandomPic() {
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
