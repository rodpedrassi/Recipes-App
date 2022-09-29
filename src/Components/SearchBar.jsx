import React, { useContext, useEffect, useState } from 'react';
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
    recipesSearched, setRecipesSearched, setIsSearching, setRenderizedRecipes,
  } = useContext(RecipesContext);

  const oneRecipeFound = (recipe) => {
    const route = history.location.pathname;
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
    if (data === undefined) {
      return null;
    }
    if (Object.keys(data).length === 1) {
      if (data.meals.length === 1) {
        oneRecipeFound(data.meals);
      }
      const twelveCards = data.meals.filter((e, index) => index < MAX_RECIPES_IN_SCREEN);
      return twelveCards;
    }
  };
  const renderDrinks = (data) => {
    const MAX_RECIPES_IN_SCREEN = 12;
    if (data === undefined) {
      return null;
    }
    if (Object.keys(data).length === 1) {
      if (data.drinks.length === 1) {
        oneRecipeFound(data.drinks);
      }
      const twelveCards = data.drinks
        .filter((e, index) => index < MAX_RECIPES_IN_SCREEN);
      return twelveCards;
    }
  };

  const setCards = (data) => {
    const route = history.location.pathname;
    // console.log(data);
    if (route === '/meals') {
      setRenderizedRecipes(renderMeals(data));
    } if (route === '/drinks') {
      setRenderizedRecipes(renderDrinks(data));
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const route = history.location.pathname;
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

  useEffect(() => {
    setCards(recipesSearched);
  }, [recipesSearched]);

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
    </div>

  );
}

export default SearchBar;
