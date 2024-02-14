import { suggestionsList } from "./list.js";

const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");
const inputWrapper = document.getElementById("inputWrapper");
const remove = document.getElementById("remove");
let cursorOnSuggestion = false;
let typedInputVal = "";
let index = -1;

const searchSuggestions = (e) => {
  searchResults.innerHTML = "";
  const { value } = e.target;
  if (!value.trim()) return;
  remove.style.display = "initial";
  typedInputVal = value;
  const list = suggestionsList.filter((countryName) =>
    countryName.toLowerCase().startsWith(value.toLowerCase())
  );
  list.slice(0, 5).forEach((countryName) => {
    const el = document.createElement("div");
    el.textContent = countryName;
    el.style.cursor = "pointer";
    el.className = "suggestion";
    searchResults.appendChild(el);
  });
};

const handleKeyUpDown = (e) => {
  const results = Array.from(searchResults.children);

  if (!results.length) return;

  if (e.key === "ArrowDown") {
    index++;
    for (let i = 0; i < results.length; i++) {
      if (i === index) {
        results[i].className = "highlight";
      } else {
        results[i].className = "";
      }
    }
  }
  if (e.key === "Enter") {
    console.log(searchResults.children);
  }
  if (e.key === "ArrowUp") {
    console.log(searchResults.children);
  }
};

const onFoucsOut = () => {
  if (cursorOnSuggestion) return;
  while (searchResults.firstChild) {
    searchResults.removeChild(searchResults.lastChild);
  }
};

const onSuggestionClick = (e) => {
  searchInput.value = e.target.textContent;
  cursorOnSuggestion = false;
  onFoucsOut();
};

searchResults.addEventListener("click", onSuggestionClick);
searchResults.addEventListener("mousemove", () => {
  cursorOnSuggestion = true;
});
searchResults.addEventListener("mouseout", () => {
  cursorOnSuggestion = false;
});

searchInput.addEventListener("input", searchSuggestions);
searchInput.addEventListener("focusout", onFoucsOut);
searchInput.addEventListener("keydown", handleKeyUpDown);

inputWrapper.addEventListener("mousemove", () => {
  if (!!searchInput.value.trim()) {
    remove.style.display = "initial";
  }
});
inputWrapper.addEventListener("mouseout", () => {
  remove.style.display = "none";
});
remove.addEventListener("click", () => {
  searchInput.value = "";
  remove.style.display = "none";
});
