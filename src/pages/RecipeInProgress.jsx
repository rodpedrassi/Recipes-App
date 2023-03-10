import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { fetchMealById } from '../services/fetchMeal';
import { fetchDrinkById } from '../services/fetchDrink';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import { AddToDoneOrFavorites, removeFromFavorites } from '../services/localStorage';

const copy = require('clipboard-copy');

function RecipeInProgress() {
  const { id } = useParams();
  const history = useHistory();
  const route = history.location.pathname;

  const [mealDetail, setMealDetail] = useState();
  const [drinkDetail, setDrinkDetail] = useState();
  const [isFavorited, setIsFavorited] = useState(false);
  const [ingredient, setIngredient] = useState([]);
  const [copiedLink, setCopiedLink] = useState(false);

  const checkFavorite = () => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favoriteRecipes) {
      favoriteRecipes.forEach((element) => {
        if (element.id === id) {
          setIsFavorited(true);
        }
      });
    }
  };

  useEffect(() => {
    const fetchMeal = async () => {
      const response = await fetchMealById(id);
      return setMealDetail(response.meals);
    };
    const fetchDrink = async () => {
      const response = await fetchDrinkById(id);
      return setDrinkDetail(response.drinks);
    };
    if (route.includes('meals')) {
      fetchMeal();
    } else {
      fetchDrink();
    }
    checkFavorite();
  }, []);

  useEffect(() => {
    if (route.includes('meals')) {
      const ingredientsKeys = mealDetail && Object.keys(mealDetail[0]).filter(
        (key) => key.includes('strIngredient'),
      );
      const filteredIngredients = mealDetail && ingredientsKeys.filter(
        (key) => mealDetail[0][key] !== null && mealDetail[0][key] !== '',
      );
      setIngredient(filteredIngredients);
    } else {
      const ingredientsKeys = drinkDetail && Object.keys(drinkDetail[0]).filter(
        (key) => key.includes('strIngredient'),
      );
      const filteredIngredients = drinkDetail && ingredientsKeys.filter(
        (key) => drinkDetail[0][key] !== null && drinkDetail[0][key] !== '',
      );
      setIngredient(filteredIngredients);
    }
  }, [mealDetail, drinkDetail]);

  const clickFavMeal = () => {
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
      removeFromFavorites('favoriteRecipes', id);
    } else {
      AddToDoneOrFavorites('favoriteRecipes', value);
    }
    setIsFavorited(!isFavorited);
  };

  const clickFavDrink = () => {
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
      removeFromFavorites('favoriteRecipes', id);
    } else {
      AddToDoneOrFavorites('favoriteRecipes', value);
    }
    setIsFavorited(!isFavorited);
  };

  const copyRoute = () => {
    if (route.includes('meals')) {
      copy(`http://localhost:3000/meals/${id}`);
      setCopiedLink(true);
    } else {
      copy(`http://localhost:3000/drinks/${id}`);
      setCopiedLink(true);
    }
  };

  return (
    <div>
      {
        (route.includes('meals') && mealDetail) && (
          <div>
            <h2 data-testid="recipe-title">{mealDetail[0].strMeal}</h2>
            <img src={ mealDetail[0].strMealThumb } alt="" data-testid="recipe-photo" />
            {
              ingredient && ingredient.map((ing, index) => {
                const quantity = mealDetail[0][`strMeasure${index + 1}`];
                return (
                  <label
                    htmlFor="checkbox"
                    key={ index }
                    data-testid={ `${index}-ingredient-step` }
                  >
                    {mealDetail[0][ing]}
                    {(quantity !== null && quantity !== ' ') && ` - ${quantity}`}
                    <input
                      type="checkbox"
                      id="checkbox"
                      name={ mealDetail[0][ing] }
                    />
                  </label>
                );
              })
            }
            <button data-testid="fav-icon" type="button" onClick={ clickFavMeal }>
              <img
                alt="Icone de Favoritar"
                data-testid="favorite-btn"
                src={ isFavorited ? blackHeartIcon : whiteHeartIcon }
                style={ { width: '50px', height: '50px' } }
              />
            </button>
            <button
              data-testid="share-btn"
              type="button"
              onClick={ copyRoute }
            >
              Compartilhar Receita
            </button>
            <p data-testid="recipe-category">{mealDetail[0].strCategory}</p>
            <p data-testid="instructions">{mealDetail[0].strInstructions}</p>
            <button
              data-testid="finish-recipe-btn"
              type="button"
            >
              Finalizar Receita
            </button>
          </div>
        )
      }
      {
        (route.includes('drinks') && drinkDetail) && (
          <div>
            <h2 data-testid="recipe-title">{drinkDetail[0].strDrink}</h2>
            <img src={ drinkDetail[0].strDrinkThumb } alt="" data-testid="recipe-photo" />
            {
              ingredient && ingredient.map((ing, index) => {
                const quantity = drinkDetail[0][`strMeasure${index + 1}`];
                return (
                  <label
                    htmlFor="checkbox"
                    key={ index }
                    data-testid={ `${index}-ingredient-step` }
                  >
                    {drinkDetail[0][ing]}
                    {(quantity !== null && quantity !== ' ') && ` - ${quantity}`}
                    <input
                      type="checkbox"
                      id="checkbox"
                      name={ drinkDetail[0][ing] }
                    />
                  </label>
                );
              })
            }
            <button data-testid="fav-icon" type="button" onClick={ clickFavDrink }>
              <img
                alt="Icone de Favoritar"
                data-testid="favorite-btn"
                src={ isFavorited ? blackHeartIcon : whiteHeartIcon }
                style={ { width: '50px', height: '50px' } }
              />
            </button>
            <button
              data-testid="share-btn"
              type="button"
              onClick={ copyRoute }
            >
              Compartilhar Receita
            </button>
            <p data-testid="recipe-category">{drinkDetail[0].strCategory}</p>
            <p data-testid="instructions">{drinkDetail[0].strInstructions}</p>
            <button
              data-testid="finish-recipe-btn"
              type="button"
            >
              Finalizar Receita
            </button>
          </div>
        )
      }
      {copiedLink && (<p>Link copied!</p>)}
    </div>
  );
}
export default RecipeInProgress;
