import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';

function RecipeCards() {
  const { renderizedRecipes } = useContext(RecipesContext);
  const history = useHistory();

  const sendToDetails = (id) => {
    const route = history.location.pathname;
    const path = `${route}/${id}`;
    history.push(path);
  };

  const renderCards = () => {
    const route = history.location.pathname;
    if (route === '/meals') {
      const cardsMeal = renderizedRecipes.map((card, index) => {
        const { idMeal, strMeal, strMealThumb } = card;
        return (
          <div key={ idMeal } data-testid={ `${index}-recipe-card` }>
            <button
              data-testid="button-details"
              type="button"
              onClick={ () => sendToDetails(idMeal) }
            >
              <img
                key={ idMeal + strMeal }
                src={ strMealThumb }
                alt={ strMeal }
                data-testid={ `${index}-card-img` }
              />
              <h3 key={ strMeal } data-testid={ `${index}-card-name` }>{strMeal}</h3>
            </button>
          </div>
        );
      });
      return cardsMeal;
    }
    if (route === '/drinks') {
      const cardsDrink = renderizedRecipes.map((card, index) => {
        const { idDrink, strDrink, strDrinkThumb } = card;
        return (
          <div key={ idDrink } data-testid={ `${index}-recipe-card` }>
            <button
              data-testid="button-details"
              type="button"
              onClick={ () => sendToDetails(idDrink) }
            >
              <img
                key={ idDrink + strDrink }
                src={ strDrinkThumb }
                alt={ strDrink }
                data-testid={ `${index}-card-img` }
              />
              <h3 key={ strDrink } data-testid={ `${index}-card-name` }>{strDrink}</h3>
            </button>
          </div>
        );
      });
      return cardsDrink;
    }
  };

  return (
    <div>{renderizedRecipes && renderCards()}</div>
  );
}

export default RecipeCards;
