var movieId = 343611;
var getMovieById = function (movieId) {
    var apiKey = 'api_key=533313cc880a2148c77843e769ec1a97';
    var apiUrl = 'https://api.themoviedb.org/3/movie/' + movieId + '?' + apiKey + '&language=en-US&append_to_response=credits';
    // var apiUrl = 'https://api.themoviedb.org/3/movie/'+movieId+'?api_key=533313cc880a2148c77843e769ec1a97&'+apiKey;
    fetch(apiUrl, { cache: 'reload' })
        .then(function (response) {
            if (response.ok) {

                response.json().then(function (data) {

                    
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

