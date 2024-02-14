const time = document.getElementById('time');
const text = document.getElementById('text');
const word = document.getElementById('word');
const score = document.getElementById('score');
const difficultySelect = document.getElementById('difficulty');
const endContainer = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');

let timeCount = 10;
let scoreCount = 0;
//list of words
const words = [
    'sigh',
    'tense',
    'airplane',
    'ball',
    'pies',
    'juice',
    'warlike',
    'bad',
    'north',
    'dependent',
    'steer',
    'silver',
    'highfalutin',
    'superficial',
    'quince',
    'eight',
    'feeble',
    'admit',
    'drag',
    'loving',
];

//setLS
const setLS = (difficultyVal) => {
    localStorage.setItem('difficulty', JSON.stringify(difficultyVal));
};
if (JSON.parse(localStorage.getItem('difficulty')) === null) {
    setLS(difficultySelect.value);
} else {
    difficultySelect.value = JSON.parse(localStorage.getItem('difficulty'));
}

//random number and on the initial load set word
const generateRandomNum = () => {
    return Math.floor(Math.random() * words.length);
};
word.textContent = words[generateRandomNum()];

//gameOver
const gameOver = () => {
    endContainer.innerHTML = `
    <h1>Time ran out</h1>
    <p>Your final score is ${scoreCount}</p>
    <button onclick="location.reload()">Reload</button>
`;
    endContainer.style.display = 'flex';
    clearInterval(timeInterval);

}

//reducing time accordingly
const timeInterval = setInterval(() => {
    if (timeCount !== 0) {
        timeCount--;
        time.innerHTML = `${timeCount}s`;
    } else {
        gameOver()
    }
}, 1000);

const setTimeCount = () => {
    //typing word to check if it is correct and if it is then incrementing score
    const difficultyLevel = JSON.parse(localStorage.getItem('difficulty'));
    switch (difficultyLevel) {
        case 'easy':
            timeCount += 5;
            break;
        case 'medium':
            timeCount += 3;
            break;
        case 'hard':
            timeCount += 1;
    }
};

//typing word
const typingWord = (e) => {
    if (e.target.value === word.textContent) {
        setTimeCount();
        score.textContent = ++scoreCount;
        e.target.value = '';
        word.textContent = words[generateRandomNum()];
    }
};

//listeners
text.addEventListener('input', typingWord);
difficultySelect.addEventListener('change', (e) => {
    setLS(e.target.value);
});
// Settings btn click
settingsBtn.addEventListener('click', () => settings.classList.toggle('hide'));
