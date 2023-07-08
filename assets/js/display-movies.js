// global variables
var searchFormEl = $("#search-form");
var movieTypeEl = $("#movie-type");
var moviesResultEl = $("#movies-result");
var logoEl = $("#logo");
var projectTitleEl = $("#project-title1");

var apiKey = "533313cc880a2148c77843e769ec1a97";


logoEl.addClass("card-title");
projectTitleEl.addClass("card-title");


function getParams() {
  var getQueryParam = window.location.search.split("=");
  var query = getQueryParam.pop();
  console.log(query);
  getDataFromApi(query);
}
function getDataFromApi(query) {
  var requestedUrl;
 requestedUrl = "https://api.themoviedb.org/3/";
  //   tmbdQueryUrl =
  //     tmbdQueryUrl + "movie?query=" + query + "&page=1" + "&api_key=" + apiKey;
  if (query === "top_rated") {
    requestedUrl = requestedUrl + "movie/" + query + "?api_key=" + apiKey;
    movieTypeEl.text("Top Movies");
  }
//   }https://api.themoviedb.org/3/trending/movie/week?api_key=
  else if(query==="trending"){
    requestedUrl = requestedUrl + query+ "/movie/week?api_key=" + apiKey;
    movieTypeEl.text("Most Searched");
  }
else{
    //https://api.themoviedb.org/3/discover/movie?&with_original_language=en&primary_release_date.gte=2023-01-01&primary_release_date.lte=2023-07-03&sort_by=primary_release_date.desc&api_key=" +
    apiKey
    requestedUrl = requestedUrl +"discover/movie?&with_original_language=en&"+ query+ "&api_key=" + apiKey;
    movieTypeEl.text("Most Searched");
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
        moviesResultEl.html("<h3>no results found, search again!</h3>");
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

function printResults(obj) {
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
    var img = $('<img>');
    var imgLink = "https://image.tmdb.org/t/p/w500/";
    var pE1 = $('<p>');

    if (result.poster_path) {
      imgLink += result.poster_path;
      img.attr("src", imgLink);
    } else {
      img.attr("src", "./assets/images/no-poster.png");
    }
    var rating = parseFloat(result.vote_average);
    if (rating > 0) {
      ratingE1 = $('<h6>' + "Rating: " + rating.toFixed(1) + '</h6>');
      ratingE1.append('<i class="fa fa-star" style="color:yellow"></i>');
    } else {
      ratingE1 = $('<h6>No rating available</h6>');
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
  
  // Event listener for search bar
  logoEl.on("click", function () {
    var locUrl = "./index.html";
    location.assign(locUrl);
  });
  projectTitleEl.on("click", function () {
    var locUrl = "./index.html";
    location.assign(locUrl);
  });
  function handleSearchFormSubmit(event) {
    event.preventDefault();
  
    var searchInputVal = $("#search-input").val();
  
    if (!searchInputVal) {
      console.error("You need a search input value!");
      $("#no-input").foundation("open"); // Show the popup
  
      return;
    }
  
    var query = searchInputVal.replace(/\s/g, "+");
  
    moviesResultEl.empty();
    var locUrl = window.location.href.split("?");
    var queryUrl = locUrl[0];
    var queryString = queryUrl + "?q=" + query;
    window.location.replace(queryString);
    getDataFromApi(query);
  }
  
  searchFormEl.on("submit", handleSearchFormSubmit);

getParams();
