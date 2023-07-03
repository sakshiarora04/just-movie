var movieId = 343611;
var getMovieById = function (movieId) {
    var apiKey = 'api_key=533313cc880a2148c77843e769ec1a97';
    var apiUrl = 'https://api.themoviedb.org/3/movie/' + movieId + '?' + apiKey + '&language=en-US&append_to_response=credits';
    // var apiUrl = 'https://api.themoviedb.org/3/movie/'+movieId+'?api_key=533313cc880a2148c77843e769ec1a97&'+apiKey;
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
    var movieTitle = movies.title;
    var movieReleaseDate = movies.release_date;
    var releaseDate = dayjs(movieReleaseDate).format('D MMMM YYYY');
    var moviePosterPath = 'https://image.tmdb.org/t/p/w500//' + movies.poster_path;
    console.log(movieTitle);
    console.log(releaseDate);
    console.log(moviePosterPath);
    for (var i = 0; i < 3; i++) {
        console.log(movies.credits.cast[i].name);
    }
    var overview = movies.overview;
    console.log(overview);
};

