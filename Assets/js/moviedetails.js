// var movieId = 343611;
var movieId = 550;
var apiKey = 'api_key=533313cc880a2148c77843e769ec1a97';

// Fetch movie details by id
var getMovieById = function (movieId) {
    
    var apiUrl = 'https://api.themoviedb.org/3/movie/' + movieId + '?' + apiKey + '&language=en-US&append_to_response=credits';
    fetch(apiUrl, { cache: 'reload' })
        .then(function (response) {
            if (response.ok) {

                response.json().then(function (data) {
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
var displayMovieDetails = function (movies) {
    // console.log(movies);
    if (movies.length === 0) {
        return;
    }
    var movieId = movies.id;
    var movieReleaseDate = movies.release_date;
    var releaseDate = dayjs(movieReleaseDate).format('D MMMM YYYY');
    var releaseYear = dayjs(movieReleaseDate).format('YYYY');
    var movieTitle = movies.title + ' (' + releaseYear + ')';
    var moviePosterPath = 'https://image.tmdb.org/t/p/w500///' + movies.poster_path;
    var imageEl=$('#imgId').attr('src',moviePosterPath);
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
    titleEl.append($('<i class="fas fa-solid fa-star fa-2xs" style="color: #fdeb26; display:inline ;margin-left:400px ;"></i>').append($('<p>').css('display', 'inline-block').css('padding-left', '20px').text(userRating)));
    titleEl.append($('<p>').css('display', 'block').append($('<strong>').text('Runtime : ')).append($('<p>').css('display', 'inline-block').text(runtime)));
    titleEl.append($('<p>').css('display', 'block').append($('<strong>').text('User Rating : ')).append($('<p>').css('display', 'inline-block').text(userRating + '/ 10')));

    titleEl.append($('<p>').css('display', 'block').append($('<strong>').text('Release Date : ')).append($('<p>').css('display', 'inline-block').text(releaseDate)));
    titleEl.append($('<p>').css('display', 'block').append($('<strong>').text('Director : ')).append($('<p>').css('display', 'inline-block').text(director)));
    titleEl.append($('<p>').css('display', 'block').append($('<strong>').text('Overview : ')).append($('<p>').css('display', 'inline').text(overview)));
    
    var castEl = $('#cast-details');
    for (var i = 0; i < movies.credits.cast.length; i++) {
    if(movies.credits.cast[i].profile_path!=null)
    {
    var castProfilePath='https://image.tmdb.org/t/p/w500///' +movies.credits.cast[i].profile_path;
    var cardEl=$('<div class="card small-" style="height:300px; width:170px ; background-color:white"></div>');
    var castImageEl=$('<img style="height:200px; width:170px">').attr("src",castProfilePath);
    var cardSectionEl=$('<div class="card-section" style="background-color:white"></div>');
    var castName=$('<p>').append($('<strong>').text(movies.credits.cast[i].name));
    var castRole=$('<p>').text(movies.credits.cast[i].character);
    cardEl.append(castImageEl);
    cardSectionEl.append(castName).append(castRole);
    cardEl.append(cardSectionEl);

    castEl.append(cardEl);
    }
    }   

};
//function to fetch reviews by movie id
var getReviewsByMovieId = function (movieId) {
    var apiUrl = 'https://api.themoviedb.org/3/movie/' + movieId + '/reviews?' + apiKey;
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
function displayReviews(reviews)
{
    for (var i = 0; i < reviews.length; i++) {
        if(i===0){
        var review=reviews[0].content;
        var author=reviews[0].author;
        var writtenDate=dayjs(reviews[2].created_at).format('DD-MM-YY');
        // var writtenDate=dayjs(reviews[2].created_at).format('D MMMM YYYY');
        var titleEl = $('#movie-reviews');
        titleEl.append($('<h5>').text('A review written by '+author));
        titleEl.append($('<p>').text('Written by '+author+'on '+writtenDate));
        titleEl.append($('<p>').css('display', 'block').append($('<p>').css('display', 'inline').text(review)));
        }
        console.log(writtenDate);
        // console.log(author);
        // console.log(writtenDate);
        // responsiveVoice.speak('David Fincher’s new film, Mank, is coming soon on Netflix, released six years after his latest installment, Gone Girl. Therefore, this week I’m reviewing five of Fincher’s movies. Se7en was the first one, and now it’s time for one of the most culturally impactful films of the 90s, Fight Club. This is another rewatch of another filmmaking classic, one that I was never able to absolutely adore like most people. When this movie came out in 1999, critics were extremely divided, and the film failed at the box office. With time, it gained a cult following through home media, but it’s still considered a very controversial piece of cinema. So, nothing new, having in mind Fincher is at the helm.Despite this being my third or fourth time experiencing this story, I never really changed my opinion about it, which is a bit uncommon in my viewing history. Usually, after multiple rewatches, my overall thoughts about a movie slightly vary, but Fight Club is one of the few exceptions. I believe my opinion remains intact from the very first watch. I really enjoy this film, but I can’t state that I absolutely love it. Since this is a special case, I’m going to start with what still bothers me after so many viewings, something I also rarely do in my reviews since I always leave the bad stuff to the end of the article.');
    }

}
$("#play-review").on("click",function(){
    responsiveVoice.speak('David Fincher’s new film, Mank, is coming soon on Netflix, released six years after his latest');
});
