const charctersData = {
  lowerCase: [...Array(26)].map((_, i) =>
    String.fromCharCode(i + 65).toLowerCase()
  ),
  upperCase: [...Array(26)].map((_, i) => String.fromCharCode(i + 65)),
  numbers: [...Array(10)].map((_, i) => String.fromCharCode(i + 48)),
  symbols: [...Array(15)].map((_, i) => String.fromCharCode(i + 33)),
};

const inputsWrapper = document.getElementById("inputsWrapper");
const generate = document.getElementById("generate");
const charLengthRange = document.getElementById("charLengthRange");
const charLength = document.getElementById("charLength");
const passwordText = document.getElementById("passwordText");

let selectedCheckbox = ["lowerCase"];

const setCharLengthText = (text) => {
  charLength.textContent = `Character length ${text}`;
};
setCharLengthText(charLengthRange.value);

const isCheckboxChecked = (id) => {
  return selectedCheckbox.includes(id);
};

const removeSelection = (id) => {
  selectedCheckbox = selectedCheckbox.filter((selectedId) => selectedId !== id);
};

const onInputsWrapperClick = (e) => {
  const { tagName, id } = e.target;
  if (tagName !== "INPUT") return;

  if (!isCheckboxChecked(id)) {
    selectedCheckbox.push(id);
    e.target.checked = true;
    return;
  }
  if (selectedCheckbox?.length > 1) {
    e.target.checked = false;
    removeSelection(id);
    return;
  }
  e.target.checked = true;
};

const onGenerateBtnClick = () => {
  let str = "";
  for (let i = 0; i < charLengthRange.value; i++) {
    const getIndex = Math.floor(Math.random() * selectedCheckbox.length);
    const key = selectedCheckbox[getIndex];
    const charIndex = Math.floor(Math.random() * charctersData[key].length);
    const char = charctersData[key][charIndex];
    str += char;
  }
  passwordText.value = str;
};

const onCharLengthRange = (e) => {
  setCharLengthText(e.target.value);
};

inputsWrapper.addEventListener("click", onInputsWrapperClick);
generate.addEventListener("click", onGenerateBtnClick);
charLengthRange.addEventListener("change", onCharLengthRange);
