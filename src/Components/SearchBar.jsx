import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import {
  fetchMealByFirstLetter,
  fetchMealByIngredient,
  fetchMealByName } from '../services/fetchMeal';
import {
  fetchDrinkByFirstLetter,
  fetchDrinkByIngredient,
  fetchDrinkByName } from '../services/fetchDrink';

function SearchBar() {
  const history = useHistory();
  const [search, setSearch] = useState('');
  const [typeOfSearch, setTypeOfSearch] = useState('ingredient');
  const {
    recipesSearched, setRecipesSearched, isSearching, setIsSearching,
    // renderizedRecipes,
    // setRenderizedRecipes,
  } = useContext(RecipesContext);

  const handleClick = async (e) => {
    e.preventDefault();
    const route = window.location.pathname;
    setIsSearching(true);
    if (route === '/meals') {
      if (typeOfSearch === 'ingredient') {
        const data = await fetchMealByIngredient(search);
        setRecipesSearched(data);
      }
      if (typeOfSearch === 'name') {
        const data = await fetchMealByName(search);
        setRecipesSearched(data);
      }
      if (typeOfSearch === 'firstLetter') {
        const searchLength = search.length;
        const data = await fetchMealByFirstLetter(search, searchLength);
        setRecipesSearched(data);
      }
    } else {
      if (typeOfSearch === 'ingredient') {
        const data = await fetchDrinkByIngredient(search);
        setRecipesSearched(data);
      }
      if (typeOfSearch === 'name') {
        const data = await fetchDrinkByName(search);
        setRecipesSearched(data);
      }
      if (typeOfSearch === 'firstLetter') {
        const searchLength = search.length;
        const data = await fetchDrinkByFirstLetter(search, searchLength);
        setRecipesSearched(data);
      }
    }
  };

  const oneRecipeFound = (recipe) => {
    const route = window.location.pathname;
    if (route === '/meals') {
      const { idMeal } = recipe[0];
      history.push(`/meals/${idMeal}`);
    } else {
      const { idDrink } = recipe[0];
      history.push(`/drinks/${idDrink}`);
    }
  };

  const renderMeals = (data) => {
    const MAX_RECIPES_IN_SCREEN = 12;
    console.log('data fora', data);
    if (data.length > 0) {
      if (data.meals.length === 1) {
        oneRecipeFound(data.meals);
      }
      const twelveCards = data.meals.filter((e, index) => index < MAX_RECIPES_IN_SCREEN);
      console.log('twelve', twelveCards);
      console.log('data', data);
      const cards = twelveCards.map((card, index) => {
        const { idMeal, strMeal, strMealThumb } = card;
        return (
          <div key={ idMeal } data-testid={ `${index}-recipe-card` }>
            <img
              key={ idMeal + strMeal }
              src={ strMealThumb }
              alt={ strMeal }
              data-testid={ `${index}-card-img` }
            />
            <h3 key={ strMeal } data-testid={ `${index}-card-name` }>{strMeal}</h3>
          </div>
        );
      });
      return cards;
    }
  };
  const renderDrinks = (data) => {
    const MAX_RECIPES_IN_SCREEN = 12;

    if (data) {
      if (data.drinks.length === 1) {
        oneRecipeFound(data.drinks);
      }
      const twelveCards = data.drinks.filter((e, index) => index < MAX_RECIPES_IN_SCREEN);
      console.log(twelveCards);
      const cards = twelveCards.map((card, index) => {
        const { idDrink, strDrink, strDrinkThumb } = card;
        return (
          <div key={ idDrink } data-testid={ `${index}-recipe-card` }>
            <img
              key={ idDrink + strMeal }
              src={ strDrinkThumb }
              alt={ strDrink }
              data-testid={ `${index}-card-img` }
            />
            <h3 key={ strDrink } data-testid={ `${index}-card-name` }>{strDrink}</h3>
          </div>
        );
      });
      return cards;
    }
  };

  const renderCards = (data) => {
    const route = window.location.pathname;
    if (route === '/meals') {
      return renderMeals(data);
    }
    return renderDrinks(data);
  };

  return (
    <div>

      <form onSubmit={ handleClick }>
        <input
          data-testid="search-input"
          id="search"
          name="search"
          value={ search }
          onChange={ (e) => setSearch(e.target.value) }
          placeholder="digite sua busca"
        />
        <label htmlFor="ingredient">
          <input
            data-testid="ingredient-search-radio"
            type="radio"
            id="ingredient"
            name="search-radio"
            defaultChecked
            onClick={ () => setTypeOfSearch('ingredient') }
          />
          Ingrediente
        </label>
        <label htmlFor="name">
          <input
            data-testid="name-search-radio"
            type="radio"
            id="name"
            name="search-radio"
            onClick={ () => setTypeOfSearch('name') }

          />
          Nome
        </label>
        <label htmlFor="first-letter">
          <input
            data-testid="first-letter-search-radio"
            type="radio"
            id="first-letter"
            name="search-radio"
            onClick={ () => setTypeOfSearch('firstLetter') }
          />
          Primeira Letra
        </label>
        <button
          type="submit"
          data-testid="exec-search-btn"
        >
          Procurar
        </button>
      </form>
      {isSearching && renderCards(recipesSearched)}
    </div>

  );
}

export default SearchBar;
