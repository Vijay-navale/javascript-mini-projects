const domSelectors = {
    form: '#form',
    text: '#text',
    amount: '#amount',
    list: '#list',
    inc: '#money-plus',
    exp: '#money-minus',
    balance: '#balance',
};

const form = document.querySelector(domSelectors.form);
const text = document.querySelector(domSelectors.text);
const amount = document.querySelector(domSelectors.amount);
let list = document.querySelector(domSelectors.list);
const inc = document.querySelector(domSelectors.inc);
const exp = document.querySelector(domSelectors.exp);
const balance = document.querySelector(domSelectors.balance);

//updating UI
const transactionHistoryComponent = (transactionData) => {
    const { description, amount, id } = transactionData;
    const transactionSign = amount > 0 ? 'plus' : 'minus';

    listItem = document.createElement('li');
    listItem.classList.add(transactionSign);
    listItem.innerHTML = `
            ${description} <span>${
        amount > 0 ? '+' : ''
    }${amount}</span><button class="delete-btn" onclick="removeTran(${id})">x</button>     
    `;
    list.appendChild(listItem);
};

const incExpComponent = (transactionsArr) => {
    const amountsArr = transactionsArr.map(({ amount }) => amount);

    let incPlus = 0;
    let expMinus = 0;

    amountsArr.forEach((amount) => {
        if (amount >= 0) {
            incPlus += amount;
        } else {
            expMinus += amount;
        }
    });

    inc.textContent = `$${incPlus.toFixed(2)}`;
    exp.textContent = `$${-expMinus.toFixed(2)}`;

    const total = incPlus - -expMinus;
    balance.textContent = `$${total.toFixed(2)}`;
};

//fetching data initially
const fetchTransactions = () => {
    list.innerHTML = '';
    const transactionsArr = JSON.parse(localStorage.getItem('transactionsArr'));
    if (transactionsArr !== null) {
        transactionsArr.forEach((transactionData) => {
            transactionHistoryComponent(transactionData);
        });
        incExpComponent(transactionsArr);
    }
};
fetchTransactions();

//removing transaction
const removeTran = (id) => {
    let transactionsArr = JSON.parse(localStorage.getItem('transactionsArr'));

    transactionsArr = transactionsArr.filter(
        (transaction) => transaction.id !== id
    );

    localStorage.setItem('transactionsArr', JSON.stringify(transactionsArr));

    fetchTransactions();
};

const updateTransactions = (transactionData) => {
    //setting localstorage
    let transactionsArr = JSON.parse(localStorage.getItem('transactionsArr'));
    if (transactionsArr !== null) {
        transactionsArr.push(transactionData);
        localStorage.setItem(
            'transactionsArr',
            JSON.stringify(transactionsArr)
        );
    } else {
        let transactionsArr = [];
        transactionsArr.push(transactionData);
        localStorage.setItem(
            'transactionsArr',
            JSON.stringify(transactionsArr)
        );
    }

    //getting newest array
    transactionsArr = JSON.parse(localStorage.getItem('transactionsArr'));

    //setting history component UI
    transactionHistoryComponent(transactionData);

    //setting incExp component UI
    incExpComponent(transactionsArr);
};

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const id = Math.floor(Math.random() * 100000000);
    if (text.value.trim() !== '' && amount.value !== '') {
        //creating object to accumulate data
        const transactionData = {
            description: text.value.trim(),
            amount: +amount.value,
            id: id,
        };

        //clearing input fields
        text.value = '';
        amount.value = '';

        updateTransactions(transactionData);
    } else {
        alert('Please enter text and amount');
    }
});
