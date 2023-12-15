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
  var query = getQueryParam[1].split("&");
  getDataFromApi(query, pageno);
}
//fetch data from api by applying query
function getDataFromApi(query, pageno) {
  var requestedUrl;
  var genreId = query[0];
  var genreName = query[1];
  // displaying movies as per genreid getting as query
  requestedUrl = "https://api.themoviedb.org/3/";
  requestedUrl =
    requestedUrl +
    "discover/movie?with_genres=" +
    genreId +
    "&page=" +
    pageno +
    "&api_key=" +
    apiKey;
  movieTypeEl.text(genreName);
  createPagination(pageno);
  // fetch data base on requested url
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
    var card = $('<div class="card card-width"></div>');
    var cardSection = $(
      '<div class="card-section" style="height:130px"></div>'
    );
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
      img.attr("style", "object-fit:cover;");
    } else {
      img.attr("src", "./assets/images/no-poster.png");
    }
    var rating = parseFloat(result.vote_average);
    if (rating > 0) {
      ratingE1 = $("<h6>" + "Rating: " + rating.toFixed(1) + "</h6>");
      ratingE1.append("⭐");
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
  var query = "trending";
  var linkToMostMovies = "./movies.html?q=" + query;
  location.assign(linkToMostMovies);
});
$("#recent-releases").on("click", function () {
  var query = "primary_release_date.desc";
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

// create page number and prev,next button
function createPagination(pageno) {
  pageContainer.html("");
  //create prev button
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
  //put numbers on 5 li's as page buttons
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
  //creating next button
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
$(document).ready(function () {
  getParams(pageno);
});
