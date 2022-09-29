import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMealById } from '../services/fetchMeal';

function MealRecipe() {
  const params = useParams();

  const [mealDetail, setMealDetail] = useState();

  useEffect(() => {
    const fetchApi = async () => {
      const response = await fetchMealById(params.id);
      return setMealDetail(response.meals);
    };
    fetchApi();
  }, []);

  const ingredientsKeys = mealDetail && Object.keys(mealDetail[0]).filter(
    (key) => key.includes('strIngredient'),
  );

  const filteredIngredients = mealDetail && ingredientsKeys.filter(
    (key) => mealDetail[key] !== null && mealDetail[key] !== '',
  );

  return (
    <div>
      {mealDetail && mealDetail.map((meal) => (
        <div key={ meal.idMeal }>
          <h2 data-testid="recipe-title">{meal.strMeal}</h2>
          <img src={ meal.strMealThumb } alt="" data-testid="recipe-photo" />
          <p data-testid="recipe-category">{meal.strCategory}</p>
          {
            filteredIngredients.map((ingredient, index) => {
              const quantity = mealDetail[0][`strMeasure${index + 1}`];
              return (
                <p
                  key={ index }
                  data-testid={ `${index}-ingredient-name-and-measure` }
                >
                  {mealDetail[0][ingredient]}
                  {(quantity !== null && quantity !== '') && ` - ${quantity}`}
                </p>
              );
            })
          }
          <div data-testid="meal-recipe-page" />
          <p data-testid="instructions">{mealDetail[0].strInstructions}</p>
          <iframe
            data-testid="video"
            width="420"
            height="315"
            title={ meal.strMeal }
            src={ meal.strYoutube }
            allow="accelerometer; clipboard-write; encrypted-media;
                 gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      ))}
    </div>
  );
}

export default MealRecipe;
