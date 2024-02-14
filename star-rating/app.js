const starWrapper = document.getElementById("starWrapper");
let starRating = 0;

starWrapper.addEventListener("mouseover", (e) => {
  const starIndex = e.target.dataset.index;
  if (starIndex) {
    Array.from(starWrapper.children).forEach((starEl, index) => {
      if (index + 1 <= Number(starIndex)) {
        starEl.classList.add("star-filled");
        starEl.classList.remove("star-empty");
      } else {
        starEl.classList.remove("star-filled");
        starEl.classList.add("star-empty");
      }
    });
  }
});

starWrapper.addEventListener("mouseleave", () => {
  Array.from(starWrapper.children).forEach((starEl, index) => {
    if (index + 1 <= Number(starRating)) {
      starEl.classList.add("star-filled");
      starEl.classList.remove("star-empty");
    } else {
      starEl.classList.remove("star-filled");
      starEl.classList.add("star-empty");
    }
  });
});

starWrapper.addEventListener("click", (e) => {
  const index = e.target.dataset.index;
  if (index) {
    starRating = Number(index);
  }
});
