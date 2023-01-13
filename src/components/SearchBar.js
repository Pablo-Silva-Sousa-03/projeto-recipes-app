import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useHistory, useLocation } from 'react-router-dom';
import { getDrink } from '../helpers/drinkApi';
import { getFood } from '../helpers/foodApi';
import DrinkCard from './DrinkCard';
import MealCard from './MealCard';

function SearchBar() {
  const [search, setSearch] = useState({
    searchTerm: '',
    searchType: '',
  });
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(false);
  const location = useLocation();
  const history = useHistory();
  const TWELVE = 12;

  function handleChange({ target: { value, id } }) {
    setSearch({ ...search, [id]: value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (search.searchType === 'First letter' && search.searchTerm.length > 1) {
      global.alert('Your search must have only 1 (one) character');
      return null;
    }
    try {
      let data = [];
      if (location.pathname === '/drinks') {
        data = await getDrink(search.searchTerm, search.searchType);
        if (data[0] && data.length === 1) {
          history.push(`/drinks/${data[0].idDrink}`);
        }
      }
      if (location.pathname === '/meals') {
        data = await getFood(search.searchTerm, search.searchType);
        if (data[0] && data.length === 1) {
          history.push(`/meals/${data[0].idMeal}`);
        }
      }
      setRecipes(data);
      setError(false);
    } catch (e) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
      setError(true);
    }
  }

  return (
    <div>
      <form className="search-bar" onSubmit={ handleSubmit }>
        <input
          type="text"
          className="mb-2"
          label="searchTerm"
          id="searchTerm"
          placeholder="Buscar Receita"
          data-testid="search-input"
          value={ search.searchTerm }
          onChange={ handleChange }
        />
        <div className="inline-radios mx-auto">
          <label htmlFor="searchType">
            Ingredient
            <input
              data-testid="ingredient-search-radio"
              label="Ingredient"
              id="searchType"
              name="group1"
              type="radio"
              value="Ingredient"
              onChange={ handleChange }
            />
          </label>
          <label htmlFor="searchType">
            Name
            <input
              data-testid="name-search-radio"
              label="Name"
              id="searchType"
              name="group1"
              type="radio"
              value="Name"
              onChange={ handleChange }
            />
          </label>
          <label htmlFor="searchType">
            First letter
            <input
              data-testid="first-letter-search-radio"
              label="First letter"
              id="searchType"
              name="group1"
              type="radio"
              value="First letter"
              onChange={ handleChange }
            />
          </label>
        </div>
        <Button
          type="submit"
          className="mt-2"
          variant="primary"
          data-testid="exec-search-btn"
        >
          Buscar
        </Button>
      </form>
      <div className="recipesContent">
        {recipes.map((el, i) => {
          if (i < TWELVE && location.pathname === '/meals') {
            return (<MealCard
              index={ i }
              key={ i + el }
              recipe={ el }
            />);
          } if (i < TWELVE && location.pathname === '/drinks') {
            return (<DrinkCard
              index={ i }
              key={ i + el }
              recipe={ el }
            />);
          }
          return null;
        })}
      </div>
    </div>
  );
}

SearchBar.propTypes = {}.isRequired;
export default SearchBar;
