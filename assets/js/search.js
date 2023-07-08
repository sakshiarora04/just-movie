var searchFormEl = $("#search-form");
var calloutEl = $("#errorMessage");
var recentSearches = [];

function handleSearchFormSubmit(event) {
  event.preventDefault();

  var searchInputVal = $("#search-input").val();

  if (!searchInputVal) {
    console.error("You need a search input value!");
    $("#no-input").foundation("open"); // Show the popup

    return;
  }

  var query = searchInputVal.replace(/\s/g, "+");
  // console.log(query)
  var queryString = "./display-search.html?q=" + query;

  location.assign(queryString);
}

function getRecentSearchesFromStorage() {
  var recentSearchesString = localStorage.getItem("recentSearches");
  if (recentSearchesString) {
    recentSearches = JSON.parse(recentSearchesString);
  }
}

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

  // Call the function after page loads
  $("#search-input")
    .autocomplete({
      minLength: 0, // Show suggestions when the field is focused
      delay: 0, // No delay in showing suggestions
      autoFocus: true, // Focus on the first suggestion
      position: {
        my: "left top+4", // Adjust the position of the suggestions dropdown
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
