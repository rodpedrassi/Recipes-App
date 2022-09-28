import React, { useContext, useEffect, useState } from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import RecipeCards from '../Components/RecipeCards';
import RecipesContext from '../context/RecipesContext';
import { fetchCategoryMeals, fetchMealByName } from '../services/fetchMeal';
import { fetchDrinkByName } from '../services/fetchDrink';

function Recipes() {
  const { setRenderizedRecipes } = useContext(RecipesContext);
  const [categories, setCategories] = useState({});
  const MAX_RECIPES_IN_SCREEN = 12;
  const PRIMEIRAS_CINCO_CATEGORIAS = 5;

  useEffect(() => {
    (async () => {
      const route = window.location.pathname;
      let response;
      let categoriesList;
      let aux;
      if (route === '/meals') {
        aux = 'meals';
        response = await fetchMealByName('');
        categoriesList = await fetchCategoryMeals();
      }
      if (route === '/drinks') {
        aux = 'drinks';
        response = await fetchDrinkByName('');
        categoriesList = await fetchCategoryMeals();
      }
      const fiveCategories = categoriesList[aux]
        .filter((e, index) => index < PRIMEIRAS_CINCO_CATEGORIAS);

      const twelveCards = response[aux]
        .filter((e, index) => index < MAX_RECIPES_IN_SCREEN);

      setRenderizedRecipes(twelveCards);
      setCategories(fiveCategories);
    })();
  }, []);

  const renderCategories = () => {
    if (Object.keys(categories).length === 0) {
      return null;
    }
    const render = categories.map((e) => (
      <button
        data-testid={ `${e.strCategory}-category-filter` }
        type="button"
        key={ e.strCategory }
      >
        {e.strCategory}
      </button>
    ));
    return render;
  };

  return (
    <div data-testid="section-recipes">
      <Header title="Meals" />
      {renderCategories()}
      <RecipeCards />
      <Footer />
    </div>
  );
}

export default Recipes;
