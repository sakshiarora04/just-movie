var searchFormEl = $('#search-form')
var calloutEl = $('#errorMessage')

function handleSearchFormSubmit(event) {
    event.preventDefault();

    var searchInputVal = $('#search-input').val();

    if (!searchInputVal) {
        console.error('You need a search input value!');
        $('#no-input').foundation('open'); // Show the popup

        return;
    }

    var query = searchInputVal.replace(/\s/g, '+');
    // console.log(query)
    var queryString = './display-search.html?q=' + query


    location.assign(queryString)
}

searchFormEl.on('submit', handleSearchFormSubmit)