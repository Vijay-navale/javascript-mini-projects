const progressFill = document.getElementById("progressFill");
const start = document.getElementById("start");
const stop = document.getElementById("stop");
const reset = document.getElementById("reset");
let count = 0.1;
progressFill.style.width = "0%";
let intervalId;

start.addEventListener("click", () => {
  console.log(progressFill.style.width);
  stop.disabled = false;
  start.disabled = true;
  intervalId = setInterval(() => {
    if (progressFill.style.width === "100%") {
      clearInterval(intervalId);
      intervalId = null;
      stop.disabled = true;
      start.disabled = true;
    }
    if (progressFill.style.width === "100%") return;
    progressFill.style.width = `${count}%`;
    count += 0.1;
  }, 1);
});

stop.disabled = true;
stop.addEventListener("click", () => {
  clearInterval(intervalId);
  stop.disabled = true;
  start.disabled = false;
});

reset.addEventListener("click", () => {
  clearInterval(intervalId);
  count = 0.1;
  stop.disabled = true;
  start.disabled = false;
  progressFill.style.width = "0%";
});
