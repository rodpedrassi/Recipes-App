import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  const [recipesSearched, setRecipesSearched] = useState([]);
  const [renderizedRecipes, setRenderizedRecipes] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const contextType = {
    recipesSearched,
    setRecipesSearched,
    isSearching,
    setIsSearching,
    renderizedRecipes,
    setRenderizedRecipes,
  };
  return (
    <RecipesContext.Provider value={ contextType }>
      { children }
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipesProvider;
