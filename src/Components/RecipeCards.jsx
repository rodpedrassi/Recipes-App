import React, { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';

function RecipeCards() {
  const { renderizedRecipes } = useContext(RecipesContext);
  return (
    <div>{renderizedRecipes}</div>
  );
}

export default RecipeCards;
