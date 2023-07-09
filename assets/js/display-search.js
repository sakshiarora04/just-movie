// global variables
var searchFormEl = $("#search-form");
var resultTextEl = $("#result-content");
var resultContentEl = $("#result-content");
var logoEl = $("#logo");
var projectTitleEl = $("#project-title1");

var apiKey = "533313cc880a2148c77843e769ec1a97";
var recentSearches = [];
// Hover class to Header
logoEl.addClass("card-title");
projectTitleEl.addClass("card-title");

// getting paramaters for api fetch
function getParams() {
  var searchParamsArr = window.location.search.split("=");

  var query = searchParamsArr.pop();

  loadLocalStorage();
  filterRecentSearches();

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
      if (!tmbdRes.results.length) {
        $("#no-results").foundation("open");
      } else {
        printResults(tmbdRes);
        if (query) {
          getRecentSearchesFromStorage(query);
        }
        // Store the searched query in recentSearches array
      }
    })
    .catch((error) => {
      console.error("Fetch error:", error);
      resultContentEl.html(
        "<h3>Error occurred while fetching search results</h3>"
      );
    });
}

function filterRecentSearches() {
  var currentDomain = window.location.hostname;

  recentSearches = recentSearches.filter(function (search) {
    return search.includes(currentDomain);
  });
}

function loadLocalStorage() {
  var recentSearchesString = localStorage.getItem("recentSearches");
  if (recentSearchesString) {
    recentSearches = JSON.parse(recentSearchesString);
  }
}

function getRecentSearchesFromStorage(query) {
  var recentSearchesString = localStorage.getItem("recentSearches");
  if (recentSearchesString) {
    recentSearches = JSON.parse(recentSearchesString);
  }
  if (query && !recentSearches.includes(query)) {
    var recentQuery = query.replace("+", " ");
    recentSearches.unshift(recentQuery);
    if (recentSearches.length > 5) {
      recentSearches.pop();
    }
    storeRecentSearchesInStorage();
  }
}

function storeRecentSearchesInStorage() {
  localStorage.setItem("recentSearches", JSON.stringify(recentSearches));
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

// Getting Genre list
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
    var genreId = liClicked.parent("li").attr("data-index");
    var genreIdQueryString = "./.html?q=" + genreId;
    location.assign(genreIdQueryString);
  });
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
  var linkToMoreMovies = "./movies.html?q=" + query;
  location.assign(linkToMoreMovies);
});
$("#recent-link").on("click", function (event) {
  event.preventDefault();
  var query = "recent_releases";
  var linkToMoreMovies = "./movies.html?q=" + query;
  location.assign(linkToMoreMovies);
});
// Event listener for search bar
searchFormEl.on("submit", handleSearchFormSubmit);
getParams();

$(document).ready(function () {
  loadLocalStorage();
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
