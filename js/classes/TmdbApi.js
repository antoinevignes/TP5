export class TmdbApi {
  #apiKey =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5Y2ZjM2MyYTlmZGM2MWYwOTNjMDRhMjliMGNhMzY2NSIsIm5iZiI6MTcyOTIzNjUzNS4xNzcsInN1YiI6IjY3MTIwZTM3MDk3YzNkNzc2MGY4OGZlYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TMoKsLlbxwPffJvmZM0L-NWcEb2n5zbeRExTmifRzNc";

  async discoverMovies(lang) {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${this.#apiKey}`,
      },
    };
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=${lang}&page=1&sort_by=popularity.desc`,
        options
      );
      const data = await response.json();
      console.log(data);

      return data;
    } catch (error) {
      alert("An error occurred while fetching data from the API");
    }
  }

  async searchMovies(searchValue, page, lang) {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${this.#apiKey}`,
      },
    };
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${searchValue}&include_adult=false&language=${lang}&page=${page}`,
        options
      );
      const data = await response.json();
      return data;
    } catch (error) {
      alert("An error occurred while fetching data from the API");
    }
  }
}
