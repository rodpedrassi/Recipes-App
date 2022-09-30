import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchDrinkById } from '../services/fetchDrink';
import { fetchRecommendedMeals } from '../services/fetchMeal';
import '../css/detailsPage.css';

const MAX_CARDS = 6;

function DrinkRecipe() {
  const params = useParams();

  const [drinkDetail, setDrinkDetail] = useState();
  const [mealDetail, setMealDetail] = useState();

  useEffect(() => {
    const fetchApi = async () => {
      const response = await fetchDrinkById(params.id);
      return setDrinkDetail(response.drinks);
    };
    const fetchRecomendations = async () => {
      const response = await fetchRecommendedMeals('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      return setMealDetail(response.meals);
    };
    fetchApi();
    fetchRecomendations();
  }, []);

  const ingredientsKeys = drinkDetail && Object.keys(drinkDetail[0]).filter(
    (key) => key.includes('strIngredient'),
  );

  const filteredIngredients = drinkDetail && ingredientsKeys.filter(
    (key) => drinkDetail[key] !== null && drinkDetail[key] !== '',
  );

  const cardsToRenderize = mealDetail && mealDetail
    .filter((e, index) => index < MAX_CARDS);

  return (
    <div className="recipe-detais-main">
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
                  {(quantity !== null && quantity !== ' ') && ` - ${quantity}`}
                </p>
              );
            })
          }
          <div data-testid="drink-recipe-page" />
          <p data-testid="instructions">{drinkDetail[0].strInstructions}</p>
        </div>
      ))}
      <div className="carrousel-container">
        {
          mealDetail && cardsToRenderize.map((card, index) => (
            <div
              key={ index }
              data-testid={ `${index}-recommendation-card` }
            >
              <div className="carrousel-card">
                <p data-testid={ `${index}-recommendation-title` }>{card.strMeal}</p>
                <img
                  src={ card.strMealThumb }
                  alt=""
                  data-testid={ `${index}-recommendation-title` }
                />
              </div>
            </div>
          ))
        }
      </div>
      <div>
        <button
          type="button"
          data-testid="start-recipe-btn"
          style={ { position: 'fixed', bottom: 0 } }
        >
          Iniciar Receita
        </button>
      </div>
    </div>
  );
}

export default DrinkRecipe;
