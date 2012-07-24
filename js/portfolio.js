/**
 * Custom JavaScript functions for my portfolio.
 * 1. WidthClass
 * 2. Github
 * 3. Twitter
 * 4. Flickr
 *
 * @module portfolio
 * @namespace Portfolio
 * @author Morgan W. Estes
 */
var portfolio = portfolio || {};

/**
 * Adds a class name to the `html` element based on window width.
 * Originally built on [Drupal’s class-width.js](http://drupal.org/files/issues/class-width.js_.txt).
 * Modified to fit with Twitter Bootstrap `@media` query widths.
 *
 * @class WidthClass
 * @return {String} Class name for `html` element
 */
var WidthClass = function ($) {
    // Setup classes and maximum widths
    var classes = [
        ['screen-small', 320],
        ['screen-phone', 480],
        ['screen-tablet', 767],
        ['screen-desktop', 9999]
    ];

    /**
     * Determines which class name to add based on screen width
     *
     * @method setScreenClass
     * @return {String} myClass Class name for the `html` element.
     */
    function setScreenClass() {
        // Get current width
        var width = $(document).width(),
            myClass = '',
            i, j;

        // Determine which class should be set for current width
        for (i in classes) {
            if (width <= classes[i][1]) {
                myClass = classes[i][0];
                break;
            }
        }

        // Remove existing classes
        for (j in classes) {
            $('html').removeClass(classes[j][0]);
        }

        // Add new class
        return $('html').addClass(myClass);
    }

    // Run code on page load and when resized
    $(document).ready(setScreenClass);
    $(window).resize(setScreenClass);

    return {
        WidthClass:WidthClass
    };
}(jQuery);

/**
 * Retrieves latest public change to repositories
 *
 * @class Github
 */
var Github = function () {
    var bitly_login = "morganestes",
        bitly_apikey = "R_bf730b3615bf021fd8c0a38634b151ee",
        github_username = "morganestes",
        github_url = "https://github.com/" + github_username + ".json?callback=?";

    /**
     * Gets the latest action on a GitHub account's repositories,
     * and displays it as HTML in a popover window using Twitter Bootstrap.
     *
     * @method showLatestAction
     * @param  {Object} data JSON object using jQuery's getJSON
     * @return {String}      A line of HTML to inject into the DOM.
     */
    function showLatestAction(data) {
        var contentString = "",
            action = data[0];

        getShortUrl(action.url, bitly_login, bitly_apikey, function (link) {
            contentString += "Type: " + action.type + '<br>';
            contentString += "Repository: " + action.repository.name + '<br>';
            contentString += 'URL: <a href="' + link + '">' + link + '</a>';
        });

        $("#github a").popover({
            title:'Latest action on GitHub',
            content:function () {
                return contentString;
            },
            html:true
        });
        return true;
    }

    /**
     * Uses Bit.ly to shorten a URL
     *
     * @method getShortUrl
     * @param   {String}     long_url    The URL to be shortened.
     * @param   {String}     login       The Bit.ly account name to use.
     * @param   {String}     api_key     The public API key from the Bitly account.
     * @param   {Function}   cb_func      The callback function.
     * @return {String}    url         The shortened URL.
     */
    function getShortUrl(long_url, login, api_key, cb_func) {
        $.getJSON("http://api.bitly.com/v3/shorten?callback=?", {
            "format":"json",
            "apiKey":api_key,
            "login":login,
            "longUrl":long_url
        }, function (response) {
            return cb_func(response.data.url);
        });
        return true;
    }

    /**
     * Use jQuery to get the JSON and run the callback function
     *
     * @method getLatest
     * @return {Object} JSON object
     */
    function getLatest() {
        /**
         * @method getJSON
         * @param {String}  github_url  The URL of the user's recent updates
         * @param {Object}  showLatestAction Callback function
         */
        return $.getJSON(github_url, showLatestAction);
    }

    return {
        latest:getLatest
    };
}();

/**
 * Retrieves the latest tweet from a user and displays it using the
 * Twitter Bootstrap popover script
 *
 * @class Twitter
 **/
var Twitter = function () {
    var username = 'morganestes',
        twitter_url = "http://twitter.com/statuses/user_timeline/" + username + ".json?callback=?";

    function getTweets() {
        return $.getJSON(twitter_url, showLatestTweet);
    }

    /**
     * Fired as getJSON callback
     *
     * @method showLatestTweet
     */
    function showLatestTweet(data) {

        if (!$('html').hasClass('screen-small')) {
            /**
             * Fired when screen is large enough and link is hovered.
             *
             * @event popover
             * @uses Bootstrap
             * @uses Popover
             * @requires WidthClass
             */
            $("#twitter a").popover({
                html:true,
                placement:'right',
                title:function () {
                    /**
                     * Template for view
                     *
                     * @property title
                     * @type String
                     * @default '<a href="http://twitter.com/' + username + '">@' + username + '</a>'
                     */
                    return '<a href="http://twitter.com/' + username + '">@' + username + '</a>';
                },
                content:function () {
                    /**
                     * The content to be displayed in the popover
                     *
                     * @attribute content
                     * @readOnly
                     * @type String
                     */
                    return data[0].text;
                }
            });
        }
    }

    return {
        getTweets:getTweets
    };
}();

/**
 * Gets an image from Flickr and displays in a popover
 *
 * @class Flickr
 */
// http://api.flickr.com/services/feeds/photos_public.gne?id=40222090@N00&lang=en-us&format=json
var Flickr = function () {
    var flickr_id = "40222090@N00",
        flickr_url = "http://api.flickr.com/services/feeds/photos_public.gne?id=" + flickr_id + "&lang=en-us&format=json&jsoncallback=?";

    /**
     * Gets the most recent pics from Flickr as a JSON object
     *
     * @method getPics
     * @return {Object} showPics    The callback function.
     */
    function getPics() {
        return $.getJSON(flickr_url, showPics);
    }

    /**
     * Pulls one image at random from the JSON and displays it in a popover window.
     *
     * @method showPics
     * @param data {Object} The returned JSON element.
     */
    function showPics(data) {

        // Count the number of images returned in the JSON response
        // select one at random and start working on it.
        var numRand = Math.floor(Math.random() * data.items.length),
            pic = data.items[numRand];

        // Get the data from the JSON info
        // Create an image element and put it in a hidden div
        $('#flickr-random img').attr({
            src:pic.media.m,
            title:pic.title,
            alt:pic.title
        });


        if (!$('html').hasClass('screen-small')) {
            /**
             * Fired when screen is large enough and link is hovered.
             *
             * @event popover
             * @uses Bootstrap
             * @uses Popover
             * @requires WidthClass
             */
            $('#flickr a').popover({
                html:true,
                placement:function () {
                    var _where = 'left';
                    if ($('html').hasClass('screen-phone')) {
                        _where = 'top';
                    } else if ($('html').hasClass('screen-tablet')) {
                        _where = 'left';
                    } else {
                        _where = 'right';
                    }
                    return _where;
                },
                title:function () {
                    /**
                     * Template for view
                     *
                     * @property title
                     * @type String
                     * @default '$('#flickr-random img').attr('title')'
                     */
                    return $('#flickr-random img').attr('title');
                },
                content:function () {
                    /**
                     * The content to be displayed in the popover
                     *
                     * @attribute content
                     * @readOnly
                     * @type HTMLElement|Node|String
                     */
                    return $('#flickr-random').html();
                }
            });
        }
    }

    return {
        get:getPics,
        show:showPics
    };
}();