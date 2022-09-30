import { React, useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { fetchDrinkById } from '../services/fetchDrink';
import { fetchRecommendedMeals } from '../services/fetchMeal';
import '../css/detailsPage.css';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import { AddToDoneOrFavorites, removeFromFavorites } from '../services/localStorage';

const MAX_CARDS = 6;
const copy = require('clipboard-copy');

function DrinkRecipe() {
  const params = useParams();
  const history = useHistory();

  const [drinkDetail, setDrinkDetail] = useState();
  const [mealDetail, setMealDetail] = useState();
  const [isRecipeFinished, setIsRecipeFinished] = useState(true);
  const [isProgressRecipes, setIsProgressRecipes] = useState('Start Recipe');
  const [isFavorited, setIsFavorited] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const checkFavorite = () => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favoriteRecipes) {
      favoriteRecipes.forEach((element) => {
        if (element.id === params.id) {
          setIsFavorited(true);
        }
      });
    }
  };

  const progressRecipes = () => {
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (inProgressRecipes) {
      const { drinks } = inProgressRecipes;
      Object.keys(drinks).forEach((element) => {
        if (element === params.id) {
          setIsProgressRecipes('Continue Recipe');
        }
      });
    }
  };

  const sendTo = () => {
    const route = history.location.pathname;
    const path = `${route}/in-progress`;
    history.push(path);
  };

  const copyRoute = () => {
    const route = history.location.pathname;
    copy(`http://localhost:3000${route}`);
    setCopiedLink(true);
  };

  const recipeFinished = () => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    if (doneRecipes) {
      doneRecipes.forEach((element) => {
        if (element.id === params.id) {
          setIsRecipeFinished(false);
        }
      });
    }
  };

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
    recipeFinished();
    progressRecipes();
    checkFavorite();
  }, []);

  const ingredientsKeys = drinkDetail && Object.keys(drinkDetail[0]).filter(
    (key) => key.includes('strIngredient'),
  );

  const filteredIngredients = drinkDetail && ingredientsKeys.filter(
    (key) => drinkDetail[key] !== null && drinkDetail[key] !== '',
  );

  const cardsToRenderize = mealDetail && mealDetail
    .filter((e, index) => index < MAX_CARDS);

  const clickFav = () => {
    // [{ id, type, nationality, category, alcoholicOrNot, name, image }]
    const { idDrink, strArea = '', strCategory,
      strAlcoholic, strDrink, strDrinkThumb } = drinkDetail[0];
    // console.log(drinkDetail[0]);
    const value = {
      id: idDrink,
      type: 'drink',
      nationality: strArea,
      category: strCategory,
      alcoholicOrNot: strAlcoholic,
      name: strDrink,
      image: strDrinkThumb,
    };
    if (isFavorited) {
      removeFromFavorites('favoriteRecipes', params.id);
    } else {
      AddToDoneOrFavorites('favoriteRecipes', value);
    }
    setIsFavorited(!isFavorited);
  };

  return (
    <div className="recipe-detais-main">
      <button data-testid="fav-icon" type="button" onClick={ clickFav }>
        <img
          alt="Icone de Favoritar"
          data-testid="favorite-btn"
          src={ isFavorited ? blackHeartIcon : whiteHeartIcon }
          style={ { width: '50px', height: '50px' } }
        />
      </button>
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
      {isRecipeFinished
      && (
        <div>
          <button
            type="button"
            data-testid="start-recipe-btn"
            style={ { position: 'fixed', bottom: 0 } }
            value={ isProgressRecipes }
            onClick={ sendTo }
          >
            {isProgressRecipes}
          </button>
        </div>
      )}
      <div>
        <button
          data-testid="share-btn"
          type="button"
          onClick={ copyRoute }
        >
          Compartilhar Receita
        </button>
      </div>
      {copiedLink && (<p>Link copied!</p>)}
    </div>
  );
}

export default DrinkRecipe;
