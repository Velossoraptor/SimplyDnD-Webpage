import { getDataGeneral, getDataByQuery } from "./dndApi.js";
import { rollStats, calculateModifier } from "./dice.js";
import { saveCharacter, getLocalStorage } from "./localStorage.js";

const displayResults = document.querySelector(".results");
const searchButton = document.querySelector(".search-button");
const searchInput = document.getElementById("search");

const saveChar = document.querySelector(".save");
const characterForm = document.querySelector("form");

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

// Card Flip on Roll Stats Button Click
if (document.querySelector("#roll-stats") !== null) {
  document.querySelector("#roll-stats").addEventListener("click", () => {
    const stats = rollStats();

    const cards = document.querySelectorAll(".score-container");

    cards.forEach((card, index) => {
      const frontScore = card.querySelector(".flip-card-front .score");
      const frontMod = card.querySelector(".flip-card-front .mod");
      const backScore = card.querySelector(".flip-card-back .score");
      const backMod = card.querySelector(".flip-card-back .mod");

      //Update back values
      backScore.textContent = `${stats[index]}`;
      backMod.textContent = `${calculateModifier(stats[index])}`;

      //Flip the card
      setTimeout(() => {
        card.classList.toggle("is-flipped");
        //Wait for flip animation to complete
        const flipDuration = 400; // match your CSS transition
        setTimeout(() => {
          // Swap the content so front always has current stats
          frontScore.textContent = backScore.textContent;
          frontMod.textContent = backMod.textContent;

          // Unflip so card is back to normal orientation and updating back works correctly
          card.classList.remove("is-flipped");
        }, flipDuration + 50);
      }, index * 600);
    });
  });
}

saveChar.addEventListener("click", (e) => {
  const name = characterForm.elements["char-name"].value;
  const race = characterForm.elements["race"].value;
  const charClass = characterForm.elements["class"].value;
  const background = characterForm.elements["background"].value;
  const level = characterForm.elements["level"].value;
  const hp = characterForm.elements["hp"].value;
  const scores = getLocalStorage("current-char-scores");
  saveCharacter(name, race, charClass, background, level, hp, scores);
});
