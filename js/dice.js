import { setLocalStorage } from "./localStorage.js";

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
export function rollDice(sides, number = 1, advantage = "none", modifier = 0) {
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
    if (advantage === "adv" || advantage === "disadv") {
      const r2 = Math.floor(Math.random() * sides) + 1;

      if (advantage === "adv") {
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
  console.log(results);
  return results;
}



// Specifically rolls dice for a stat generator
export function rollStats(){
    let stats = [];
    for (let i = 0; i<6; i++){
        // Roll 4d6
        let rolls = rollDice(6,4);
        // Sort rolls ascending
        let roll = rolls["rolls"].sort();
        // Drop lowest roll
        roll.shift();
        // Sum remaining rolls and add to stat array
        stats.push(roll.reduce((a,b)=>a+b));
    }
    setLocalStorage("current-char-scores", stats);
    return stats;
}

// Specifically calculates ability modifiers for stat scores
export function calculateModifier(score){
        let mod = Math.floor((score - 10) / 2);
        if(mod >= 0){
            return "+" + mod;
        }else{
            return mod;
        }
}
