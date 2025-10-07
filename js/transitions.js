// Mobile Menu Toggle Animation
const hamButton = document.querySelector("#hamburger");
const navigation = document.querySelector(".category-nav");

hamButton.addEventListener("click", () => {
  navigation.classList.toggle("open");
  hamButton.classList.toggle("open");
});

