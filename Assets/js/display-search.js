var searchFormEl = $('#search-form');
var resultTextEl = $('#result-content')
var resultContentEl = $('#result-content')

var apiKey = '&api_key=533313cc880a2148c77843e769ec1a97';

function getParams() {
    var searchParamsArr = document.location.search.split('=');

    var query = searchParamsArr.pop();
    console.log(query);

    searchApi(query);
}

function searchApi(query) {
    var tmbdQueryUrl = 'https://api.themoviedb.org/3/search/';

    tmbdQueryUrl = tmbdQueryUrl + 'movie?query=' + query + "&page=1" + apiKey;
    console.log(tmbdQueryUrl)

    $.ajax({
        url: tmbdQueryUrl,
        method: 'GET',
        datatype: 'json'})
        .done(function (tmbdRes) {
            resultTextEl.textContent = tmbdRes.query;
            console.log(tmbdRes);

            if (!tmbdRes.results.length) {
                console.log('No results found');
                resultContentEl.html('<h3>no results found, search again!</h3>');
            } else {
                resultContentEl.text('');
                }

            })
        .fail(function (error) {
            console.error(error)
        })

        
}

function handleSearchFormSubmit(event) {
    event.preventDefault();

    var searchInputVal = $('#search-input').value;

    if (!searchInputVal) {
        console.error('You need a search input value!');
        return;
    }

    var query = searchInputVal.replace(/\s/g, '+')
    // console.log(query)

    searchApi(query)
}

searchFormEl.on('submit', handleSearchFormSubmit)

getParams()
