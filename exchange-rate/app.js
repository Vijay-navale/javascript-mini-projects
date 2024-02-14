const currOneSelect = document.getElementById('currency-one');
const currTwoSelect = document.getElementById('currency-two');
const swap = document.getElementById('swap');
let ratesObj;
let temporaryStore, tempOneVal, tempTwoVal;

//getting exchange rate for currTwoSelect.value
const rateConverter = (currTwoVal) => {
    console.log(currTwoSelect.value, currTwoVal);
};

//swapping currencies
const swapCurr = () => {
    temporaryStore = currOneSelect.value;
    currOneSelect.value = currTwoSelect.value;
    currTwoSelect.value = temporaryStore;
    console.log(currOneSelect.value, currTwoSelect.value);
    console.log(tempTwoVal, tempOneVal);
};

//fetching other countries currencies
const fetchCurrency = (currency_one) => {
    fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`)
        .then((data) => data.json())
        .then((data) => {
            ratesObj = data.rates;
            console.log(ratesObj);
            rateConverter(ratesObj[currTwoSelect.value]);
            tempOneVal = ratesObj[currOneSelect.value]
            tempTwoVal = ratesObj[currTwoSelect.value]
        });
};

//initial fetching
fetchCurrency(currOneSelect.value);


//events
currOneSelect.addEventListener('change', (e) => {
    fetchCurrency(e.target.value);
    // console.log(e.target.value);
});

currTwoSelect.addEventListener('change', (e) => {
    rateConverter(ratesObj[e.target.value]);
});

swap.addEventListener('click', swapCurr);
