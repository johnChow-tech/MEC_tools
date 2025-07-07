document.addEventListener("DOMContentLoaded", function () {
  const allGrowingTitles = document.querySelectorAll(".titles");
  allGrowingTitles.forEach((growingTitles) => {
    if (growingTitles) {
      growingTitles.addEventListener("mouseenter", () => {
        growingTitles.classList.add("is-grown");
      });
      growingTitles.addEventListener("mouseleave", () => {
        growingTitles.classList.remove("is-grown");
      });
    }
  });
});
