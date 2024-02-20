const displayCount = document.getElementById("displayCount");
const btnsWrapper = document.getElementById("btnsWrapper");
const minMSB = document.getElementById("minMSB");
const minLSB = document.getElementById("minLSB");
const secMSB = document.getElementById("secMSB");
const secLSB = document.getElementById("secLSB");

const inputEls = [minMSB, minLSB, secMSB, secLSB];
const msbRegex = /^[0-5]$/;
const lsbRegex = /^[0-9]$/;
const msbId = ["minMSB", "secMSB"];
const lsbId = ["minLSB", "secLSB"];
let timerId;

const getRegex = (id) => {
  if (msbId.includes(id)) {
    return msbRegex;
  }
  return lsbRegex;
};

const focusNextInputElement = (target, id) => {
  if (id !== "secLSB") {
    target.nextElementSibling.focus();
    target.nextElementSibling.select();
  }
};

const updateInputValues = (minutes, seconds) => {
  let min = `${minutes}`.length === 1 ? `0${minutes}` : `${minutes}`;
  let sec = `${seconds}`.length === 1 ? `0${seconds}` : `${seconds}`;

  const [minMsbVal, minLsbVal] = min.split("");
  const [secMsbVal, secLsbVal] = sec.split("");

  minMSB.value = minMsbVal;
  minLSB.value = minLsbVal;
  secMSB.value = secMsbVal;
  secLSB.value = secLsbVal;
};

const toggleBtnsDisableState = () => {
  const [start, stop] = btnsWrapper.children;
  start.disabled = !start.disabled;
  stop.disabled = !stop.disabled;
};

const onStartClick = () => {
  if (inputEls.every((el) => !Number(el.value))) {
    return;
  }
  toggleBtnsDisableState();
  let minutes = Number(`${minMSB.value}${minLSB.value}`);
  let seconds = Number(`${secMSB.value}${secLSB.value}`);

  timerId = setInterval(() => {
    if (seconds === 0 && minutes !== 0) {
      seconds = 59;
      minutes--;
      updateInputValues(minutes, seconds);
      return;
    }
    if (seconds === 0 && minutes === 0) {
      clearInterval(timerId);
      const [start, stop] = btnsWrapper.children;
      start.disabled = false;
      stop.disabled = true;
      return;
    }
    seconds--;
    updateInputValues(minutes, seconds);
    return;
  }, 1000);
};

displayCount.addEventListener("click", (e) => {
  if (e.target.tagName.toLowerCase() !== "input") return;
  e.target.select();
});

displayCount.addEventListener("input", (e) => {
  const { data, inputType } = e;
  const { id } = e.target;

  if (inputType === "deleteContentBackward" || data === " ") {
    e.target.value = "0";
    focusNextInputElement(e.target, id);
    return;
  }

  if (getRegex(id).test(data?.trim())) {
    e.target.value = data;
    focusNextInputElement(e.target, id);
    return;
  }

  e.target.value = "0";
  e.target.select();
});

btnsWrapper.addEventListener("click", (e) => {
  if (e.target.tagName.toLowerCase() !== "button") return;

  if (e.target.id === "start") {
    onStartClick();
    return;
  }

  if (e.target.id === "stop") {
    clearInterval(timerId);
    toggleBtnsDisableState();
    return;
  }

  if (e.target.id === "reset") {
    clearInterval(timerId);
    const [start, stop] = btnsWrapper.children;
    start.disabled = false;
    stop.disabled = true;
    inputEls.forEach((el) => {
      el.value = "0";
    });
  }
});
