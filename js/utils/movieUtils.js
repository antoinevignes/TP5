export default function populateMovies(movies) {
  const results = document.querySelector("#results");
  results.innerHTML = "";
  movies.forEach((movie) => {
    const movieElement = document.createElement("li");
    movieElement.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w200${movie.poster_path}" alt="${movie.title}" />
      <div>
        <h2>${movie.title}</h2>
        <p>${movie.overview}</p>
      </div>
      `;
    results.appendChild(movieElement);
  });
}
