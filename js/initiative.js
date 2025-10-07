import { getDataGeneral, getDataByQuery } from "./dndApi.js";

const displayResults = document.querySelector(".results");
const searchButton = document.querySelector(".search-button");
const searchInput = document.getElementById("search");

searchInput.addEventListener("input", async (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
  }
  const category = document.getElementById("category").value;
  const query = searchInput.value;
  if (query != null && query != "") {
    getDataByQuery(category, query, displayResults);
  } else {
    getDataGeneral(category, displayResults);
  }
});

searchButton.addEventListener("click", async (e) => {
  e.preventDefault();
  const category = document.getElementById("category").value;
  await getDataGeneral(category, displayResults);
});