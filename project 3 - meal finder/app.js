const submit = document.getElementById('submit'),
    inputSearch = document.getElementById('search'),
    mealsEl = document.getElementById('meals'),
    resultHeading = document.getElementById('result-heading'),
    randomBtn = document.getElementById('random'),
    singleMeal = document.getElementById('single-meal');

//using fetch and promises
const getMeals = (e) => {
    e.preventDefault();
    const searchQuery = inputSearch.value;
    singleMeal.innerHTML = '';

    const mealByNameURL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`;
    resultHeading.innerHTML = `<h3>Loading...</h3>`;
    if (searchQuery !== '') {
        fetch(mealByNameURL)
            .then((data) => {
                return data.json();
            })
            .then((parsedData) => {
                const { meals } = parsedData;

                if (meals !== null) {
                    resultHeading.innerHTML = `<h2>The search results for ${searchQuery}:</h2>`;
                    //get map meals array and put it in meals id div
                    const allMeals = meals.map(
                        //initially name for mealsEl was meals due to that it storing innerHTMLin actual meals array
                        (meal) => `
                            <div class="meal">
                            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
                            <div class="meal-info" data-mealID="${meal.idMeal}">
                                <h3>${meal.strMeal}</h3>
                            </div>
                            </div>
                        `
                    );
                    mealsEl.innerHTML = allMeals.join(''); //join methods return strings without changing array it takes separtor
                } else {
                    resultHeading.innerHTML = `<h4>There are no results for ${searchQuery}:</h4>`;
                    mealsEl.innerHTML = '';
                }
            });
    } else {
        alert('Enter Meal Name');
    }

    inputSearch.value = '';
};

//adding meal to dom
const addMealToDOM = (meal) => {
    let ingredients = [];
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients.push(
                `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
            );
        }
    }
    singleMeal.innerHTML = `
    <div class="single-meal">
      <h1>${meal.strMeal}</h1>
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
      <div class="single-meal-info">
        ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}
        ${meal.strArea ? `<p>${meal.strArea}</p>` : ''}
      </div>
      <div class="main">
        <p>${meal.strInstructions}</p>
        <h2>Ingredients</h2>
        <ul>
          ${ingredients.map((ing) => `<li>${ing}</li>`).join('')}
        </ul>
      </div>
    </div>
  `;
};

//fetching random meal
const fetchRandomMeal = async () => {
    //random meal url
    const randomMealURL = 'https://www.themealdb.com/api/json/v1/1/random.php';

    //fetch random meal
    const meal = await fetch(randomMealURL);
    const mealJson = await meal.json(); //await is like an .then() that we use in promises
    const randomMeal = mealJson.meals[0];

    //removing loader
    resultHeading.innerHTML = ``;

    //add meal to dom
    addMealToDOM(randomMeal);
};

const getRandomMeal = () => {
    //in async-await functions the code executed line by line
    //setting things first.
    mealsEl.innerHTML = '';
    resultHeading.innerHTML = `<h3>Loading...</h3>`;
    //fetching random meal
    fetchRandomMeal();
};

const getMealInfo = async (e) => {
    let mealInfo = e.composedPath().find((item) => {
        if (item.classList) {
            return item.classList.contains('meal-info');
        }
    });
    if (mealInfo) {
        let mealId = mealInfo.getAttribute('data-mealID');
        const mealByIdURL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
        const meal = await fetch(mealByIdURL);
        let mealData = await meal.json();
        mealData = mealData.meals[0];

        resultHeading.innerHTML = `<h3>Loading...</h3>`;
        //add meal to dom
        addMealToDOM(mealData);
        resultHeading.innerHTML = ``;
    }
};

//event listeners
submit.addEventListener('submit', getMeals);
randomBtn.addEventListener('click', getRandomMeal);
mealsEl.addEventListener('click', getMealInfo);
