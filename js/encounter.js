import { getDataGeneral, getDataByQuery, getRandomMonsters } from './dndApi.js';
import {
  getLocalStorage,
  setLocalStorage,
  saveEncounter,
} from './localStorage.js';

const displayResults = document.querySelector('.results');
// const searchButton = document.querySelector('.search-button');
const searchInput = document.getElementById('search');

const context = 'add-list';
const encounterList = document.querySelector('#encounter-list');
const clearButton = document.getElementById('clear');
const randomButton = document.getElementById('random-encounter');
const form = document.querySelector('form');

const saveEncounterButton = document.querySelector('.save');
getDataGeneral('monsters', displayResults, context);

// Listens for input in the search bar and fetches based on data
searchInput.addEventListener('input', async (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
  }
  const category = document.getElementById('category').value;
  const query = searchInput.value;
  if (query != null && query != '') {
    getDataByQuery(category, query, displayResults, context);
  } else {
    getDataGeneral(category, displayResults, context);
  }
});

// Listens for search button click and fetches based on data
// searchButton.addEventListener('click', async (e) => {
//   e.preventDefault();
//   const category = document.getElementById('category').value;
//   await getDataGeneral(category, displayResults, context);
// });

// Listens for add-to-list button click
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('add-list-button')) {
    addToList(e.target);
  }
});

// Adds monster to encounter list
function addToList(button) {
  if (encounterList.querySelector('#default-message')) {
    encounterList.querySelector('#default-message').remove();
  }
  let name;
  if (button.parentElement.parentElement.classList.contains('expanded')) {
    name = button.parentElement.querySelector('p').innerText;
  } else {
    name = button.parentElement.parentElement.querySelector('p').innerText;
  }
  const currentEncounter = getLocalStorage('current-encounter-monsters');
  currentEncounter.push(name);
  setLocalStorage('current-encounter-monsters', currentEncounter);
  const monsterCard = document.createElement('div');
  monsterCard.classList.add('monster-card');
  const outerCard = document.createElement('div');
  monsterCard.innerHTML = name;
  outerCard.appendChild(monsterCard);
  encounterList.appendChild(outerCard);
}

// Clears encounter list
clearButton.addEventListener('click', (e) => {
  encounterList.innerHTML =
    '<p id="default-message">Your encounter will appear here!</p>';
  setLocalStorage('current-encounter-monsters', []);
});

// Generates random encounter
randomButton.addEventListener('click', async (e) => {
  if (form.elements['num-mon'].value <= 100) {
    const number = form.elements['num-mon'].value;
    await getRandomMonsters(number, encounterList, context);
  }else {
    alert('Too many Monsters! (Limit 100)');
  }
});

// Saves encounter
saveEncounterButton.addEventListener('click', (e) => {
  const level = form.elements['level'].value;
  const size = form.elements['size'].value;
  const number = form.elements['num-mon'].value;
  const monsters = getLocalStorage('current-encounter-monsters');
  saveEncounter(level, size, number, monsters);
});
