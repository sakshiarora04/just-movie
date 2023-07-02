var searchFormEl = $('#search-form')
var calloutEl = $('#errorMessage')

function handleSearchFormSubmit(event) {
    event.preventDefault();

    var searchInputVal = $('#search-input').val();

    if (!searchInputVal) {
        console.error('You need a search input value!');
        var callout = $('<div class="callout alert" data-closable></div>');
        var message = $('<p>You need a search input value!</p>');
        var button = $('<button>', {
            class: 'close-button',
            'aria-label': 'Dismiss alert',
            type: 'button',
            'data-close': ''
        });
        var span = $('<span>', {
            'aria-hidden': 'true',
            html: '&times;'
        });
        button.append(span);
        callout.append(message, button);

        calloutEl.append(callout);
        return;
    }

    var query = searchInputVal.replace(/\s/g, '+');
    // console.log(query)
    var queryString = './display-search.html?q=' + query


    location.assign(queryString)
}

searchFormEl.on('submit', handleSearchFormSubmit)


// SEARCH BY MOVIE NAME
// https://api.themoviedb.org/3/search/movie?query=Jack&page=1&api_key=533313cc880a2148c77843e769ec1a97
