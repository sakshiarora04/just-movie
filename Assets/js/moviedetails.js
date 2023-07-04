// var movieId = 343611;
var movieId = 550;
var getMovieById = function (movieId) {
    var apiKey = 'api_key=533313cc880a2148c77843e769ec1a97';
    var apiUrl = 'https://api.themoviedb.org/3/movie/' + movieId + '?' + apiKey + '&language=en-US&append_to_response=credits';
    fetch(apiUrl, { cache: 'reload' })
        .then(function (response) {
            if (response.ok) {

                response.json().then(function (data) {
                    displayMovieById(data);

                });
            } else {
                alert('Error: ' + response.statusText);
            }
        })
        .catch(function (error) {
            alert('Unable to connect to Fetch');
        });
};
getMovieById(movieId);
var displayMovieById = function (movies) {
    console.log(movies);
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
    var cardEl=$('<div class="card small-6" style="height:300px; width:170px ; background-color:white"></div>');
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

