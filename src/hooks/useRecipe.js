import { useState, useCallback, useEffect } from 'react';

const endpoint = (type, id) => {
  let url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  if (type.startsWith('meals')) url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;

  return url;
};

const mapToSameAPI = (type, data) => {
  const SIZE_INGREDIENTS = 15;

  const ingredients = [];

  for (let i = 1; i <= SIZE_INGREDIENTS; i += 1) {
    const newIngredient = {};

    const hasIngredient = data[`strIngredient${i}`];
    if (hasIngredient) newIngredient.ingredient = hasIngredient;
    else break;

    const hasMeasure = data[`strMeasure${i}`];
    if (hasMeasure) newIngredient.measure = hasMeasure;

    if (Object.keys(newIngredient).length > 0) ingredients.push(newIngredient);
  }

  if (type.startsWith('meals')) {
    const video = data.strYoutube.replace('/watch?v=', '/embed/');

    return {
      type: 'meal',
      id: data.idMeal,
      photo: data.strMealThumb,
      nationality: data.strArea,
      title: data.strMeal,
      category: data.strCategory,
      ingredients,
      tags: data.strTags
        ? data.strTags.split(',') : [],
      instructions: data.strInstructions,
      video,
    };
  }

  return {
    type: 'drink',
    id: data.idDrink,
    photo: data.strDrinkThumb,
    nationality: data.strArea,
    title: data.strDrink,
    category: data.strCategory,
    alcoholic: data.strAlcoholic,
    ingredients,
    tags: data.strTags
      ? data.strTags.split(',') : [],
    instructions: data.strInstructions,
  };
};

const useRecipe = (type, id) => {
  const [data, setData] = useState({});
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      if (!id) throw Exception('recipe needs an id!');
      const res = await (await fetch(endpoint(type, id))).json();
      setData(mapToSameAPI(type, res[
        type.startsWith('meals') ? 'meals' : 'drinks'
      ][0]));
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [type, id]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return {
    data,
    error,
    loading,
  };
};

export default useRecipe;
