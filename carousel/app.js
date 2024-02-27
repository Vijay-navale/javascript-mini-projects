const imgList = [
  "1-OkPi44L4.jpg",
  "2-LbNREVae.jpg",
  "3-SrIwCN-U.jpg",
  // "4-IwShTW20.jpg",
  // "5-XTj0vlQy.jpg",
];

const carouselImgWrapper = document.getElementById("carouselImgWrapper");
const pagination = document.getElementById("pagination");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const infiniteScroll = document.getElementById("infiniteScroll");
const autoplay = document.getElementById("autoplay");
const autoplayInterval = document.getElementById("autoplayInterval");

prev.disabled = true;
let currentPosition = 0;
let isInfiniteScroll = false;
let timerId;

const updatePagination = () => {
  Array.from(pagination.children).forEach((el, index) => {
    el.classList = currentPosition === index ? "active" : "";
  });
};

const updateBtnsState = () => {
  if (currentPosition === 0) {
    prev.disabled = true;
    return;
  }
  if (currentPosition === imgList.length - 1) {
    next.disabled = true;
    return;
  }
  prev.disabled = false;
  next.disabled = false;
};

const onNextSlide = () => {
  if (currentPosition === imgList.length - 1) {
    currentPosition = 0;
  } else {
    currentPosition++;
  }
  carouselImgWrapper.style.transform = `translate(-${currentPosition}00%)`;
  prev.disabled = false;
  if (currentPosition === imgList.length - 1 && !isInfiniteScroll) {
    next.disabled = true;
  }
  updatePagination();
};

prev.addEventListener("click", () => {
  if (currentPosition === 0) {
    currentPosition = imgList.length - 1;
  } else {
    currentPosition--;
  }
  carouselImgWrapper.style.transform = `translate(-${currentPosition}00%)`;
  next.disabled = false;
  if (currentPosition === 0 && !isInfiniteScroll) {
    prev.disabled = true;
  }
  updatePagination();
});

next.addEventListener("click", onNextSlide);

const autoPlayNextSlide = () => {
  if (currentPosition === imgList.length - 1 && !isInfiniteScroll) return;
  onNextSlide();
  if (!isInfiniteScroll) updateBtnsState();
};

infiniteScroll.addEventListener("change", (e) => {
  if (e.target.checked) {
    next.disabled = false;
    prev.disabled = false;
    isInfiniteScroll = true;
    return;
  }
  isInfiniteScroll = false;
  updateBtnsState();
});

autoplay.addEventListener("change", (e) => {
  if (e.target.checked) {
    autoplayInterval.disabled = false;
    timerId = setInterval(autoPlayNextSlide, Number(autoplayInterval.value));
    return;
  }
  clearInterval(timerId);
});

pagination.addEventListener("click", (e) => {
  if (e.target.tagName !== "SPAN") return;
  const datasetIndex = e.target.dataset.index;
  if (Number(datasetIndex) === currentPosition) return;
  currentPosition = Number(datasetIndex);
  carouselImgWrapper.style.transform = `translate(-${currentPosition}00%)`;
  updatePagination();
  if (!isInfiniteScroll) updateBtnsState();
});

const createAndAppendImg = () => {
  for (let imgSrc of imgList) {
    const img = document.createElement("img");
    img.classList = "carousel_slide";
    img.src = `https://sadanandpai.github.io/frontend-mini-challenges/javascript/assets/${imgSrc}`;
    carouselImgWrapper.appendChild(img);
  }
};

const createAndAppendPagination = () => {
  imgList.forEach((_, index) => {
    const span = document.createElement("span");
    span.classList = currentPosition === index ? "active" : "";
    span.dataset.index = index;
    pagination.appendChild(span);
  });
};

createAndAppendImg();
createAndAppendPagination();
