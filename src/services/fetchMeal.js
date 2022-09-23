export const fetchMealByIngredient = async (ingredient) => {
  const endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  const request = await fetch(endpoint);
  const data = await request.json();
  return data;
};
export const fetchMealByName = async (name) => {
  const endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;
  const request = await fetch(endpoint);
  const data = await request.json();
  return data;
};
export const fetchMealByFirstLetter = async (firstLetter) => {
  const endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`;
  const request = await fetch(endpoint);
  const data = await request.json();
  return data;
};
