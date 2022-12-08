import PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import HeaderDetails from '../components/HeaderDetails';
import Recommendations from '../components/Recommendations';
import useBasePath from '../hooks/useBasePath';
import useRecipe from '../hooks/useRecipe';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import './RecipeDetails.css';
import { getDrinksForRecommendation } from '../helpers/drinkApi';
import { getMealsForRecommendation } from '../helpers/foodApi';

const copy = require('clipboard-copy');

function RecipeInProgress() {
  const history = useHistory();
  const basePath = useBasePath();
  const { id } = useParams();
  const [favoritesState, setFavorites] = useState([]);

  const favorites = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  const isFavorite = favorites.length > 0
    && favorites.find((favorite) => favorite.id === id);

  const toggleFavorite = (favorite) => {
    if (!isFavorite) {
      const newfavorites = [...favorites, {
        id: favorite.id,
        type: favorite.type,
        nationality: favorite.nationality || '',
        category: favorite.category,
        alcoholicOrNot: favorite.alcoholic || '',
        name: favorite.title,
        image: favorite.photo,
      }];
      setFavorites(localStorage.setItem('favoriteRecipes', JSON.stringify(newfavorites)));
    } else {
      const filter = favorites.filter((e) => e.id !== String(id));
      localStorage.setItem('favoriteRecipes', JSON.stringify(filter));
      setFavorites([{
        ...favoritesState,
      }]);
    }
  };

  const [recommendations, setRecommendations] = useState([]);
  const { data: recipe, loading } = useRecipe(basePath, id);
  const [checkedIngredients, setCheckedIngredients] = useState(
    JSON.parse(localStorage.getItem('inProgressRecipes')) || [],
  );

  const toggleCheckedIngredient = (ingredient) => {
    const found = checkedIngredients.find((ing) => ing === ingredient);

    if (found) {
      const newIgn = checkedIngredients.filter((ing) => ing !== found);
      setCheckedIngredients(newIgn);
      localStorage.setItem('inProgressRecipes', JSON.stringify(newIgn));
    } else {
      const newIgn = [...checkedIngredients, ingredient];
      setCheckedIngredients(newIgn);
      localStorage.setItem('inProgressRecipes', JSON.stringify(newIgn));
    }
  };

  const getRecomentadion = useCallback(async () => {
    const data = basePath === 'meals/in-progress'
      ? await getDrinksForRecommendation()
      : await getMealsForRecommendation();
    setRecommendations(data);
  }, [basePath]);

  useEffect(() => {
    getRecomentadion();
  }, [getRecomentadion]);

  const handleCopy = async () => {
    const THREESECONDS = 3000;
    // const { location } = props;
    // const { pathname } = location;
    document.getElementById('copyMessage').style.display = 'inline';
    setTimeout(() => {
      document.getElementById('copyMessage').style.display = 'none';
    }, THREESECONDS);
    copy(`http://localhost:3000/${recipe.type}s/${recipe.id}`);
  };

  const finishRecipe = () => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    doneRecipes.push({
      id: recipe.id,
      type: recipe.type,
      nationality: recipe.nationality
        ? recipe.nationality : '',
      category: recipe.category,
      alcoholicOrNot: recipe.alcoholic
        ? recipe.alcoholic : '',
      tags: recipe.tags
        ? recipe.tags : '',
      name: recipe.title,
      image: recipe.photo,
      doneDate: new Date().toISOString(),
    });

    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
    history.push('/done-recipes');
  };

  if (loading) return 'Loading...';

  return (
    <>
      <HeaderDetails />
      <div className="card">
        <img
          className="card-img"
          data-testid="recipe-photo"
          src={ recipe.photo }
          alt={ recipe.title }
        />

        <div className="card-img-overlay">
          <div>
            <p data-testid="recipe-category">
              {basePath === 'meals' ? recipe.category : recipe.alcoholic}
            </p>
          </div>
          <h5 className="card-title" data-testid="recipe-title">
            {recipe.title}
          </h5>
        </div>
      </div>
      <div className="favBox-container">
        <button
          type="button"
          data-testid="favorite-btn"
          src={ favorites.some((el) => el.id === recipe.id)
            ? blackHeartIcon : whiteHeartIcon }
          alt="BlackHeart"
          onClick={ () => toggleFavorite(recipe) }
        >
          <img
            src={ favorites.some((el) => el.id === recipe.id)
              ? blackHeartIcon : whiteHeartIcon }
            alt="BlackHeart"
          />
        </button>

        <button type="button" data-testid="share-btn" onClick={ handleCopy }>
          <img src={ shareIcon } alt="Compartilhar" />
        </button>
        <span className="copyMessage" id="copyMessage">
          Link copied!
        </span>
      </div>

      <ul>
        {recipe.ingredients && recipe.ingredients.map(({ ingredient, measure }, i) => (
          <li key={ ingredient } data-testid={ `${i}-ingredient-name-and-measure` }>
            <label
              htmlFor={ `${i}-ingredient-step` }
              data-testid={ `${i}-ingredient-step` }
              style={ {
                color: 'black',
                textDecoration: checkedIngredients.some((ing) => ing === ingredient)
                  ? 'line-through' : 'none',
              } }

            >
              <span>
                { `${ingredient} - ${measure}` }
              </span>

              <input
                type="checkbox"
                id={ `${i}-ingredient-step` }
                checked={ checkedIngredients.some((ing) => ing === ingredient) }
                onChange={ () => toggleCheckedIngredient(ingredient) }
              />
            </label>
          </li>
        ))}
      </ul>
      <p data-testid="instructions">{recipe.instructions}</p>
      {recipe.video && (
        <iframe
          title={ recipe.title }
          width="340"
          height="191"
          src={ `${recipe.video}` }
          allowFullScreen
          data-testid="video"
        />
      )}
      <Recommendations recommendations={ recommendations } />

      <button
        data-testid="finish-recipe-btn"
        type="button"
        className="button-start--recipe"
        disabled={ checkedIngredients.length !== recipe.ingredients.length }
        onClick={ () => finishRecipe() }
      >
        Finish Recipe
      </button>
    </>
  );
}

RecipeInProgress.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
}.isRequired;

export default RecipeInProgress;
