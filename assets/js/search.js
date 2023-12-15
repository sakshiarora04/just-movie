// global variables
var searchFormEl = $("#search-form");
var calloutEl = $("#errorMessage");
var recentSearches = [];
var apiKey = "533313cc880a2148c77843e769ec1a97";
// handle submit on search bar
function handleSearchFormSubmit(event) {
  event.preventDefault();

  var searchInputVal = $("#search-input").val();
  //modal appears on invalid input
  if (!searchInputVal) {
    console.error("You need a search input value!");
    $("#no-input").foundation("open"); // Show the popup

    return;
  }
  //change the location of page to show all movies related to entered value
  var query = searchInputVal.replace(/\s/g, "+");
  var queryString = "./display-search.html?q=" + query;
  location.assign(queryString);
}
// store searched data into local storage
function getRecentSearchesFromStorage() {
  var recentSearchesString = localStorage.getItem("recentSearches");
  if (recentSearchesString) {
    recentSearches = JSON.parse(recentSearchesString);
  }
}
// function filters the valid recent search and returns it
function filterRecentSearches() {
  var currentDomain = window.location.hostname;
  recentSearches = recentSearches.filter(function (search) {
    var searchUrl = "./movies.html?q=" + search;
    return searchUrl.includes(currentDomain);
  });
}

searchFormEl.on("submit", handleSearchFormSubmit);

$(document).ready(function () {
  getRecentSearchesFromStorage();
  filterRecentSearches();

  $("#search-input")
    .autocomplete({
      minLength: 0,
      delay: 0,
      autoFocus: true,
      position: {
        my: "left top+4",
        at: "left bottom",
        collision: "flip",
      },
    })
    .on("focus", function () {
      $(this).autocomplete("search");
    });

  // Update Autocomplete source with recent searches
  $("#search-input").autocomplete("option", "source", recentSearches);
});
// get genre list from api
function getGenreList() {
  var apiUrl =
    "https://api.themoviedb.org/3/genre/movie/list?language=en&api_key=" +
    apiKey;
  fetch(apiUrl, { cache: "reload" })
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          displayGenreLists(data.genres);
        });
      } else {
        $(".lead").text("Error " + response.status + response.statusText);
        $("#movie-validation-modal").foundation("open");
      }
    })
    .catch(function (error) {
      $(".lead").text("Unable to connect ");
      $("#movie-validation-modal").foundation("open");
    });
}
getGenreList();
// display genre list in header
function displayGenreLists(genres) {
  var genreListEl = $("#genre-list");
  var ulEl = $("<ul>");
  for (var i = 0; i < genres.length; i++) {
    var liEl = $("<li>");
    var aEl = $("<a>");
    aEl.text(genres[i].name);
    liEl.attr("data-index", genres[i].id);
    liEl.append(aEl);
    ulEl.append(liEl);
    genreListEl.append(liEl);
  }
  genreListEl.on("click", function (event) {
    var liClicked = $(event.target);
    var aText = liClicked.text();
    var genreId = liClicked.parent("li").attr("data-index");
    var genreIdQueryString = "./genre.html?q=" + genreId + "&" + aText;
    location.assign(genreIdQueryString);
  });
}
// ---------------------------
var logoEl = $("#logo");
var projectTitleEl = $("#project-title1");

// Hover class to Header
logoEl.addClass("card-title");
projectTitleEl.addClass("card-title");

logoEl.on("click", function () {
  var locUrl = "./index.html";
  location.assign(locUrl);
});
projectTitleEl.on("click", function () {
  var locUrl = "./index.html";
  location.assign(locUrl);
});
//on click functions to go to display all movies related to selected option
$("#top-rated").on("click", function (event) {
  event.preventDefault();
  var query = "top_rated";
  var linkToMoreMovies = "./movies.html?q=" + query;
  location.assign(linkToMoreMovies);
});
$("#most-searched").on("click", function (event) {
  event.preventDefault();
  var query = "trending";
  var linkToMoreMovies = "./movies.html?q=" + query;
  location.assign(linkToMoreMovies);
});
$("#recent-releases").on("click", function (event) {
  event.preventDefault();
  var query = "recent_releases";
  var linkToMoreMovies = "./movies.html?q=" + query;
  location.assign(linkToMoreMovies);
});
