import PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import HeaderDetails from '../components/HeaderDetails';
import Recommendations from '../components/Recommendations';
import useBasePath from '../hooks/useBasePath';
import useRecipe from '../hooks/useRecipe';
import shareIcon from '../images/shareIcon.svg';
import './RecipeDetails.css';
import { getDrinksForRecommendation } from '../helpers/drinkApi';
import { getMealsForRecommendation } from '../helpers/foodApi';

const copy = require('clipboard-copy');

function RecipeInProgress(props) {
  const basePath = useBasePath();
  const { id } = useParams();

  const favorites = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  const isFavorite = favorites.length > 0
    && favorites.find((favorite) => favorite.id === id);

  const toggleFavorite = (favorite) => {
    const lastIndex = -1;

    if (!isFavorite) {
      favorites.push({
        id: favorite.id,
        type: favorite.type.slice(0, lastIndex),
        nationality: favorite.nationality
          ? favorite.nationality : '',
        category: favorite.category,
        alcoholicOrNot: favorite.alcoholic
          ? favorite.alcoholic : '',
        name: favorite.title,
        image: favorite.photo,
      });
      localStorage.setItem('favoriteRecipes', JSON.stringify(favorites));
    } else {
      const filter = favorites.filter((e) => e.id !== id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(filter));
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
    const data = basePath === 'meals'
      ? await getDrinksForRecommendation()
      : await getMealsForRecommendation();
    setRecommendations(data);
  }, [basePath]);

  useEffect(() => {
    getRecomentadion();
  }, [getRecomentadion]);

  const handleCopy = async () => {
    const THREESECONDS = 3000;
    const { location } = props;
    const { pathname } = location;
    document.getElementById('copyMessage').style.display = 'inline';
    setTimeout(() => {
      document.getElementById('copyMessage').style.display = 'none';
    }, THREESECONDS);
    copy(`http://localhost:3000${pathname}`);
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
          onClick={ () => toggleFavorite(recipe) }
        >
          Favorite
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
                textDecoration: checkedIngredients.find((ing) => ing === ingredient)
                  ? 'line-through' : 'none',
              } }

            >
              <span>
                { `${ingredient} - ${measure}` }
              </span>

              <input
                type="checkbox"
                id={ `${i}-ingredient-step` }
                checked={ checkedIngredients.find((ing) => ing === ingredient) }
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
          src={ `${recipe.video}&autoplay=0` }
          allowFullScreen
          data-testid="video"
        />
      )}
      <Recommendations recommendations={ recommendations } />

      <button
        data-testid="finish-recipe-btn"
        type="button"
        className="button-start--recipe"
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
