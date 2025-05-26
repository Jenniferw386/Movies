//https://www.omdbapi.com/?i=tt3896198&apikey=de02f260

//Poster API requests:
//http://img.omdbapi.com/?apikey=[yourkey]&

//Send all data requests to:

//http://www.omdbapi.com/?apikey=[yourkey]&

 
document.getElementById('filter').addEventListener('change', filterMovies);
  document.getElementById('searchButton').addEventListener('click', getMovies);
const searchInput = document.getElementById('searchInput');
let movies = [];

    searchInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      getMovies();
    }
  });

  async function getMovies() {

      const query = encodeURIComponent(searchInput.value.trim());
      const spinner = document.getElementById('spinner');
    const searchInput = document.getElementById('searchInput').value.trim();
    const moviesList = document.querySelector(".movies");

    
  if (!query) {
    moviesList.innerHTML = `<p>Enter a search title.</p>`;
    return;
  }

  spinner.style.display = 'block';

  try{
    const response = await fetch(`https://www.omdbapi.com/?apikey=de02f260&s=${query}`);
    const moviesData = await response.json();

      if (moviesData.Search) {
        movies = moviesData.Search;
        displayMovies(movies);

else {
      moviesList.innerHTML = `<p>No movies found.</p>`;
    }

    console.log(moviesData);
  }}


  function displayMovies(movieArray)
const moviesList = document.querySelector(".movies")

        moviesList.innerHTML = moviesData.Search;
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
    let filteredMovies = [...movies];

if (event.target.value === 'NEW_TO_OLD') {
    const filteredMovies = movies.sort((a, b) => parseInt(a.Year) - parseInt(b.Year));

}
else if (event.target.value === 'OLD_TO_NEW'){
    const filteredMovies = movies.sort((a, b) => parseInt(b.Year) - parseInt(a.Year));
}

  }
  setTimeout(() => {
    getMovies();
  }, 1000);