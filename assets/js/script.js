//global variables
var apiKey = "533313cc880a2148c77843e769ec1a97";
var searchFormEl = $("#search-form");
var calloutEl = $("#errorMessage");
var lang = "en";
// swiper for slider to work
var swiper1 = new Swiper("#slide-rated", {
  speed: 300,
  slidesPerView: 4,
  spaceBetween: 15,
  loop: true,
  calculateHeight: true,
  centerSlide: true,
  fade: true,
  grabCursor: true,
  preloadImages: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    520: {
      slidesPerView: 2,
    },
    950: {
      slidesPerView: 3,
    },
  },
  navigation: {
    nextEl: "#button-rated-next",
    prevEl: "#button-rated-prev",
  },
});
var swiper2 = new Swiper("#slide-search", {
  speed: 300,
  slidesPerView: 4,
  spaceBetween: 15,
  loop: true,
  calculateHeight: true,
  centerSlide: true,
  fade: true,
  grabCursor: true,
  preloadImages: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    520: {
      slidesPerView: 2,
    },
    950: {
      slidesPerView: 3,
    },
  },
  navigation: {
    nextEl: "#button-search-next",
    prevEl: "#button-search-prev",
  },
});

var swiper3 = new Swiper("#slide-recent", {
  speed: 300,
  slidesPerView: 4,
  spaceBetween: 15,
  loop: true,
  calculateHeight: true,
  centerSlide: true,
  fade: true,
  grabCursor: true,
  preloadImages: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    520: {
      slidesPerView: 2,
    },
    950: {
      slidesPerView: 3,
    },
  },
  navigation: {
    nextEl: "#button-recent-next",
    prevEl: "#button-recent-prev",
  },
});
// get top rated movies from api
function getRatedResults() {
  var mostRatedUrl =
    "https://api.themoviedb.org/3/movie/top_rated?api_key=" + apiKey;
  fetch(mostRatedUrl)
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(function (data) {
      if (!data.results.length) {
        $("#movie-results").foundation("open");
        $(".slide-content").html("No results found");
      } else {
        renderRatedResults(data);
      }
    })
    .catch((error) => {
      console.error("Fetch error:", error);
      $(".slide-content").html("<h3>Error occurred while fetching movies</h3>");
    });
}
//get most searched movies from api
function getMostSearchedResults() {
  var mostSearchedUrl =
    "https://api.themoviedb.org/3/trending/movie/week?api_key=" + apiKey;
  fetch(mostSearchedUrl)
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(function (data) {
      if (!data.results.length) {
        $("#movie-results").foundation("open");
        $(".slide-content").html("No results found");
      } else {
        renderMostSearchedResults(data);
      }
    })
    .catch((error) => {
      console.error("Fetch error:", error);
      $(".slide-content").html("<h3>Error occurred while fetching movies</h3>");
    });
}

// get recent movies from api
function getRecentReleasesResults(lang) {
  var today = dayjs().format("YYYY-MM-DD");
  var mostRecentUrl =
    "https://api.themoviedb.org/3/discover/movie?&with_original_language=" +
    lang +
    "&primary_release_date.gte=2023-01-01&primary_release_date.lte=" +
    today +
    "&sort_by=primary_release_date.desc&api_key=" +
    apiKey;
  fetch(mostRecentUrl)
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(function (data) {
      if (!data.results.length) {
        $("#movie-results").foundation("open");
        $(".slide-content").html("No results found");
      } else {
        renderRecentReleasesResults(data);
      }
    })
    .catch((error) => {
      console.error("Fetch error:", error);
      $(".slide-content").html("<h3>Error occurred while fetching movies</h3>");
    });
}
//render rated movies resultes in slider
function renderRatedResults(obj) {
  //append slider in swiper
  for (var i = 0; i < obj.results.length; i++) {
    var cell = printResults(obj.results[i]);
    var slideShow = $('<div class="card-search swiper-slide"></div>');
    slideShow.append(cell);
    swiper1.appendSlide(slideShow);
    swiper1.update();
  }
}
//render most searched movies resultes in slider
function renderMostSearchedResults(obj) {
  //append slider in swiper
  for (var i = 0; i < obj.results.length; i++) {
    var cell = printResults(obj.results[i]);
    var slideShow = $('<div class="card-search swiper-slide"></div>');
    slideShow.append(cell);
    swiper2.appendSlide(slideShow);
    swiper2.update();
  }
}
//render recent released movies resultes in slider
function renderRecentReleasesResults(obj) {
  //append slider in swiper
  for (var i = 0; i < obj.results.length; i++) {
    var cell = printResults(obj.results[i]);
    var slideShow = $('<div class="card-search swiper-slide"></div>');
    slideShow.append(cell);
    swiper3.appendSlide(slideShow);
    swiper3.update();
  }
}
//print every movie in corresponding cards
function printResults(result) {
  var cell = $('<div class="cell"></div>');
  var card = $('<div class="card"></div>');
  var a = $("<a></a>");
  var img = $("<img>");
  var cardSection = $('<div class="card-section"></div>');
  // show release year
  var releaseDate = dayjs(result.release_date).format("YYYY");
  var titleE1 = $(
    '<h6 class="card-title">' +
      result.title +
      " (" +
      releaseDate +
      ")" +
      "</h6>"
  );
  var ratingE1;
  var pE1 = $("<p>");
  var imgLink = "https://image.tmdb.org/t/p/w500/";

  if (result.poster_path) {
    imgLink += result.poster_path;
    img.attr("src", imgLink);
    img.attr("style", "object-fit:cover;");
  } else {
    img.attr("src", "./assets/images/no-poster.png");
    img.attr("style", "object-fit:cover;");
  }
  var query = result.id;
  a.attr("href", "./moviedetails.html?q=" + query);
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
  a.append(card);
  cell.append(a);
  return cell;
}

$(document).ready(function () {
  // links for see more button
  $("#see-rated-link").on("click", function (event) {
    event.preventDefault();
    var query = "top_rated";
    var linkToMoreMovies = "./movies.html?q=" + query;
    location.assign(linkToMoreMovies);
  });
  $("#see-search-link").on("click", function (event) {
    event.preventDefault();
    var query = "trending";
    var linkToMoreMovies = "./movies.html?q=" + query;
    location.assign(linkToMoreMovies);
  });
  $("#see-recent-link").on("click", function (event) {
    event.preventDefault();
    var query = "primary_release_date.desc";
    var linkToMoreMovies = "./movies.html?q=" + query;
    location.assign(linkToMoreMovies);
  });

  init();
});
$("#language-select").change(function () {
  var value = $(this).val();
  getRecentReleasesResults(value);
});
//functions to call on page load
function init() {
  getRatedResults();
  getMostSearchedResults();
  getRecentReleasesResults(lang);
}
