import { getDataGeneral, getDataByQuery } from "./dndApi.js";
import {rollDice} from "./dice.js";

const displayResults = document.querySelector(".results");
const searchButton = document.querySelector(".search-button");
const searchInput = document.getElementById("search");

const context = "add-list";
const encounterList = document.querySelector("#encounter-list");
const clearButton = document.getElementById("clear");
const addPlayer = document.getElementById("add-player");
const form = document.querySelector("form");

const diceForm = document.querySelector(".dice-selector");
const diceButton = document.getElementById("roll");
const rollHistory = document.querySelector(".roll-history")
const clearRolls = document.getElementById("clear-rolls");

searchInput.addEventListener("input", async (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
  }
  const category = document.getElementById("category").value;
  const query = searchInput.value;
  if (query != null && query != "") {
    getDataByQuery(category, query, displayResults, context);
  } else {
    getDataGeneral(category, displayResults, context);
  }
});

searchButton.addEventListener("click", async (e) => {
  e.preventDefault();
  const category = document.getElementById("category").value;
  await getDataGeneral(category, displayResults, context);
});

// Listens for add-to-list button click
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("add-list-button")) {
    addToList(e.target);
  }
});

// Adds monster to encounter list
function addToList(button) {
  if (encounterList.querySelector("#default-message")) {
    encounterList.querySelector("#default-message").remove();
  }
  let name;
  if (button.parentElement.parentElement.classList.contains("expanded")) {
    name = button.parentElement.querySelector("p").innerText;
  } else {
    name = button.parentElement.parentElement.querySelector("p").innerText;
  }

  const monsterCard = document.createElement("div");
  monsterCard.classList.add("monster-card");
  const outerCard = document.createElement("div");
  monsterCard.innerHTML = `
  <p>${name}</p>
  <p>Init: ${rollDice(20, 1, 0).total}</p>
  `;
  outerCard.appendChild(monsterCard);
  encounterList.appendChild(outerCard);
}

// Clears encounter list
clearButton.addEventListener("click", (e)=>{
  encounterList.innerHTML = '<p id="default-message">Your encounter will appear here!</p>';
});

// Adds player to encounter list
addPlayer.addEventListener("click", (e)=>{
  const container = document.createElement("div");
  const card = document.createElement("div");
  card.classList.add("monster-card");
  const playerName = form.elements["char-name"].value;
  const playerInit = form.elements["init"].value;
  const playerAc = form.elements["ac"].value;
  card.innerHTML = `
    <p>${playerName}</p>
    <p>Init: ${playerInit} | AC ${playerAc}</p>
  `;
  container.appendChild(card);
  encounterList.appendChild(container);
})

// Rolls Dice
diceButton.addEventListener("click", (e)=>{
  const number = diceForm.elements["num-dice"].value;
  const sides = diceForm.elements["dice-type"].value;
  const modifier = diceForm.elements["modifier"].value;
  const result = rollDice(sides, number, modifier.toInt);
  console.log(result);
  const container = document.createElement("div");
  const card = document.createElement("div");
  card.classList.add("monster-card");
  card.innerHTML = `
    <p>Roll: ${number}d${sides} + ${modifier}</p>
    <p>Result: ${result.total}</p>
  `;
  container.appendChild(card);
  rollHistory.appendChild(container);
});

// Clears roll history
clearRolls.addEventListener("click", (e)=>{
  rollHistory.innerHTML = "";
});