// var movieId = 343611;
var movieId = 284054;
// var searchParramsArray=window.location.search.split("=");
// var movieId=searchParramsArray.pop();
var apiKey = '533313cc880a2148c77843e769ec1a97';
var omdbapiKey = '7721caf5';
var imdbId;
// Fetch movie details by id
var getMovieById = function (movieId) {
    // var apiUrl ='https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US%7Cen&page=1&sort_by=popularity.desc&with_original_language=en&with_genres='+genre+'&api_key='+apiKey;
    var apiUrl = 'https://api.themoviedb.org/3/movie/' + movieId + '?api_key=' + apiKey + '&language=en-US&append_to_response=credits';
    fetch(apiUrl, { cache: 'reload' })
        .then(function (response) {
            if (response.ok) {

                response.json().then(function (data) {
                    console.log(data);
                    displayMovieDetails(data);
                });
            } else {
                // alert('Error: ' + response.statusText);
            }
        })
        .catch(function (error) {
            // alert('Unable to connect to Fetch');
        });
};

getMovieById(movieId);


// Displays movie details 
var titleEl = $('#movie-details');
var displayMovieDetails = function (movies) {
    if (movies.length === 0) {
        $('#movie-validation-modal').foundation('open');
        return;
    }
    var movieId = movies.id;
    imdbId = movies.imdb_id;

    var movieReleaseDate = movies.release_date;
    var releaseDate = dayjs(movieReleaseDate).format('D MMMM YYYY');
    var releaseYear = dayjs(movieReleaseDate).format('YYYY');
    var movieTitle = movies.title + ' (' + releaseYear + ')';
    var moviePosterPath = 'https://image.tmdb.org/t/p/w500///' + movies.poster_path;
    var imageEl = $('#imgId').attr('src', moviePosterPath);
    var genre = '';
    for (var i = 0; i < movies.genres.length; i++) {
        if (genre === '') {
            genre = movies.genres[i].name;
        }
        else {
            genre = genre + ',' + movies.genres[i].name;
        }
    }
    for (var i = 0; i < movies.credits.crew.length; i++) {

        if (movies.credits.crew[i].job == "Director") {
            var director = movies.credits.crew[i].name;
        }
        if (movies.credits.crew[i].job == "Writer") {
            var writer = movies.credits.crew[i].name;
        }
    }
    var overview = movies.overview;
    var runtime = Math.floor(118 / 60) + 'h    ' + 118 % 60 + 'min';
    var userRating = movies.vote_average.toFixed(1);

    titleEl.append($('<h4>').text(movieTitle));

    titleEl.append($('<strong>').text('Genre : ')).append($('<p>').css('display', 'inline').text(genre));
    titleEl.append($('<i id="star" class="fas fa-solid fa-star fa-2xs" style="color: #fdeb26; display:inline ;margin-left:400px ;"></i>').append($('<p>').css('display', 'inline-block').css('padding-left', '20px').text(userRating)));
    titleEl.append($('<p>').css('display', 'block').append($('<strong>').text('Runtime : ')).append($('<p>').css('display', 'inline-block').text(runtime)));
    titleEl.append($('<p>').css('display', 'block').append($('<strong>').text('User Rating : ')).append($('<p>').css('display', 'inline-block').text(userRating + '/ 10')));

    titleEl.append($('<p>').css('display', 'block').append($('<strong>').text('Release Date : ')).append($('<p>').css('display', 'inline-block').text(releaseDate)));
    titleEl.append($('<p>').css('display', 'block').append($('<strong>').text('Director : ')).append($('<p>').css('display', 'inline-block').text(director)));
    titleEl.append($('<p>').css('display', 'block').append($('<strong>').text('Overview : ')).append($('<p>').css('display', 'inline').text(overview)));

    //Display cast details
    var castEl = $('#cast-details');
    for (var i = 0; i < movies.credits.cast.length; i++) {
        if (movies.credits.cast[i].profile_path != null) {
            var castProfilePath = 'https://image.tmdb.org/t/p/w500///' + movies.credits.cast[i].profile_path;
            var cardEl = $('<div class="card small-12" style="height:320px; width:170px ; background-color:rgb(227, 212, 212)"></div>');
            var castImageEl = $('<img style="height:200px; width:200px">').attr("src", castProfilePath);
            var cardSectionEl = $('<div class="card-section" style="background-color:white padding:0px "></div>');
            var castName = $('<p>').append($('<strong>').text(movies.credits.cast[i].name));
            var castRole = $('<p>').text(movies.credits.cast[i].character);
            cardEl.append(castImageEl);
            cardSectionEl.append(castName).append(castRole);
            cardEl.append(cardSectionEl);

            castEl.append(cardEl);
        }
    }
    if (imdbId != null) {
        getMovieByImdbId(imdbId);
    }
};

//Movie details from OMDB to display ratings from different sites.
var getMovieByImdbId = function (imdbId) {
    var apiUrl = 'http://www.omdbapi.com?apikey=' + omdbapiKey + '&i=' + imdbId;
    fetch(apiUrl, { cache: 'reload' })
        .then(function (response) {
            if (response.ok) {

                response.json().then(function (data) {
                    displayRatingsFromOmdb(data.Ratings);
                });
            } else {
                // alert('Error: ' + response.statusText);
            }
        })
        .catch(function (error) {
            // alert('Unable to connect to Fetch');
        });
};
//Display movie ratings of  IMDB, Rotten tomatoes and Metacritic(Data is taken from OMDB by imdbid).
function displayRatingsFromOmdb(ratings) {
    var ratingSource;
    var ratingValue;
    var cardEl = $('<div class="grid-x grid-padding-x align-center-middle text-center" style="height: 150px;"></div>');
    for (var i = 0; i < ratings.length; i++) {
        ratingSource = ratings[i].Source;
        ratingValue = ratings[i].Value;
        var cardSectionEl = $('<div class="cell small-12 medium-4 "></div>');
        var sourceEl = $('<p>').append($('<strong>').text(ratingSource));
        var ratingEl = $('<p style="color: #fdeb26">').text(ratingValue);
        cardSectionEl.append(sourceEl);
        cardSectionEl.append(ratingEl);
        cardEl.append(cardSectionEl);
    }
    titleEl.append(cardEl);
}


//function to fetch reviews by movie id
var getReviewsByMovieId = function (movieId) {
    var apiUrl = 'https://api.themoviedb.org/3/movie/' + movieId + '/reviews?api_key=' + apiKey;
    fetch(apiUrl, { cache: 'reload' })
        .then(function (response) {
            if (response.ok) {

                response.json().then(function (data) {
                    // console.log(data.results);
                    displayReviews(data.results);
                });
            } else {
                // alert('Error: ' + response.statusText);
            }
        })
        .catch(function (error) {
            // alert('Unable to connect to Fetch');
        });
};
getReviewsByMovieId(movieId);
//Display reviews
function displayReviews(reviews) {
    var sectionReviewEl = $('<div style="background-color:#1B1616; padding :15px"></div>');
    var review = reviews[0].content;
    var author = reviews[0].author;
    var writtenDate = dayjs(reviews[0].created_at).format('DD-MM-YY');
    var titleEl = $('#movie-reviews');
    sectionReviewEl.append($('<h6>').append($('<strong>').text('A review written by ' + author)));
    sectionReviewEl.append($('<p>').text('Written by ' + author + ' on ' + writtenDate));
    sectionReviewEl.append($('<p>').css('display', 'block').append($('<p>').css('display', 'inline').text(review)));
    console.log(writtenDate);

    var buttonPlayEl = $('<button id="play-review" class="button" type="button" style="display:inline;"></button>');
    //  Screen readers will see "Play" 
    var spanScreenReaderEl = $('<span class="show-for-sr">Play</span>');
    // Visual users will see the icon , but not the "Play" text 
    var spanVisualReaderEl = $('<span aria-hidden="true"><i class="fas fa-solid fa-play fa-2xl" style="color: #white;"></i> </span>');
    buttonPlayEl.append(spanScreenReaderEl);
    buttonPlayEl.append(spanVisualReaderEl);
    sectionReviewEl.append(buttonPlayEl);
    titleEl.append(sectionReviewEl);
    //Plays the text to voice (responsive voice api call)
    $("#play-review").on("click", function () {

        responsiveVoice.speak(review);
    });

    var sectionReviewEl = $('<a id="read-more-reviews" style="margin-left:0px">Read all Reviews</a>');
    titleEl.append(sectionReviewEl);

    //Opens a modal which displays all the reviews.
    $('#read-more-reviews').on("click", function () {
        var reviewModalEl = $('#review-modal');
        var moreReviewEl = $('#more-reviews');
        moreReviewEl.html("");
        for (var i = 0; i < reviews.length; i++) {
            var sectionReviewEl = $('<div style="background-color: white; padding :15px"></div>');
            var review = reviews[i].content;
            var author = reviews[i].author;
            var writtenDate = dayjs(reviews[i].created_at.substring(0, 7)).format('DD-MM-YY');

            sectionReviewEl.append($('<h6>').append($('<strong>').text('A review written by ' + author)));
            sectionReviewEl.append($('<p>').text('Written by ' + author + ' on ' + writtenDate));
            sectionReviewEl.append($('<p>').css('display', 'block').append($('<p>').css('display', 'inline').text(review)));
            var buttonPlayEl = $('<button id="play-review" class="button" type="button" style="display:inline;"></button>');
            //  Screen readers will see "Play" 
            var spanScreenReaderEl = $('<span class="show-for-sr">Play</span>');
            // Visual users will see the icon , but not the "Play" text 
            var spanVisualReaderEl = $('<span aria-hidden="true"><i class="fas fa-solid fa-play fa-2xl" style="color: #white;"></i> </span>');
            var hrEl=$('<hr>');
            buttonPlayEl.append(spanScreenReaderEl);
            buttonPlayEl.append(spanVisualReaderEl);
            sectionReviewEl.append(buttonPlayEl);
            sectionReviewEl.append(hrEl);
            moreReviewEl.append(sectionReviewEl);
        
        }
        reviewModalEl.append(moreReviewEl);
        $('#review-modal').foundation('open');
        moreReviewEl.on('click', '#play-review', playReview);
        function playReview(event) {
            var btnClicked = $(event.target);
            // get the parent `<div>` element from the button we clicked and traverse to find the review text
            var clickedReview =   btnClicked.parent('div').children('p').eq(1).text();
            responsiveVoice.speak(clickedReview);
        }
    });
}

