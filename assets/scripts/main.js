window.addEventListener("DOMContentLoaded", init);

function init() {
  let recipes = getRecipesFromStorage();
  addRecipesToDocument(recipes);
  initFormHandler();
}

function getRecipesFromStorage() {
  return JSON.parse(localStorage.getItem('recipes')) || [];
}

function addRecipesToDocument(recipes) {
  const main = document.querySelector('main');
  recipes.forEach(recipe => {
    const recipeCard = document.createElement('recipe-card');
    recipeCard.data = recipe;
    main.appendChild(recipeCard);
  });
}

function saveRecipesToStorage(recipes) {
  localStorage.setItem('recipes', JSON.stringify(recipes));
}

function initFormHandler() {
  const form = document.getElementById('new-recipe');

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const recipeObject = {};
    for (const [key, value] of formData.entries()) {
      recipeObject[key] = value;
    }
    const recipeCard = document.createElement('recipe-card');
    recipeCard.data = recipeObject;
    document.querySelector('main').appendChild(recipeCard);
    const recipes = getRecipesFromStorage();
    recipes.push(recipeObject);
    saveRecipesToStorage(recipes);
  });

  const clearButton = document.querySelector('button.danger');
  clearButton.addEventListener('click', () => {
    localStorage.clear();
    document.querySelector('main').innerHTML = '';
  });
}
