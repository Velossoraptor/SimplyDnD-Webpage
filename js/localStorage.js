// Read data from local storage
export function getLocalStorage(key) {
  const data = localStorage.getItem(key); // get the data in the key
  try {
    // try to parse the data...if none is found, return an empty array
    const parsed = data ? JSON.parse(data) : [];
    return Array.isArray(parsed) ? parsed : []; // return parsed data if it's an array
  } catch {
    return [];
  }
}

// Save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// Saves a character to local storage
export function saveCharacter(
  name,
  race,
  charClass,
  background,
  level,
  hp,
  scores = [],
) {
  const characters = getLocalStorage("characters") || [];
  const newCharacter = {
    name: name,
    race: race,
    class: charClass,
    background: background,
    level: level,
    hp: hp,
    scores: scores,
  };
  characters.push(newCharacter);
  setLocalStorage("characters", characters);
  console.log("character added");
}

// Saves an encounter to localstorage
export function saveEncounter(level, size, number, monsters = []){
    const encounters = getLocalStorage("encounters") || [];
    const newEncounter = {
        level: level,
        size: size,
        numberMonsters: number,
        monsters: monsters
    }
    encounters.push(newEncounter);
    setLocalStorage("encounters", encounters);
    console.log("encounter added");
}

// Saves an init to localstorage
export function saveInitiative(initOrder){
    const initiatives = getLocalStorage("initiatives") || [];
    const newInit = initOrder;
    initiatives.push(newInit);
    setLocalStorage("initiatives", initiatives);
}


//To be implemented if I have time, sorry graders :P
// export function saveClass(){

// }

// export function saveFeature(){

// }

// export function saveSpell(){

// }

// export function saveRace(){

// }

// export function saveMonster(){

// }
