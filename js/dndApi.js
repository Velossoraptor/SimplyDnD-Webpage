const url = "https://www.dnd5eapi.co/api/2014/";

// async function getData(category, query = "") {
//   try {
//     const lowerQuery = query.toLowerCase().replace(" ", "-");
//     const response = await fetch(url + category + "/" + lowerQuery);
//     if (response.ok) {
//       const data = await response.json();
//       return data;
//     } else if (response.status === 404) {
//       return `No results found for ${category}/${lowerQuery} - what you're looking for might not exist.`;
//     } else if (response.status === 500) {
//       return `Server error - try again later.`;
//     } else {
//       throw Error(await response.text());
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }

// Gets name of all the data in the selected category
export async function getDataGeneral(category, displayResults) {
  try {
    const response = await fetch(url + category);
    if (response.ok) {
      const data = await response.json();
      displayDataGeneral(data.results, category, displayResults);
    } else if (response.status === 404) {
      displayResults.innerHTML = `<p>No results found for ${category} - what you're looking for might not exist.</p>`;
    } else if (response.status === 500) {
      displayResults.innerHTML = `<p>Server error - try again later.</p>`;
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.log(error);
  }
}

// Displays the name of all the data in the selected category and adds a toggle to show details or back to basics
function displayDataGeneral(results, category, displayResults) {
  displayResults.innerHTML = "";

  results.forEach((item) => {
    const card = document.createElement("div");
    card.innerHTML = `<div class="monster-card">
              <p>${item.name}</p>
              <button class="bookmark-button">➕</button>
            </div>`;
    displayResults.appendChild(card);

    card.addEventListener("click", async (e) => {
      console.log(item.name + "expanded details");
      if (card.classList.contains("expanded")) {
        card.innerHTML = `
              <p>${item.name}</p>
              <button class="bookmark-button">➕</button>
            `;
      } else {
        await getDataDetails(category, item.index, card);
      }
      card.classList.toggle("expanded");
    });
  });
}

// Gets the details of the selected item in the selected category
export async function getDataDetails(category, query, displayCard) {
  try {
    const lowerQuery = query.toLowerCase().replace(" ", "-");
    const response = await fetch(url + category + "/" + lowerQuery);
    if (response.ok) {
      const data = await response.json();
      displayDataDetails(data, category, displayCard);
    } else if (response.status === 404) {
      displayCard.innerHTML = `<p>No results found for ${category}/${lowerQuery} - what you're looking for might not exist.</p>`;
    } else if (response.status === 500) {
      displayCard.innerHTML = `<p>Server error - try again later.</p>`;
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.log(error);
  }
}

// Displays the details of the selected item in the selected category
function displayDataDetails(data, category, displayCard) {
  displayCard.innerHTML = "";
  if (category === "monsters") {
    displayCard.innerHTML = `
    <div>
        <p>${data.name}</p>
        <p>${data.size} ${data.type} | CR ${data.challenge_rating} | AC ${data.armor_class.value} | XP ${data.xp}</p>
        <p>HP: ${data.hit_points} | Speed: Walk ${data.speed.walk}</p>
    <div>
    <button class="bookmark-button">➕</button>
    `;
  } else if (category === "spells") {
    let conc = "";
    if (data.concentration) {
      conc = "✔";
    } else {
      conc = "✘";
    }
    let attack = "";
    if (data.attack_type != null) {
      attack =
        data.attack_type.charAt(0).toUpperCase() + data.attack_type.slice(1);
    }
    displayCard.innerHTML = `
    <div>
        <<p>${data.name}</p>
        <p>${attack} ${data.school.name} | Level ${data.level} | Duration ${data.duration} | C ${conc}</p>
        <p>"${data.desc}"</p>
    </div>
    <button class="bookmark-button">➕</button>
    `;
  } else if (category === "features") {
    displayCard.innerHTML = `
    <div>
        <p>${data.name}</p>
        <p>${data.class.name} | Level ${data.level}</p>
        <p>"${data.desc}"</p>
    </div>
    <button class="bookmark-button">➕</button>
    `;
  } else if (category === "races") {
    const details = [
      data.alignment,
      data.age,
      data.size_description,
      data.language_desc,
      data.starting_proficiency_options?.desc,
    ].filter(Boolean);

    displayCard.innerHTML = `
    <div>
        <p>${data.name}</p>
        <p>Speed ${data.speed} | ${data.size}</p>
        <p>"${details.join("<br><br>")}"</p>
    </div>
    <button class="bookmark-button">➕</button>
    `;
  } else if (category === "classes") {
    displayCard.innerHTML = `
    <div>
        <p>${data.name}</p>
        <p>Hit Die: ${data.hit_die}</p>
        <p>Proficiencies: ${data.proficiency_choices[0].desc}</p>
        <p>Starting Equipment: ${data.starting_equipment_options[0].desc}</p>
    </div>
    <button class="bookmark-button">➕</button>
    `;
  }
  displayCard.classList.add("monster-card");
}

// Gets the details of items that fit the query in the selected category
export async function getDataByQuery(category, query, displayResults) {
  try {
    const lowerQuery = query.toLowerCase().replace(" ", "-");
    const response = await fetch(url + category);
    if (response.ok) {
      const data = await response.json();
      const results = data.results;
      const matchingResults = results.filter((item) =>
        item.index.includes(lowerQuery),
      );

      if (matchingResults.length === 0) {
        displayResults.innerHTML = `<p>No matches found.</p>`;
        return;
      }

      displayDataGeneral(matchingResults, category, displayResults);
    } else if (response.status === 404) {
      displayResults.innerHTML = `<p>No results found for ${category}/${lowerQuery} - what you're looking for might not exist.</p>`;
    } else if (response.status === 500) {
      displayResults.innerHTML = `<p>Server error - try again later.</p>`;
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.log(error);
  }
}
