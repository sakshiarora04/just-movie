// global variables
var searchFormEl = $("#search-form");
var resultTextEl = $("#result-content");
var resultContentEl = $("#result-content");

var apiKey = "533313cc880a2148c77843e769ec1a97";

// getting paramaters for api fetch
function getParams() {
  var searchParamsArr = window.location.search.split("=");

  var query = searchParamsArr.pop();

  searchApi(query);
}

// Printing Results
function printResults(resultObj) {
  resultObj.results.forEach(function (movie) {
    // if a movie has no overview
    if (!movie.overview) {
      return;
    }

    // Dynamically creating cards
    var releaseDate = dayjs(movie.release_date).format("YYYY");
    var cellEl = $('<div class="cell"></div>');
    var cardEl = $('<div class="card"></div>');
    var cardSectionEl = $('<div class="card-section"></div>');
    var titleEl = $(
      '<h4 class="card-title">' +
        movie.title +
        " (" +
        releaseDate +
        ")" +
        "</h4>"
    );

    cardEl.on("click", function () {
      var movieId = movie.id;
      var movieIdQueryString = "./moviedetails.html?q=" + movieId;
      location.assign(movieIdQueryString);
    });

    cellEl.append(cardEl);
    if (movie.poster_path) {
      var posterImg = $(
        '<img class="card-title "src="https://image.tmdb.org/t/p/w500' +
          movie.poster_path +
          '">'
      );
      cardEl.append(posterImg);
    } else {
      var posterImg = $('<img src="./assets/images/no-poster.png">');
      cardEl.append(posterImg);
    }
    cardSectionEl.append(titleEl);
    if (movie.vote_average > 0) {
      var rating = parseFloat(movie.vote_average);
      var ratingEl = $(
        "<h6>" + "Rating: " + rating.toFixed(2) + "⭐" + "</h6>"
      );
      cardSectionEl.append(ratingEl);
    } else {
      var ratingEl = $("<p>No rating available</p>");
      cardSectionEl.append(ratingEl);
    }
    cardEl.append(cardSectionEl);

    // Append the card to the container
    $("#result-content").append(cellEl);
  });
}

function saveResultsToLocalStorage(resultObj) {
  // Convert the result object to JSON string
  var resultJson = JSON.stringify(resultObj);
  // Save the JSON string to local storage
  localStorage.setItem("searchResults", resultJson);
}

function loadResultsFromLocalStorage() {
  // Check if the page is refreshed
  if (performance.navigation.type >= 1) {
    // Retrieve the JSON string from local storage
    var resultJson = localStorage.getItem("searchResults");

    // Parse the JSON string to get the result object
    var resultObj = JSON.parse(resultJson);

    if (resultObj) {
      // If results exist, print them on the page
      printResults(resultObj);
    }
  }
}
// API Query search
function searchApi(query) {
  var tmbdQueryUrl = "https://api.themoviedb.org/3/search/";

  tmbdQueryUrl =
    tmbdQueryUrl + "movie?query=" + query + "&page=1" + "&api_key=" + apiKey;

  fetch(tmbdQueryUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((tmbdRes) => {
      console.log(tmbdRes.results);

      if (!tmbdRes.results.length) {
        resultContentEl.html("<h3>no results found, search again!</h3>");
      } else {
        printResults(tmbdRes);
        saveResultsToLocalStorage(tmbdRes);
      }
    })
    .catch((error) => {
      console.error("Fetch error:", error);
      resultContentEl.html(
        "<h3>Error occurred while fetching search results</h3>"
      );
    });
}

// Search bar from display page
function handleSearchFormSubmit(event) {
  event.preventDefault();

  var searchInputVal = $("#search-input").val();

  if (!searchInputVal) {
    console.error("You need a search input value!");
    $("#no-input").foundation("open"); // Show the popup

    return;
  }

  var query = searchInputVal.replace(/\s/g, "+");

  resultContentEl.empty();
  var locUrl = window.location.href.split("?");
  var queryUrl = locUrl[0];
  var queryString = queryUrl + "?q=" + query;
  window.location.replace(queryString);
  searchApi(query);
}

// Loading previous saved results if page is refreshed
$(document).ready(function () {
  loadResultsFromLocalStorage();
});

// Event listener for search bar
searchFormEl.on("submit", handleSearchFormSubmit);
getParams();
