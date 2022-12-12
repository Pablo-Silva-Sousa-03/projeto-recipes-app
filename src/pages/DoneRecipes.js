import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import '../index.css';
import './RecipeDetails.css';

function DoneRecipes() {
  const [doneRecipes, setdoneRecipes] = useState([]);
  // const [copied, setCopied] = useState(false);

  const recipes = JSON.parse(localStorage.getItem('doneRecipes'));

  useEffect(() => {
    const recipesInit = JSON.parse(localStorage.getItem('doneRecipes'));
    setdoneRecipes(
      recipesInit,
    );
  }, []);

  const filterMeals = () => {
    const filteredMeals = recipes.filter((e) => e.type === 'meal');
    setdoneRecipes(filteredMeals);
  };

  const filterDrinks = () => {
    const filteredMeals = recipes.filter((e) => e.type === 'drink');
    setdoneRecipes(filteredMeals);
  };

  const filterAll = () => {
    setdoneRecipes(recipes);
  };

  // const shareRecipe = (id, type) => {
  //   const two = 2000;
  //   const link = `http://localhost:3000/${type}s/${id}`;
  //   clipboardCopy(link);
  //   setCopied(true);
  //   setTimeout(() => {
  //     setCopied(false);
  //   }, two);
  // };

  const handleCopy = async (type, id) => {
    const THREESECONDS = 3000;
    document.getElementById('copyMessage').style.display = 'inline';
    setTimeout(() => {
      document.getElementById('copyMessage').style.display = 'none';
    }, THREESECONDS);
    // copy(`http://localhost:3000${pathname}`);
    navigator.clipboard.writeText(`http://localhost:3000/${type}s/${id}`);
  };

  return (
    <div>
      <Header title="Done Recipes" />
      <button
        type="button"
        data-testid="filter-by-meal-btn"
        onClick={ filterMeals }
      >
        Meals

      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ filterDrinks }
      >
        Drinks

      </button>
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ filterAll }
      >
        All

      </button>
      {
        doneRecipes?.map((recipe, i) => (
          <div
            key={ recipe.id }
            className="card"
          >
            <button
              src={ shareIcon }
              type="button"
              data-testid={ `${i}-horizontal-share-btn` }
              onClick={ () => handleCopy(recipe.type, recipe.id) }
            >
              <img src={ shareIcon } alt="Compartilhar" />
            </button>
            <span className="copyMessage" id="copyMessage">
              Link copied!
            </span>

            <Link
              to={ `/${recipe.type}s/${recipe.id}` }
            >
              <img
                data-testid={ `${i}-horizontal-image` }
                className="card-img"
                src={ recipe.image }
                alt={ recipe.name }
              />
              <span data-testid={ `${i}-horizontal-name` }>{ recipe.name }</span>
            </Link>
            {recipe.tags.slice(0, 2).map((tag) => (
              <span
                key={ tag }
                data-testid={ `0-${tag}-horizontal-tag` }
              >
                { tag }
              </span>
            ))}

            {recipe.type === 'meal'
              ? (
                <span
                  data-testid={ `${i}-horizontal-top-text` }
                >
                  { `${recipe.nationality} - ${recipe.category}` }

                </span>
              )
              : (
                <span
                  data-testid={ `${i}-horizontal-top-text` }
                >
                  { recipe.alcoholicOrNot }
                </span>
              ) }
            <span data-testid={ `${i}-horizontal-done-date` }>{ recipe.doneDate }</span>
          </div>
        ))
      }
    </div>
  );
}
DoneRecipes.propTypes = {}.isRequired;
export default DoneRecipes;
