import { React, useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { fetchMealById } from '../services/fetchMeal';
import { fetchRecommendedDrinks } from '../services/fetchDrink';
import '../css/detailsPage.css';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import { AddToDoneOrFavorites, removeFromFavorites } from '../services/localStorage';

const MAX_CARDS = 6;
const copy = require('clipboard-copy');

function MealRecipe() {
  const params = useParams();
  const history = useHistory();

  const [mealDetail, setMealDetail] = useState();
  const [drinkDetail, setDrinkDetail] = useState();
  const [isRecipeFinished, setIsRecipeFinished] = useState(true);
  const [isProgressRecipes, setIsProgressRecipes] = useState('Start Recipe');
  const [copiedLink, setCopiedLink] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

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
      const { meals } = inProgressRecipes;
      Object.keys(meals).forEach((element) => {
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
      const response = await fetchMealById(params.id);
      return setMealDetail(response.meals);
    };
    const fetchRecomendations = async () => {
      const response = await fetchRecommendedDrinks('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      return setDrinkDetail(response.drinks);
    };

    fetchApi();
    fetchRecomendations();
    recipeFinished();
    progressRecipes();
    checkFavorite();
  }, []);

  const ingredientsKeys = mealDetail && Object.keys(mealDetail[0]).filter(
    (key) => key.includes('strIngredient'),
  );

  const filteredIngredients = mealDetail && ingredientsKeys.filter(
    (key) => mealDetail[key] !== null && mealDetail[key] !== '',
  );

  const cardsToRenderize = drinkDetail && drinkDetail
    .filter((e, index) => index < MAX_CARDS);

  const clickFav = () => {
    // [{ id, type, nationality, category, alcoholicOrNot, name, image }]
    const { idMeal, strArea, strCategory,
      strMeal, strMealThumb } = mealDetail[0];
    const value = {
      id: idMeal,
      type: 'meal',
      nationality: strArea,
      category: strCategory,
      alcoholicOrNot: '',
      name: strMeal,
      image: strMealThumb,
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
      {mealDetail && mealDetail.map((meal) => (
        <div className="recipe-section" key={ meal.idMeal }>
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
                  {(quantity !== null && quantity !== ' ') && ` - ${quantity}`}
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
      <div className="carrousel-container">
        {
          drinkDetail && cardsToRenderize.map((card, index) => (
            <div
              key={ index }
              data-testid={ `${index}-recommendation-card` }
            >
              <div className="carrousel-card">
                <p data-testid={ `${index}-recommendation-title` }>{card.strDrink}</p>
                <img
                  src={ card.strDrinkThumb }
                  alt=""
                  data-testid={ `${index}-rfunction () {
                    copy('This is some cool text')
                  } }ecommendation-title` }
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

export default MealRecipe;
