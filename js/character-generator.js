document.querySelector("#roll-stats").addEventListener("click", () => {
  document.querySelectorAll(".score-container").forEach((card, index) => {
    setTimeout(() => {
      card.classList.toggle("is-flipped");
    }, index * 500);
  });
});
