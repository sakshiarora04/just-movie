// global variables
var searchFormEl = $("#search-form");
var resultTextEl = $("#result-content");
var resultContentEl = $("#result-content");
var logoEl = $("#logo");
var projectTitleEl = $("#project-title1");

var apiKey = "533313cc880a2148c77843e769ec1a97";

// Hover class to Header
logoEl.addClass("card-title");
projectTitleEl.addClass("card-title");

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
    var cardEl = $('<div class="card card-size"></div>');
    var cardSectionEl = $('<div class="card-section section-text"></div>');
    var titleEl = $(
      '<h6 class="card-title">' +
        '<span class="title-text">' +
        movie.title +
        "</span>" +
        " (" +
        releaseDate +
        ")" +
        "</h6>"
    );

    cardEl.on("click", function () {
      var movieId = movie.id;
      var movieIdQueryString = "./moviedetails.html?q=" + movieId;
      location.assign(movieIdQueryString);
    });

    cellEl.append(cardEl);
    if (movie.poster_path) {
      var posterImg = $(
        '<img id="poster-size" class="card-title" src="https://image.tmdb.org/t/p/w500' +
          movie.poster_path +
          '">'
      );
      cardEl.append(posterImg);
    } else {
      var posterImg = $(
        '<img id="poster-size" src="./assets/images/no-poster.png">'
      );
      cardEl.append(posterImg);
    }
    if (movie.vote_average > 0) {
      var rating = parseFloat(movie.vote_average);
      var ratingEl = $(
        '<p class="card-rating">' +
          "Rating: " +
          rating.toFixed(2) +
          "⭐" +
          "</p>"
      );
      cardSectionEl.append(titleEl, ratingEl);
    } else {
      var ratingEl = $('<p class="card-rating">No rating available</p>');
      cardSectionEl.append(titleEl, ratingEl);
    }
    cardEl.append(cardSectionEl);

    // Append the card to the container
    $("#result-content").append(cellEl);
  });
}

// API Query search
function searchApi(query, page) {
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
        $("#no-input").foundation("open");
      } else {
        printResults(tmbdRes);
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

// On click event listeners
logoEl.on("click", function () {
  var locUrl = "./index.html";
  location.assign(locUrl);
});
projectTitleEl.on("click", function () {
  var locUrl = "./index.html";
  location.assign(locUrl);
});
$("#rated-link").on("click", function (event) {
  event.preventDefault();
  var query = "top_rated";
  var linkToMoreMovies = "./movies.html?q=" + query;
  location.assign(linkToMoreMovies);
});
$("#search-link").on("click", function (event) {
  event.preventDefault();
  var query = "most_searched";
  var linkToMoreMovies = "./movies.html" + query;
  location.assign(linkToMoreMovies);
});
$("#recent-link").on("click", function (event) {
  event.preventDefault();
  var query = "recent_releases";
  var linkToMoreMovies = "./movies.html" + query;
  location.assign(linkToMoreMovies);
});
// Event listener for search bar
searchFormEl.on("submit", handleSearchFormSubmit);
getParams();
