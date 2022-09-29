import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import RecipeCards from '../Components/RecipeCards';
import RecipesContext from '../context/RecipesContext';
import {
  fetchCategoryMeals,
  fetchFilterByCategoryMeals,
  fetchMealByName,
} from '../services/fetchMeal';
import { fetchCategoryDrinks, fetchDrinkByName } from '../services/fetchDrink';

function Recipes() {
  const { setRenderizedRecipes } = useContext(RecipesContext);
  const [categories, setCategories] = useState({});
  const [toggleCategories, setToggleCategories] = useState(true);
  const MAX_RECIPES_IN_SCREEN = 12;
  const PRIMEIRAS_CINCO_CATEGORIAS = 5;
  const history = useHistory();

  const didMount = async () => {
    const route = history.location.pathname;
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
      categoriesList = await fetchCategoryDrinks();
    }
    const fiveCategories = categoriesList[aux]
      .filter((e, index) => index < PRIMEIRAS_CINCO_CATEGORIAS);

    const twelveCards = response[aux]
      .filter((e, index) => index < MAX_RECIPES_IN_SCREEN);

    setRenderizedRecipes(twelveCards);
    setCategories(fiveCategories);
  };

  useEffect(() => {
    didMount();
  }, []);

  const renderFilterCategoryByMeals = async (category) => {
    if (toggleCategories) {
      const result = await fetchFilterByCategoryMeals(category);
      const twelveCards = result.meals
        .filter((e, index) => index < MAX_RECIPES_IN_SCREEN);
      setRenderizedRecipes(twelveCards);
      setToggleCategories(false);
    } else {
      didMount();
      setToggleCategories(true);
    }
  };

  const renderCategories = () => {
    if (Object.keys(categories).length === 0) {
      return null;
    }
    const render = categories.map((e) => (
      <button
        data-testid={ `${e.strCategory}-category-filter` }
        type="button"
        key={ e.strCategory }
        onClick={ () => renderFilterCategoryByMeals(e.strCategory) }
      >
        {e.strCategory}
      </button>
    ));
    return render;
  };

  return (
    <div data-testid="section-recipes">
      <Header title="Meals" />
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ didMount }
      >
        All
      </button>
      {renderCategories()}
      <RecipeCards />
      <Footer />
    </div>
  );
}

export default Recipes;
