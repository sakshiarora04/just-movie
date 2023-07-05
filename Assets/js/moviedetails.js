// var movieId = 343611;
var movieId = 551;
var genre = "Action";
var apiKey = '533313cc880a2148c77843e769ec1a97';

// Fetch movie details by id
var getMovieById = function (movieId) {

    var apiUrl = 'https://api.themoviedb.org/3/movie/' + movieId + '?api_key=' + apiKey + '&language=en-US&append_to_response=credits';
    fetch(apiUrl, { cache: 'reload' })
        .then(function (response) {
            if (response.ok) {

                response.json().then(function (data) {
                    displayMovieDetails(data);
                    console.log(data);
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
var displayMovieDetails = function (movies) {
    if (movies.length === 0) {
        $('#movie-validation-modal').foundation('open');
        return;
    }
    var movieId = movies.id;
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
    var titleEl = $('#movie-details');
    titleEl.append($('<h4>').text(movieTitle));

    titleEl.append($('<strong>').text('Genre : ')).append($('<p>').css('display', 'inline-block').text(genre));
    titleEl.append($('<i id="star" class="fas fa-solid fa-star fa-2xs" style="color: #fdeb26; display:inline ;margin-left:400px ;"></i>').append($('<p>').css('display', 'inline-block').css('padding-left', '20px').text(userRating)));
    titleEl.append($('<p>').css('display', 'block').append($('<strong>').text('Runtime : ')).append($('<p>').css('display', 'inline-block').text(runtime)));
    titleEl.append($('<p>').css('display', 'block').append($('<strong>').text('User Rating : ')).append($('<p>').css('display', 'inline-block').text(userRating + '/ 10')));

    titleEl.append($('<p>').css('display', 'block').append($('<strong>').text('Release Date : ')).append($('<p>').css('display', 'inline-block').text(releaseDate)));
    titleEl.append($('<p>').css('display', 'block').append($('<strong>').text('Director : ')).append($('<p>').css('display', 'inline-block').text(director)));
    titleEl.append($('<p>').css('display', 'block').append($('<strong>').text('Overview : ')).append($('<p>').css('display', 'inline').text(overview)));

    var castEl = $('#cast-details');
    for (var i = 0; i < movies.credits.cast.length; i++) {
        if (movies.credits.cast[i].profile_path != null) {
            var castProfilePath = 'https://image.tmdb.org/t/p/w500///' + movies.credits.cast[i].profile_path;
            var cardEl = $('<div class="card small-" style="height:300px; width:170px ; background-color:white"></div>');
            var castImageEl = $('<img style="height:200px; width:170px">').attr("src", castProfilePath);
            var cardSectionEl = $('<div class="card-section" style="background-color:white"></div>');
            var castName = $('<p>').append($('<strong>').text(movies.credits.cast[i].name));
            var castRole = $('<p>').text(movies.credits.cast[i].character);
            cardEl.append(castImageEl);
            cardSectionEl.append(castName).append(castRole);
            cardEl.append(cardSectionEl);

            castEl.append(cardEl);
        }
    }

};
//function to fetch reviews by movie id
var getReviewsByMovieId = function (movieId) {
    var apiUrl = 'https://api.themoviedb.org/3/movie/' + movieId + '/reviews?api_key=' + apiKey;
    fetch(apiUrl, { cache: 'reload' })
        .then(function (response) {
            if (response.ok) {

                response.json().then(function (data) {
                    console.log(data.results);
                    displayReviews(data.results);
                });
            } else {
                // alert('Error: ' + response.statusText);
            }
        })
        .catch(function (error) {
            alert('Unable to connect to Fetch');
        });
};
getReviewsByMovieId(movieId);
function displayReviews(reviews) {
    var sectionReviewEl = $('<div style="background-color:#1B1616; padding :15px"></div>');
    var review = reviews[0].content;
    var author = reviews[0].author;
    var writtenDate = dayjs(reviews[0].created_at).format('DD-MM-YY');
    var titleEl = $('#movie-reviews');
    sectionReviewEl.append($( '<h6>').append($('<strong>').text('A review written by ' + author)));
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

    $("#play-review").on("click", function () {

        responsiveVoice.speak(review);
    });

    var sectionReviewEl = $('<a id="read-more-reviews" style="margin-left:0px">Read all Reviews</a>');
    titleEl.append(sectionReviewEl);
    $('#read-more-reviews').on("click", function () {
        var reviewModalEl = $('#review-modal');
        var moreReviewEl = $('#more-reviews');
        moreReviewEl.html("");
        for (var i = 0; i < reviews.length; i++) {

            var review = reviews[i].content;
            var author = reviews[i].author;
            var writtenDate = dayjs(reviews[i].created_at).format('DD-MM-YY');

            moreReviewEl.append($('<h6>').append($('<strong>').text('A review written by ' + author)));
            moreReviewEl.append($('<p>').text('Written by ' + author + ' on ' + writtenDate));
            moreReviewEl.append($('<p>').css('display', 'block').append($('<p>').css('display', 'inline').text(review)));
        }
        reviewModalEl.append(moreReviewEl);
        $('#review-modal').foundation('open');
    });
}



