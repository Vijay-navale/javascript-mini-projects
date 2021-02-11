//all selectors
const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const totalWealthBtn = document.getElementById('calculate-wealth');

//create global empty array and this will be used by all methods
let userDataArr = [];
const urlForMoreResults = 'https://randomuser.me/api/?results=3';
const urlForOneResult = 'https://randomuser.me/api/';

//get random number on each call
const randomNumber = () => {
    const randomWealth = Math.floor(Math.random() * 1000000);
    return randomWealth;
};

//format money
const formatMoney = (number) => {
    return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
};

//update dom
const updateDom = () => {
    // clear innerHTML of main
    main.innerHTML = `<h2><strong>Person</strong> Wealth</h2>`;

    userDataArr.forEach((userData) => {
        const user = document.createElement('div');
        user.classList.add('person');
        user.innerHTML = `<strong>${userData.name}</strong> ${formatMoney(
            userData.wealth
        )}`;
        main.appendChild(user);
    });
};

//get 3 random persons initially
const getRandomUsers = async () => {
    const data = await fetch(urlForMoreResults);
    const { results } = await data.json();

    results.forEach((result) => {
        const userData = {
            name: `${result.name.title}. ${result.name.first} ${result.name.last}`,
            wealth: randomNumber(),
        };
        userDataArr.push(userData);
    });

    //these will update the dom
    updateDom();
};
getRandomUsers();

//add user
const addUser = async () => {
    const data = await fetch(urlForOneResult);
    const { results } = await data.json();

    const userData = {
        name: `${results[0].name.title}. ${results[0].name.first} ${results[0].name.last}`,
        wealth: randomNumber(),
    };
    userDataArr.push(userData);

    updateDom();
};

console.log(userDataArr);
//double money
const doubleMoney = () => {
    userDataArr.forEach((user) => {
        user.wealth *= 2; //because object are reference type
    });
    updateDom();
    console.log(userDataArr);
};

//show Millionaires
const showMillionaires = () => {
    userDataArr = userDataArr.filter(function (user) {
        return user.wealth >= 1000000;
    });
    updateDom();
};

//sorting by wealth
const sortAccToWealth = () => {
    userDataArr.sort((a, b) => b.wealth - a.wealth);

    updateDom();
};

//calculating total wealth
const totalWealth = () => {
    const totalWealth = userDataArr.reduce((acc, currVal) => {
        return acc + currVal.wealth;
    }, 0);

    const wealthEl = document.createElement('div');
    wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(
        totalWealth
    )}</strong></h3>`;
    main.appendChild(wealthEl)

};

//event listners
addUserBtn.addEventListener('click', addUser);
doubleBtn.addEventListener('click', doubleMoney);
showMillionairesBtn.addEventListener('click', showMillionaires);
sortBtn.addEventListener('click', sortAccToWealth);
totalWealthBtn.addEventListener('click', totalWealth);
