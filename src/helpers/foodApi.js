const getFoodByIngredient = async (term) => {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${term}`,
  );
  const { meals } = await response.json();
  return meals;
};

const getFoodByName = async (term) => {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`,
  );
  const { meals } = await response.json();
  return meals;
};

const getFoodByFirstLetter = async (term) => {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`,
  );
  const { meals } = await response.json();
  return meals;
};

export const getFoodByFilter = async (term) => {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${term}`,
  );
  const { meals } = await response.json();
  return meals;
};

export const getFood = (term, type) => {
  switch (type) {
  case 'First letter':
    return getFoodByFirstLetter(term);
  case 'Name':
    return getFoodByName(term);
  case 'Ingredient':
    return getFoodByIngredient(term);
  default:
    return null;
  }
};

export const getMealsForRecommendation = async () => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const { meals } = await response.json();
  const maxIndex = 5;
  const getMeals = meals.filter((_meal, index) => index <= maxIndex);
  return getMeals;
};
