const sliders = document.getElementsByClassName("slide-content");
var swipers=[];
for (let slide of sliders) {
  
  const nextEl = slide.getElementsByClassName("swiper-button-next")[0];
  const prevEl = slide.getElementsByClassName("swiper-button-prev")[0];
 
  var swiper = new Swiper(slide, {
    speed: 300,
    slidesPerView: 3,
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
      nextEl,
      prevEl,
    },
  });
  swipers.push(swiper);
  console.log(swiper);

}

var apiKey = "dd82df3a677360e4edaa486372b0e8b4";
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
        $(".slide-content").html("No results found");
      } else {
        console.log("search")
        renderMostSearchedResults(data);

      }
    })
    .catch((error) => {
      console.error("Fetch error:", error);
      $(".slide-content").html(
        "<h3>Error occurred while fetching search results</h3>"
      );
    });
}
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
        $(".slide-content").html("No results found");
      } else {
        console.log("rated")
        renderRatedResults(data);
        
      }
    })
    .catch((error) => {
      console.error("Fetch error:", error);
      $(".slide-content").html(
        "<h3>Error occurred while fetching search results</h3>"
      );
    });
}

function init() {
  getMostSearchedResults();
  getRatedResults();
}

function renderMostSearchedResults(obj) {
  //loop to print cards inside carousal
  for (var i = 0; i < obj.results.length; i++) {
    var card = printResults(obj.results[i]);
    var slideShow = $('<div class="card-search swiper-slide"></div>');
    slideShow.append(card);
    swipers[1].appendSlide(slideShow);
    swipers[1].update();
  
  }
}
function renderRatedResults(obj) {
  //loop to print 4 cards inside carousal
  for (var i = 0; i < obj.results.length; i++) {
    var card = printResults(obj.results[i]);
    var slideShow = $('<div class="card-search swiper-slide"></div>');
    slideShow.append(card);
    swipers[0].appendSlide(slideShow);
    swipers[0].update();
    
  }
}
function printResults(result) {
  var cellE1 = $('<div class="cell"></div>');
  var card = $('<div class="card"></div>');
  var img = $("<img>");
  var cardSection = $('<div class="card-section"></div>');
  var h6E1 = $("<h6>");

  var h6E2 = $("<h6>");
  var pE1 = $("<p>");
  var imgLink = "https://image.tmdb.org/t/p/w500/";

  imgLink += result.poster_path;

  img.attr("src", imgLink);

  var releaseDate = dayjs(result.release_date).format("YYYY");
  h6E1.text(result.title + " (" + releaseDate + ")");
  var rating = parseFloat(result.vote_average);
  h6E2.text("Rating: " + rating.toFixed(1));
  h6E2.append('<i class="fa fa-star" style="color:yellow"></i>');
  cardSection.append(h6E1);
  pE1.append(h6E2);
  cardSection.append(pE1);
  card.append(img);
  card.append(cardSection);
  cellE1.append(card);
  return cellE1;
}

// $('.card').on("click", function () {
//   window.location = "check.html";
//   });
init();
