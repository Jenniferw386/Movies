//https://www.omdbapi.com/?i=tt3896198&apikey=de02f260

//Poster API requests:
//http://img.omdbapi.com/?apikey=[yourkey]&

//Send all data requests to:

//http://www.omdbapi.com/?apikey=[yourkey]&

document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('searchInput');
  const spinner = document.getElementById('spinner');
  const moviesList = document.querySelector(".movies");
  let movies = [];

  document.getElementById('filter').addEventListener('change', filterMovies);
  document.getElementById('searchButton').addEventListener('click', getMovies);

  searchInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      getMovies();
    }
  });

  async function getMovies() {
    const query = encodeURIComponent(searchInput.value.trim());

    if (!query) {
      moviesList.innerHTML = `<p>Enter a search title.</p>`;
      return;
    }

    spinner.style.display = 'block';

    try {
      const response = await fetch(`https://www.omdbapi.com/?apikey=de02f260&s=${query}`);
      const moviesData = await response.json();
      console.log(moviesData);

      if (moviesData.Search) {
        movies = moviesData.Search;
        displayMovies(movies);
      } else {
        moviesList.innerHTML = `<p>No movies found.</p>`;
      }
    } catch (error) {
      moviesList.innerHTML = `<p>Error fetching movies.</p>`;
      console.error(error);
    } finally {
      spinner.style.display = 'none';
    }
  }

  function displayMovies(movieArray) {
    moviesList.innerHTML = movieArray
      .map(
        (movie) => `<div class="movie">
          <img src="${movie.Poster}" alt="">
          <h1 class="title">${movie.Title}</h1>
          <p class="year">${movie.Year}</p>
      </div>`
      )
      .join("");
  }

  function filterMovies(event) {
    if (!movies.length) return;

    let filteredMovies = [...movies];

    if (event.target.value === 'NEW_TO_OLD') {
      filteredMovies.sort((a, b) => parseInt(b.Year) - parseInt(a.Year));
    } else if (event.target.value === 'OLD_TO_NEW') {
      filteredMovies.sort((a, b) => parseInt(a.Year) - parseInt(b.Year));
    }

    displayMovies(filteredMovies);
  }

  setTimeout(() => {
    getMovies();
  }, 1000);
});