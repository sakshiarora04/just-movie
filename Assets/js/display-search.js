var searchFormEl = document.querySelector('#search-form');
var resultTextEl = document.querySelector('#result-content')
var resultContentEl = document.querySelector('#result-content')

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

    fetch(tmbdQueryUrl)
        .then(function (response) {
            if (!response.ok) {
                throw response.json();
            }

            return response.json();
        })

        .then(function (tmbdRes) {
            resultTextEl.textContent = tmbdRes.query;

            console.log(tmbdRes);


            if (!tmbdRes.results.length) {
                console.log('No results found')
                resultContentEl.innerHTML = '<h3>no results found, search again!</h3>';
            } else {
                resultContentEl.textContent = '';
                }

            })
        .catch(function (error) {
            console.error(error)
        })

        
}

function handleSearchFormSubmit(event) {
    event.preventDefault();

    var searchInputVal = document.querySelector('#search-input').value;

    if (!searchInputVal) {
        console.error('You need a search input value!');
        return;
    }

    var query = searchInputVal.replace(/\s/g, '+')
    // console.log(query)

    searchApi(query)
}

searchFormEl.addEventListener('submit', handleSearchFormSubmit)

getParams()
