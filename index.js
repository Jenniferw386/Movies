//https://www.omdbapi.com/?i=tt3896198&apikey=de02f260

//Poster API requests:
//http://img.omdbapi.com/?apikey=[yourkey]&

//Send all data requests to:

//http://www.omdbapi.com/?apikey=[yourkey]&

 

  document.getElementById('searchButton').addEventListener('click', getMovies);

    searchInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      getMovies();
    }
  });

  async function getMovies() {
    const searchInput = document.getElementById('searchInput').value.trim();
     const spinner = document.getElementById('spinner');
    const query = encodeURIComponent(searchInput);

    const response = await fetch(`http://www.omdbapi.com/?apikey=de02f260&s=${query}`);
    const moviesData = await response.json();

    const moviesList = document.querySelector(".movies");

    if (moviesData.Search) {
      moviesList.innerHTML = moviesData.Search
        .map(
          (movie) => `<div class="movie">
              <img src="${movie.Poster}" alt="">
              <h1 class="title">${movie.Title}</h1>
              <p class="year">${movie.Year}</p>
          </div>`
        )
        .join("");
    } else {
      moviesList.innerHTML = `<p>No movies found.</p>`;
    }

    console.log(moviesData);
  }
