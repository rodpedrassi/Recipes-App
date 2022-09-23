import React, { useState } from 'react';
import {
  fetchMealByFirstLetter,
  fetchMealByIngredient,
  fetchMealByName } from '../services/fetchMeal';

function SearchBar() {
  const [search, setSearch] = useState('');
  const [typeOfSearch, setTypeOfSearch] = useState('ingredient');

  const ERROR_MSG = 'Sorry, we haven\'t found any recipes for these filters.';

  const handleClick = async (e) => {
    e.preventDefault();
    const route = window.location.pathname;
    if (route === '/meals') {
      if (typeOfSearch === 'ingredient') {
        const data = await fetchMealByIngredient(search);
        if (!data) {
          global.alert(ERROR_MSG);
        } else {
          console.log(data);
        }
      }
      if (typeOfSearch === 'name') {
        const data = await fetchMealByName(search);
        if (!data) {
          global.alert(ERROR_MSG);
        } else {
          console.log(data);
        }
      }
      if (typeOfSearch === 'firstLetter') {
        if (search.length === 1) {
          const data = await fetchMealByFirstLetter(search);
          if (!data) {
            global.alert(ERROR_MSG);
          } else {
            console.log(data);
          }
        } else {
          global.alert('Your search must have only 1 (one) character');
        }
      }
    } else {
      console.log('pagina drinks?');
    }
  };

  return (
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
  );
}

export default SearchBar;
