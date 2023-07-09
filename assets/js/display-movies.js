// global variables
var searchFormEl = $("#search-form");
var movieTypeEl = $("#movie-type");
var moviesResultEl = $("#movies-result");
var logoEl = $("#logo");
var projectTitleEl = $("#project-title1");
var pageContainer = $("#page-container");

var apiKey = "533313cc880a2148c77843e769ec1a97";

var pageno = 1;
logoEl.addClass("card-title");
projectTitleEl.addClass("card-title");

//get query and parameters from index page

function getParams(pageno) {
  var getQueryParam = window.location.search.split("=");
  var query = getQueryParam.pop();
  console.log(query);

  getDataFromApi(query, pageno);
}
//fetch data from api by applying query
function getDataFromApi(query, pageno) {
  var requestedUrl;

  requestedUrl = "https://api.themoviedb.org/3/";
  //   tmbdQueryUrl =
  //     tmbdQueryUrl + "movie?query=" + query + "&page=1" + "&api_key=" + apiKey;
  if (query === "top_rated") {
    requestedUrl =
      requestedUrl +
      "movie/" +
      query +
      "?&page=" +
      pageno +
      "&api_key=" +
      apiKey;
    movieTypeEl.text("Top Movies");
    createPagination(pageno);
  }
  //   }
  else if (query === "trending") {
    requestedUrl =
      requestedUrl +
      query +
      "/movie/week?&page=" +
      pageno +
      "&api_key=" +
      apiKey;
    movieTypeEl.text("Most Searched");
    createPagination(pageno);
  } else {
    //https://api.themoviedb.org/3/discover/movie?&with_original_language=en&primary_release_date.gte=2023-01-01&primary_release_date.lte=2023-07-03&sort_by=primary_release_date.desc&api_key=" +
    apiKey;
    requestedUrl =
      requestedUrl +
      "discover/movie?&with_original_language=en&" +
      query +
      "&page=" +
      pageno +
      "&api_key=" +
      apiKey;
    movieTypeEl.text("Recent Releases");
    createPagination(pageno);
  }
  fetch(requestedUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      if (!data.results.length) {
        moviesResultEl.html("<h3>No results found</h3>");
      } else {
        printResults(data);
      }
    })
    .catch((error) => {
      console.error("Fetch error:", error);
      moviesResultEl.html(
        "<h3>Error occurred while fetching search results</h3>"
      );
    });
}

// print results - every movie in cards
function printResults(obj) {
  moviesResultEl.html("");
  obj.results.forEach(function (result) {
    if (!result.title) {
      return;
    }
    // Dynamically creating cards
    var releaseDate = dayjs(result.release_date).format("YYYY");
    var cell = $('<div class="cell"></div>');
    var card = $('<div class="card"></div>');
    var cardSection = $('<div class="card-section"></div>');
    var titleE1 = $(
      '<h6 class="card-title">' +
        result.title +
        " (" +
        releaseDate +
        ")" +
        "</h6>"
    );
    var ratingE1;
    var img = $("<img>");
    var imgLink = "https://image.tmdb.org/t/p/w500/";
    var pE1 = $("<p>");

    if (result.poster_path) {
      imgLink += result.poster_path;
      img.attr("src", imgLink);
    } else {
      img.attr("src", "./assets/images/no-poster.png");
    }
    var rating = parseFloat(result.vote_average);
    if (rating > 0) {
      ratingE1 = $("<h6>" + "Rating: " + rating.toFixed(1) + "</h6>");
      ratingE1.append('<i class="fa fa-star" style="color:yellow"></i>');
    } else {
      ratingE1 = $("<h6>No rating available</h6>");
    }
    cardSection.append(titleE1);
    pE1.append(ratingE1);
    cardSection.append(pE1);
    card.append(img);
    card.append(cardSection);
    cell.append(card);
    moviesResultEl.append(cell);
    card.on("click", function () {
      var movieId = result.id;
      var movieIdQueryString = "./moviedetails.html?q=" + movieId;
      location.assign(movieIdQueryString);
    });
  });
}
// link on header to display movies page
$("#top-rated").on("click", function () {
  var query = "top_rated";
  var linkToTopMovies = "./movies.html?q=" + query;
  location.assign(linkToTopMovies);
});
$("#most-searched").on("click", function () {
  var query = "tending";
  var linkToMostMovies = "./movies.html?q=" + query;
  location.assign(linkToMostMovies);
});
$("#recent-releases").on("click", function () {
  var query =
    "primary_release_date.gte=2023-01-01&primary_release_date.lte=2023-07-03&sort_by=primary_release_date.desc";
  var linkToRecentMovies = "./movies.html?q=" + query;
  location.assign(linkToRecentMovies);
});
// Event listener for search bar
logoEl.on("click", function () {
  var locUrl = "./index.html";
  location.assign(locUrl);
});
projectTitleEl.on("click", function () {
  var locUrl = "./index.html";
  location.assign(locUrl);
});
// handle search submit button
function handleSearchFormSubmit(event) {
  event.preventDefault();

  var searchInputVal = $("#search-input").val();

  if (!searchInputVal) {
    console.error("You need a search input value!");
    $("#no-input").foundation("open"); // Show the popup

    return;
  }

  var query = searchInputVal.replace(/\s/g, "+");
  var queryString = "./display-search.html?q=" + query;

  location.assign(queryString);
}

searchFormEl.on("submit", handleSearchFormSubmit);
$(document).ready(function () {
  getParams(pageno);
});

function createPagination(pageno) {
  pageContainer.html("");

  if (pageno == 1) {
    pageContainer.append(
      "<li class='page-item disabled'><a href='javascript:void(0)' class='page-link'><</a></li>"
    );
  } else {
    pageContainer.append(
      "<li class='page-item' onclick='callToPagination(" +
        (pageno - 1) +
        ")'><a href='javascript:void(0)' class='page-link'><</a></li>"
    );
  }

  var i = 0;
  for (i = 0; i <= 4; i++) {
    if (pageno == pageno + i) {
      pageContainer.append(
        "<li class='page-item'><a href='javascript:void(0)' class='page-link'>" +
          (pageno + i) +
          "</a></li>"
      );
    } else {
      if (pageno + i <= 20) {
        pageContainer.append(
          "<li class='page-item' onclick='callToPagination(" +
            (pageno + i) +
            ")'><a href='javascript:void(0)' class='page-link'>" +
            (pageno + i) +
            "</a></li>"
        );
      }
    }
  }

  if (pageno == 20) {
    pageContainer.append(
      "<li class='page-item disabled'><a href='javascript:void(0)' class='page-link'>></a></li>"
    );
  } else {
    pageContainer.append(
      "<li class='page-item next' onclick='callToPagination(" +
        (pageno + 1) +
        ")'><a href='javascript:void(0)' class='page-link'>></a></li>"
    );
  }
}
function callToPagination(pageno) {
  createPagination(pageno);
  getParams(pageno);
}
