// Mobile Menu Toggle Animation
const hamButton = document.querySelector("#hamburger");
const navigation = document.querySelector(".category-nav");

hamButton.addEventListener("click", () => {
  navigation.classList.toggle("open");
  hamButton.classList.toggle("open");
});

// Card Flip animation when Stats are rolled
if (document.querySelector("#roll-stats") !== null) {
  document.querySelector("#roll-stats").addEventListener("click", () => {
    document.querySelectorAll(".score-container").forEach((card, index) => {
      setTimeout(() => {
        card.classList.toggle("is-flipped");
      }, index * 500);
    });
  });
}
