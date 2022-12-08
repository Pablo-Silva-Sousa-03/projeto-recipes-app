import PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ButtonRecipeStatus from '../components/ButtonRecipeStatus';
import HeaderDetails from '../components/HeaderDetails';
import Recommendations from '../components/Recommendations';
import useBasePath from '../hooks/useBasePath';
import useRecipe from '../hooks/useRecipe';
import shareIcon from '../images/shareIcon.svg';
import './RecipeDetails.css';
import { getDrinksForRecommendation } from '../helpers/drinkApi';
import { getMealsForRecommendation } from '../helpers/foodApi';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const copy = require('clipboard-copy');

function RecipeDetails(props) {
  const basePath = useBasePath();
  const { id } = useParams();
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
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
        {recipe.ingredients.map(({ ingredient, measure }, i) => (
          <li key={ ingredient } data-testid={ `${i}-ingredient-name-and-measure` }>
            <span>{ingredient}</span>
            {' - '}
            <span>{measure}</span>
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
      {doneRecipes.some((e) => Number(e.id) === Number(id)) ? (
        ''
      ) : (
        <ButtonRecipeStatus type={ basePath } id={ recipe.id } />
      )}
    </>
  );
}

RecipeDetails.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
}.isRequired;

export default RecipeDetails;
