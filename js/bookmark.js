import { getLocalStorage, setLocalStorage } from './localStorage.js';
let characters = getLocalStorage('characters') || [];
let encounters = getLocalStorage('encounters') || [];
let initiatives = getLocalStorage('initiatives') || [];
const results = document.querySelector('.results');

const download = document.querySelector('.download');
// Implement if I have time
// const importBookmarks = document.querySelector(".import");

const category = document.querySelector('#category');
// const searchButton = document.querySelector('.search-button');

displayResults('none');
let monsterCards = document.querySelectorAll('.monster-card');
monsterCards.forEach((monster) => {
  monster.classList.add('bookmark-card');
});

category.addEventListener('input', (e) => {
  characters = getLocalStorage('characters') || [];
  encounters = getLocalStorage('encounters') || [];
  initiatives = getLocalStorage('initiatives') || [];
  results.innerHTML = '';
  displayResults(category.value);
  if (results.innerHTML == '') {
    results.innerHTML = `<p>No Bookmarks Yet!</p>`;
  }
  monsterCards = document.querySelectorAll('.monster-card');
  monsterCards.forEach((monster) => {
    monster.classList.add('bookmark-card');
  });
});
// searchButton.addEventListener('click', (e) => {
//   characters = getLocalStorage('characters') || [];
//   encounters = getLocalStorage('encounters') || [];
//   initiatives = getLocalStorage('initiatives') || [];
//   results.innerHTML = '';
//   displayResults(category.value);
//   if (results.innerHTML == '') {
//     results.innerHTML = `<p>No Bookmarks Yet!</p>`;
//   }
//   monsterCards = document.querySelectorAll('.monster-card');
//   monsterCards.forEach((monster) => {
//     monster.classList.add('bookmark-card');
//   });
// });

document.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete')) {
    const objCategory =
      e.target.parentElement
        .querySelector('div')
        .querySelector('h3')
        .textContent.toLowerCase() + 's';
    const items = getLocalStorage(objCategory);
    const index = e.target.parentElement.id;
    items.splice(index[index.length - 1], 1);
    console.log(items);
    setLocalStorage(objCategory, items);
    e.target.parentElement.remove();
  }
});

function displayResults(searchCategory) {
  if (searchCategory == 'characters') {
    displayChar();
  } else if (searchCategory == 'encounters') {
    displayEncounter();
  } else if (searchCategory == 'init') {
    displayInit();
  } else if (searchCategory == 'none') {
    displayChar();
    displayEncounter();
    displayInit();
  }
}

function displayChar() {
  let i = 0;
  characters.forEach((character) => {
    const HTML = `
            <div>
                <h3>Character</h3>
                <p>Name: ${character.name}</p>
                <p>Race: ${character.race} | Class: ${character.class} | Level: ${character.level}</p>
                <p>Background: ${character.background} | HP: ${character.hp}</p>
            </div>
            <button class="delete">X</button>
        `;
    const container = document.createElement('div');
    container.innerHTML = HTML;
    container.classList.add('monster-card');
    container.id = `characters-${i}`;
    i++;
    results.appendChild(container);
  });
}

function displayEncounter() {
  let i = 0;
  encounters.forEach((encounter) => {
    const list = encounter.monsters
      .map((monster) => `<li>${monster}</li>`)
      .join('');
    const HTML = `
            <div>
                <h3>Encounter</h3>
                <p>Party Level: ${encounter.level} | Party Size: ${encounter.size} | Number of Monsters: ${encounter.numberMonsters}</p>
                <p>Monsters: 
                <ul>
                ${list}
                </ul>
                </p>
            </div>
            <button class="delete">X</button>
        `;
    const container = document.createElement('div');
    container.innerHTML = HTML;
    container.classList.add('monster-card');
    container.id = `characters-${i}`;
    i++;
    results.appendChild(container);
  });
}

function displayInit() {
  let i = 0;
  initiatives.forEach((initiative) => {
    const list = initiative
      .map((combatant) => {
        let ac = '';
        if (combatant.ac) {
          ac = `| AC: ${combatant.ac} `;
        }
        return `
        <li>Name: ${combatant.name} ${ac}| Init: ${combatant.init}</li>
        `;
      })
      .join('');
    const HTML = `
        <div>
            <h3>Initiative</h3>
            <ul>
                ${list}
            </ul>
        </div>
        <button class="delete">X</button>
        `;
    const container = document.createElement('div');
    container.innerHTML = HTML;
    container.classList.add('monster-card');
    container.id = `characters-${i}`;
    i++;
    results.appendChild(container);
  });
}

function downloadTextFile(filename, text) {
  const blob = new Blob([text], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url); // Clean up the URL object
}

download.addEventListener('click', (e) => {
  const data = {
    characters: getLocalStorage('characters') || [],
    encounters: getLocalStorage('encounters') || [],
    initiatives: getLocalStorage('initiatives') || [],
  };

  // Turn the object into a formatted JSON string
  const jsonText = JSON.stringify(data, null, 2);

  downloadTextFile('SimplyDnDBookmarks.txt', jsonText);
});
