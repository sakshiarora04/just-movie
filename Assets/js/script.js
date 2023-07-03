var apiKey = "dd82df3a677360e4edaa486372b0e8b4";
var mostSearchedE1 = $(".most-search");
// var cellE1=$('.cell');
// var cardResultE1=$('card');
// contain.addClass('grid-x grid-margin-x small-up-2 medium-up-4 large-up-5 align-center');

// var movieTitleE1 = $(".movie-title");
// var movieYearE1 = $(".movie-year");
// var movieRatingE1 = $(".movie-rating");
// var movieImgE1 = $(".movie-img");
var ulE1 = $(".ul-search");
var liE1 = $(".li-search");
var contain = $(".contain");
var next = $(".orbit-next");
var prev = $(".orbit-prev");
var i = 0;
var j = 4;
function getMostSearchedResults() {
  var mostSearchedUrl =
    "https://api.themoviedb.org/3/trending/movie/week?api_key=" + apiKey;
  fetch(mostSearchedUrl)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      }
    })
    .then(function (data) {
      if (!data.results.length) {
        mostSearchedE1.text("no results found");
      } else {
        renderMostSearchedResults(data);
      }
    });
}
function init() {
  getMostSearchedResults();
}

function renderMostSearchedResults(obj) {
    //loop to print 4 cards inside carousal
  for (i; i < j; i++) {
    var cell = printResults(obj.results[i]);
    contain.append(cell);
    console.log(i);
  }
  // print last 4 results on next button click
  if (i === obj.results.length) {
    if($('orbit-prev').click){
        console.log("hi")
    }
    // if(prev.on("click",function(){
    //     console.log("hi")
        
    // }))
    i = obj.results.length - 4;                                  
  }

  liE1.append(contain);
  ulE1.append(liE1);
}
function renderNextData() {
  contain.text("");

  // if(i<obj.results.length);{
  j = i + 4;
  getMostSearchedResults();
  // for (i; i <j; i++) {

  //      var cell= printResults(obj.results[i]);

  //         contain.append(cell);
  //         console.log("next")
  //         console.log(i)
  // }
  return;
}
function renderPrevData() {
  contain.text("");
  if (i <= 4) {
    i = 0;
    getMostSearchedResults();
    return;
  }
  i = i - 8;
  j = i + 4;
  getMostSearchedResults();
  // for (i; i <j; i++) {
  //     var cell= printResults(obj.results[i]);
  //         contain.append(cell);
  //         console.log("prev");
  // }
  return;
}

//   ulE1.append(liE1);
//   console.log(ulE1)

//     numberOfLi=obj.results.length/4;
//     console.log(numberOfLi);
//    for (var i = 0; i < numberOfLi; i++) {
//     var liE1=$('<li>');
//     liE1.addClass('is-active orbit-slide');
//     var contain=$('<div>');

//     contain.addClass('grid-x grid-margin-x small-up-2 medium-up-4 large-up-5 align-center');

//     for (var i = 0; i < obj.results.length; i++) {
//         printResults(obj.results[i]);

//         ulE1.append(liE1);
//         console.log(ulE1)
//     }

//     console.log(ulE1)

function printResults(result) {
    console.log("hello")
  var cellE1 = $('<div class="cell"></div>');
  var card = $('<div class="card"></div>');
  var img = $("<img>");
  var cardSection = $('<div class="card-section"></div>');
  var h5E1 = $("<h5>");

  var h6E1 = $("<h6>");

  var imgLink = "https://image.tmdb.org/t/p/w500/";

  imgLink += result.poster_path;

  img.attr("src", imgLink);

  var releaseDate = dayjs(result.release_date).format("YYYY");
  h5E1.text(result.title + " (" + releaseDate + ")");
  var rating = parseFloat(result.vote_average);
  h6E1.text("Rating: " + rating.toFixed(2));
  h6E1.append("<i class='fa fa-star' style='color:yellow'></i>");

  //   pE1.text(releaseDate);

  cardSection.append(h5E1);
  cardSection.append(h6E1);
  // cardSection.append(pE1);
  card.append(img);
  card.append(cardSection);
  cellE1.append(card);

  return cellE1;
}
$(".orbit-previous").on("click", renderPrevData);
$(".orbit-next").on("click", renderNextData);
contain.on("click", function () {
  console.log("details page");
});
init();

/* <img src="assets/img/rectangle-1.jpeg"><div class="card-section"><h4>This is a row of cards.</h4><p>This row of cards is embedded in an X-Y Block Grid.</p></div> */
// var imgLink= "https://image.tmdb.org/t/p/w500/";

// imgLink+=result.poster_path;

// movieImgE1.attr('src',imgLink);

// movieTitleE1.text(result.title);
// movieRatingE1.text(result.vote_average);
// movieRatingE1.html("<i class='fa fa-star'></i>")
// movieYearE1.text(result.release_date);

//   var liE1;

//   numberOfLi = obj.results.length / 4;
//   console.log(numberOfLi);

// //   for (let i = 0; i < numberOfLi; i++) {
//     liE1= $("<li>");
//   liE1.addClass("is-active orbit-slide");
//     liE1.attr("data-slide", 0);
//     contain= $("<div>");

//     contain.addClass(
//       "grid-x grid-margin-x small-up-2 medium-up-4 large-up-5 align-center"
//     );
//   if(liE1.attr('data-slide')){
//     console.log(liE1.attr('data-slide'));

// if (i === j) {
//   j = i;
// } else {
//   j = i * 4;
// }
// for (j; j < j + 4; j++) {
//   var cell = printResults(obj.results[j]);
//   contain.append(cell);
// }

//  var cell=  printResults(obj.results[0]);

// liE1.attr("data-slide",1);
//   }
