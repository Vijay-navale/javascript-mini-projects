// https://sadanandpai.github.io/frontend-mini-challenges/javascript/assets/
// https://sadanandpai.github.io/frontend-mini-challenges/javascript/assets/2-LbNREVae.jpg
// https://sadanandpai.github.io/frontend-mini-challenges/javascript/assets/3-SrIwCN-U.jpg
// https://sadanandpai.github.io/frontend-mini-challenges/javascript/assets/4-IwShTW20.jpg
// https://sadanandpai.github.io/frontend-mini-challenges/javascript/assets/5-XTj0vlQy.jpg
const imgList = [
  "1-OkPi44L4.jpg",
  "2-LbNREVae.jpg",
  "3-SrIwCN-U.jpg",
  "4-IwShTW20.jpg",
  "5-XTj0vlQy.jpg",
];
const carouselImgWrapper = document.getElementById("carouselImgWrapper");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
prev.disabled = true;
let currentPosition = 0;

prev.addEventListener("click", () => {
  currentPosition--;
  carouselImgWrapper.style.transform = `translate(-${currentPosition}00%)`;
  next.disabled = false;
  if (currentPosition === 0) {
    prev.disabled = true;
  }
});

next.addEventListener("click", () => {
  currentPosition++;
  carouselImgWrapper.style.transform = `translate(-${currentPosition}00%)`;
  prev.disabled = false;
  if (currentPosition === imgList.length - 1) {
    next.disabled = true;
  }
});
const createAndAppendImg = () => {
  for (let imgSrc of imgList) {
    const img = document.createElement("img");
    console.log(img);
    img.classList = "carousel_slide";
    img.src = `https://sadanandpai.github.io/frontend-mini-challenges/javascript/assets/${imgSrc}`;
    carouselImgWrapper.appendChild(img);
  }
};

createAndAppendImg();
