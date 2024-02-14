// [9,1,4,7,3,-1,0,5,8,-1,6]
const cellsWrapper = document.getElementById("cellsWrapper");
const gameResult = document.getElementById("gameResult");
const resetBtn = document.getElementById("resetBtn");

let currentPlayer = "x";
let grid = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

for (let i = 0; i <= 2; i++) {
  for (let j = 0; j <= 2; j++) {
    const button = document.createElement("button");
    button.dataset.x = i;
    button.dataset.y = j;
    cellsWrapper.appendChild(button);
  }
}

const isRowWinner = (row) => {
  if (grid[row].every((el) => el === currentPlayer)) {
    return true;
  }
};

const isColWinner = (col) => {
  let arr = [];
  for (let j = 0; j <= 2; j++) {
    arr.push(grid[j][col]);
  }
  if (arr.every((el) => el === currentPlayer)) {
    return true;
  }
};

const isDiagonalWinner = () => {
  let arr = [grid[0][0], grid[1][1], grid[2][2]];
  if (arr.every((el) => el === currentPlayer)) {
    return true;
  }
};

const isDiagonalReverseWinner = () => {
  let arr = [grid[0][2], grid[1][1], grid[2][0]];
  if (arr.every((el) => el === currentPlayer)) {
    return true;
  }
};

const isGameDraw = () => {
  let isGameOverFlag = true;
  for (let gridArr of grid) {
    if (gridArr.some((el) => el === null)) {
      isGameOverFlag = false;
      break;
    }
  }
  return isGameOverFlag;
};

cellsWrapper.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    if (e.target.textContent) return;
    const { x, y } = e.target.dataset;
    e.target.textContent = currentPlayer;
    grid[x][y] = currentPlayer;
    console.log(grid);
    if (
      isRowWinner(0) ||
      isRowWinner(1) ||
      isRowWinner(2) ||
      isColWinner(0) ||
      isColWinner(1) ||
      isColWinner(2) ||
      isDiagonalWinner() ||
      isDiagonalReverseWinner()
    ) {
      gameResult.textContent = `Winner is ${currentPlayer}`;
      resetBtn.classList.add("active");
      cellsWrapper.style.pointerEvents = "none";
      return;
    }
    if (isGameDraw()) {
      gameResult.textContent = `Game is draw`;
      resetBtn.classList.add("active");
      cellsWrapper.style.pointerEvents = "none";
      return;
    }
    currentPlayer = currentPlayer === "x" ? "o" : "x";
  }
});

resetBtn.addEventListener("click", () => {
  cellsWrapper.style.pointerEvents = "auto";
  grid = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];
  currentPlayer = "x";
  resetBtn.classList.remove("active");
  gameResult.textContent = "";
  for (let el of cellsWrapper.children) {
    el.textContent = "";
  }
});
