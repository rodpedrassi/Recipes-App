const ERROR_MSG = 'Sorry, we haven\'t found any recipes for these filters.';
const ERROR_DETAILS = 'Error details';

export const fetchDrinkByIngredient = async (ingredient) => {
  const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  try {
    const request = await fetch(endpoint);
    const data = await request.json();
    if (!data.drinks) {
      global.alert(ERROR_MSG);
    } else {
      return data;
    }
  } catch (error) {
    throw new Error(ERROR_DETAILS, error);
  }
};

export const fetchDrinkByName = async (name) => {
  const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`;
  try {
    const request = await fetch(endpoint);
    const data = await request.json();
    if (!data.drinks) {
      global.alert(ERROR_MSG);
    } else {
      return data;
    }
  } catch (error) {
    throw new Error(ERROR_DETAILS, error);
  }
};

export const fetchDrinkById = async (name) => {
  const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${name}`;
  try {
    const request = await fetch(endpoint);
    const data = await request.json();
    if (!data.drinks) {
      global.alert(ERROR_MSG);
    } else {
      return data;
    }
  } catch (error) {
    throw new Error(ERROR_DETAILS, error);
  }
};

export const fetchDrinkByFirstLetter = async (firstLetter, searchLength) => {
  const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLetter}`;
  if (searchLength === 1) {
    try {
      const request = await fetch(endpoint);
      const data = await request.json();
      return data;
    } catch (error) {
      throw new Error(ERROR_DETAILS, error);
    }
  } else {
    global.alert('Your search must have only 1 (one) character');
    return undefined;
  }
};

export const fetchCategoryDrinks = async () => {
  const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  try {
    const request = await fetch(endpoint);
    const data = await request.json();
    return data;
  } catch (error) {
    throw new Error(ERROR_DETAILS, error);
  }
};

export const fetchFilterByCategoryDrinks = async (category) => {
  const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
  try {
    const request = await fetch(endpoint);
    const data = await request.json();
    return data;
  } catch (error) {
    throw new Error(ERROR_DETAILS, error);
  }
};
