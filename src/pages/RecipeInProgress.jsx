import React, { useState } from 'react';
import shareButtonIcon from '../images/shareIcon.svg';

function RecipeInProgress() {
  const [visibleItem, setVisibleItem] = useState({
    share: false,
    favorite: false,
    enableFinishBtn: false,
  });
  const shareRecipe = (recipeId) => {
    navigator
      .clipboard
      .writeText(`http://localhost:3000/${path}/${recipeId}`);
    setVisibleItem((prevState) => ({ ...prevState, share: true }));
  };

  const { idMeal, idDrink } = recipe;
  return (
    <div key={ idMeal || idDrink }>
      <button
        type="button"
        data-testid="share-btn"
        name="share-btn"
        src={ shareButtonIcon }
        onClick={ () => shareRecipe(idDrink || idMeal) }
      >
        {
          visibleItem.share
            ? 'Link copied!'
            : (<img src={ shareButtonIcon } alt="share" />)
        }
      </button>
    </div>
  );
}

export default RecipeInProgress;
