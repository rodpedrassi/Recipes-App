import React, { useState, useEffect } from 'react';
import { getObjectInStore, removeFromFavorites } from '../services/localStorage';
import Header from '../Components/Header';
import DoneRecipesCard from '../Components/DoneRecipesCard';

function FavoriteRecipes() {
  const doneRecipesKey = 'favoriteRecipes';
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [recipesFiltered, setRecipesFiltered] = useState([]);

  useEffect(() => {
    const getDoneRecipesFromStore = async () => {
      const response = getObjectInStore(doneRecipesKey);
      setDoneRecipes(response);
      setRecipesFiltered(response);
    };

    getDoneRecipesFromStore();
  }, []);

  const filterRecipesByType = (filter) => {
    if (filter === 'all') return setRecipesFiltered(doneRecipes);
    const recipesTypes = doneRecipes.filter((recipe) => recipe.type === filter);
    setRecipesFiltered(recipesTypes);
  };

  const filterRecipes = (type) => {
    switch (type) {
    case 'Drinks':
      return filterRecipesByType('drink');
    case 'Meals':
      return filterRecipesByType('meal');
    default:
      return filterRecipesByType('all');
    }
  };

  const unfavoriteRecipe = (recipes) => {
    removeFromFavorites(doneRecipesKey, recipes.id);
    setRecipesFiltered(getObjectInStore(doneRecipesKey));
  };

  return (
    <main>
      <Header title="Favorite Recipes" />

      <button
        onClick={ () => filterRecipes('All') }
        type="button"
        data-testid="filter-by-all-btn"
      >
        All
      </button>
      <button
        onClick={ () => filterRecipes('Meals') }
        type="button"
        data-testid="filter-by-meal-btn"
      >
        Meals
      </button>
      <button
        onClick={ () => filterRecipes('Drinks') }
        type="button"
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </button>

      {recipesFiltered && recipesFiltered.map((recipe, index) => (
        <DoneRecipesCard
          key={ index }
          index={ index }
          recipe={ recipe }
          showItem
          unfavoriteRecipe={ unfavoriteRecipe }
        />
      )) }
    </main>
  );
}

export default FavoriteRecipes;
