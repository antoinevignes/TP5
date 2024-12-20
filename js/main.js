import { TmdbApi } from "./classes/TmdbApi.js";
import populateMovies from "./utils/movieUtils.js";

const api = new TmdbApi();
const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search");
const pages = document.querySelector("#pages");
const select = document.querySelector("#lang");
let lang = "fr-FR";
let initialMovies = [];

select.addEventListener("change", async (e) => {
  lang = e.target.value;
  if (searchInput.value) {
    await handleSearch(searchInput.value, 1);
  } else {
    await loadInitialMovies();
  }
});

async function loadInitialMovies() {
  const data = await api.discoverMovies(lang);
  initialMovies = data.results;
  populateMovies(initialMovies);
}

async function handleSearch(searchValue, page = 1) {
  if (!searchValue) {
    populateMovies(initialMovies);
    pages.innerHTML = "";
    return;
  }

  const searchResults = await api.searchMovies(searchValue, page, lang);
  if (searchResults.results.length === 0) {
    alert("No results found");
    populateMovies(initialMovies);
    pages.innerHTML = "";
  } else {
    populateMovies(searchResults.results);
    renderPagination(searchResults.total_pages, page, searchValue);
  }
}

function renderPagination(totalPages, currentPage, searchValue) {
  pages.innerHTML = "";

  let startPage = Math.max(1, currentPage - 4);
  let endPage = Math.min(totalPages, startPage + 9);

  if (endPage - startPage < 9) {
    startPage = Math.max(1, endPage - 9);
  }

  const prevButton = document.createElement("button");
  prevButton.textContent = "←";
  prevButton.classList.add("page-button");
  prevButton.disabled = currentPage === 1;
  prevButton.addEventListener("click", () =>
    handleSearch(searchValue, currentPage - 1)
  );
  pages.appendChild(prevButton);

  for (let i = startPage; i <= endPage; i++) {
    const button = document.createElement("button");
    button.textContent = i;
    button.classList.add("page-button");
    if (i === currentPage) {
      button.classList.add("active");
    }
    button.addEventListener("click", () => handleSearch(searchValue, i));
    pages.appendChild(button);
  }

  const nextButton = document.createElement("button");
  nextButton.textContent = "→";
  nextButton.classList.add("page-button");
  nextButton.disabled = currentPage === totalPages;
  nextButton.addEventListener("click", () =>
    handleSearch(searchValue, currentPage + 1)
  );
  pages.appendChild(nextButton);
}

searchForm.addEventListener("reset", async () => {
  searchInput.value = "";
  await loadInitialMovies();
});

searchInput.addEventListener("input", async (e) => {
  if (!e.target.value.trim()) {
    await loadInitialMovies();
    return;
  }
  handleSearch(e.target.value, 1);
});

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  handleSearch(searchInput.value, 1);
});

loadInitialMovies();
