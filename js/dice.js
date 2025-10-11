import { setLocalStorage } from './localStorage.js';

// Rolls a dice with a number of sides, a number of times, and adds the modifier
// export function rollDice(sides, number, advantage, modifier = 0) {
//     const results = {
//         "rolls": [],
//         "total": 0,
//         "modifier": modifier,
//         "adv": advantage
//     }
//   for (let i = 0; i < number; i++) {
//     const roll = Math.floor(Math.random() * sides) + 1;
//     results["rolls"].push(roll);
//     results.total += roll;
//   }
//   results["total"] += modifier;
//   return results;
// }
export function rollDice(sides, number = 1, advantage = 'none', modifier = 0) {
  const results = {
    rolls: [], // each entry can be a single number or an object with both rolls
    total: 0,
    modifier,
    advantage,
  };

  for (let i = 0; i < number; i++) {
    let chosenRoll;
    let rollData;

    const r1 = Math.floor(Math.random() * sides) + 1;
    if (advantage === 'adv' || advantage === 'disadv') {
      const r2 = Math.floor(Math.random() * sides) + 1;

      if (advantage === 'adv') {
        chosenRoll = Math.max(r1, r2);
      } else {
        chosenRoll = Math.min(r1, r2);
      }

      rollData = {
        rolls: [r1, r2],
        chosen: chosenRoll,
      };
    } else {
      chosenRoll = r1;
      rollData = { rolls: [r1], chosen: r1 };
    }

    results.rolls.push(rollData);
    results.total += chosenRoll;
  }

  results.total += modifier;
  // console.log(results);
  return results;
}

// Specifically rolls dice for a stat generator
export function rollStats() {
  let stats = [];

  for (let i = 0; i < 6; i++) {
    // Roll 4d6
    const rolls = rollDice(6, 4);

    // Extract the chosen values from the roll objects
    let chosenRolls = rolls.rolls.map((r) => r.chosen);

    // Sort descending
    chosenRolls.sort((a, b) => b - a);

    // Drop the lowest roll
    chosenRolls.pop();

    // Sum remaining 3 rolls
    const statValue = chosenRolls.reduce((a, b) => a + b, 0);

    // Add score to the stats array
    stats.push(statValue);
  }

  setLocalStorage('current-char-scores', stats);
  return stats;
}

// Specifically calculates ability modifiers for stat scores
export function calculateModifier(score) {
  let mod = Math.floor((score - 10) / 2);
  if (mod >= 0) {
    return '+' + mod;
  } else {
    return mod;
  }
}
