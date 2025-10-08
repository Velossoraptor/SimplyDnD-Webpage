export function rollDice(sides, number, modifier = 0) {
    const results = {
        "rolls": [],
        "total": 0,
        "modifier": modifier
    }
  for (let i = 0; i < number; i++) {
    const roll = Math.floor(Math.random() * sides) + 1;
    results["rolls"].push(roll);
    results.total += roll;
  }
  results["total"] += modifier;
  return results;
}

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
    return stats;
}

export function calculateModifier(score){
        let mod = Math.floor((score - 10) / 2);
        if(mod >= 0){
            return "+" + mod;
        }else{
            return mod;
        }
}
