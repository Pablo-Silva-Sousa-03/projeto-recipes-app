import { useParams } from 'react-router-dom';
import useRecipes from '../hooks/useRecipes';
import useRecipe from '../hooks/useRecipe';
import useBasePath from '../hooks/useBasePath';

import ButtonRecipeStatus from '../components/ButtonRecipeStatus';

import './RecipeDetails.css';

function RecipeDetails() {
  const basePath = useBasePath();
  const { id } = useParams();

  const { data: recipe, loading } = useRecipe(basePath, id);
  const { data: recipes } = useRecipes(basePath === 'meals' ? 'drinks' : 'meals');

  console.log(recipes);

  if (loading) return 'Loading...';

  return (
    <>
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
              { basePath === 'meals' ? recipe.category : recipe.alcoholic }
            </p>
          </div>
          <h5 className="card-title" data-testid="recipe-title">{ recipe.title }</h5>
        </div>
      </div>
      <div className="favBox">
        <button type="button" data-testid="favorite-btn"> Favorite </button>
        <button type="button" data-testid="share-btn"> Share </button>
      </div>

      <ul>
        {
          recipe.ingredients.map(({ ingredient, measure }, i) => (
            <li key={ ingredient } data-testid={ `${i}-ingredient-name-and-measure` }>
              <span>{ ingredient }</span>
              { ' - ' }
              <span>{ measure }</span>
            </li>
          ))
        }
      </ul>
      <p data-testid="instructions">{ recipe.instructions }</p>
      {
        recipe.video && (
          <iframe
            title={ recipe.title }
            width="340"
            height="191"
            src={ `${recipe.video}&autoplay=0` }
            frameBorder="0"
            allowFullScreen
            data-testid="video"
          />
        )
      }
      <ButtonRecipeStatus type={ recipe.type } id={ recipe.id } />
    </>
  );
}

export default RecipeDetails;
