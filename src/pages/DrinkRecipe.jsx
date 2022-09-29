import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchDrinkById } from '../services/fetchDrink';

function DrinkRecipe() {
  const params = useParams();

  const [drinkDetail, setDrinkDetail] = useState();

  useEffect(() => {
    const fetchApi = async () => {
      const response = await fetchDrinkById(params.id);
      return setDrinkDetail(response.drinks);
    };
    const fetchApi2 = async () => {
      const response = await fetchDrinkById(params.id);
      return setDrinkDetail(response.drinks);
    };
    fetchApi();
    fetchApi2();
  }, []);

  const ingredientsKeys = drinkDetail && Object.keys(drinkDetail[0]).filter(
    (key) => key.includes('strIngredient'),
  );

  const filteredIngredients = drinkDetail && ingredientsKeys.filter(
    (key) => drinkDetail[key] !== null && drinkDetail[key] !== '',
  );

  return (
    <div>
      {drinkDetail && drinkDetail.map((drink) => (
        <div key={ drink.idDrink }>
          <h2 data-testid="recipe-title">{drink.strDrink}</h2>
          <img src={ drink.strDrinkThumb } alt="" data-testid="recipe-photo" />
          <p data-testid="recipe-category">{drink.strAlcoholic}</p>
          {
            filteredIngredients.map((ingredient, index) => {
              const quantity = drinkDetail[0][`strMeasure${index + 1}`];
              return (
                <p
                  key={ index }
                  data-testid={ `${index}-ingredient-name-and-measure` }
                >
                  {drinkDetail[0][ingredient]}
                  {(quantity !== null && quantity !== '') && ` - ${quantity}`}
                </p>
              );
            })
          }
          <div data-testid="drink-recipe-page" />
          <p data-testid="instructions">{drinkDetail[0].strInstructions}</p>
        </div>
      ))}
    </div>
  );
}

export default DrinkRecipe;
