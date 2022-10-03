import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderPath from './helpers/renderWithRouterAndRedux';

const doneRecipesKey = 'doneRecipes';
const doneRecipes = [
  {
    id: '52771',
    type: 'meal',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    doneDate: '23/06/2020',
    tags: ['Pasta', 'Curry'],
  },
  {
    id: '178319',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    doneDate: '23/06/2020',
    tags: [],
  },
];

beforeEach(() => {
  localStorage.setItem(doneRecipesKey, JSON.stringify(doneRecipes));
  renderPath('/done-recipes');
});

afterEach(() => {
  localStorage.clear();
});

describe('Testes no componente DoneRecipes', () => {
  it('Espera que existam três botões de filtro na tela', () => {
    const bttFilterAll = screen.getByRole('button', { name: /all/i });
    const bttFilterMeals = screen.getByRole('button', { name: /meals/i });
    const bttFilterDrinks = screen.getByRole('button', { name: /drinks/i });
    expect(bttFilterAll).toBeDefined();
    expect(bttFilterMeals).toBeDefined();
    expect(bttFilterDrinks).toBeDefined();
  });

  it('Se existe um cartão de receita Meal pronta na tela', () => {
    const mealObj = doneRecipes[0];
    const mealRecipeCard = screen.getAllByRole('img', { name: /recipe/i })[0];
    expect(mealRecipeCard).toHaveAttribute('src', mealObj.image);
    const mealRecipeTitle = screen.getByText(mealObj.name);
    expect(mealRecipeTitle).toBeDefined();
    const mealRecipeInfo = screen
      .getByText(`${mealObj.nationality} - ${mealObj.category}`);
    expect(mealRecipeInfo).toBeDefined();
    const mealRecipeDoneDate = screen.getAllByText(mealObj.doneDate)[0];
    expect(mealRecipeDoneDate).toBeDefined();
  });

  it('Se existe um cartão de receita Drink pronta na tela', () => {
    const drinkObj = doneRecipes[1];
    const drinkRecipeCard = screen.getAllByRole('img', { name: /recipe/i })[1];
    expect(drinkRecipeCard).toHaveAttribute('src', drinkObj.image);
    const drinkRecipeTitle = screen.getByText(drinkObj.name);
    expect(drinkRecipeTitle).toBeDefined();
    const drinkRecipeInfo = screen
      .getByText(`${drinkObj.alcoholicOrNot} - ${drinkObj.category}`);
    expect(drinkRecipeInfo).toBeDefined();
    const drinkRecipeDoneDate = screen.getAllByText(drinkObj.doneDate)[1];
    expect(drinkRecipeDoneDate).toBeDefined();
  });

  it('Se existem dois botões de compartilhamento na tela', () => {
    const shareBtns = screen.getAllByRole('img', { name: 'share' });
    expect(shareBtns).toHaveLength(2);
  });
});

Object.assign(navigator, {
  clipboard: {
    writeText: () => {},
  },
});

describe('Testa os botões do DoneRecipes', () => {
  it('Testa se quando o botão de refeições é clicado mostra apenas receitas de Meals', () => {
    const bttFilterMeals = screen.getByRole('button', { name: /meals/i });
    userEvent.click(bttFilterMeals);
    const recipeCardImages = screen.getAllByRole('img', { name: /recipe/i });
    expect(recipeCardImages).not.toHaveLength(2);
    expect(recipeCardImages[0]).toHaveAttribute('src', doneRecipes[0].image);
  });

  it('Testa se quando o botão de bebidas é clicado mostra apenas receitas de Drinks', async () => {
    const bttFilterDrinks = screen.getByRole('button', { name: /drinks/i });
    const bttFilterAll = screen.getByRole('button', { name: /all/i });
    userEvent.click(bttFilterDrinks);
    const recipeCardImages = screen.getAllByRole('img', { name: /recipe/i });
    expect(recipeCardImages).not.toHaveLength(2);
    expect(recipeCardImages[0]).toHaveAttribute('src', doneRecipes[1].image);
    userEvent.click(bttFilterAll);
    await waitFor(() => {
      expect(screen.getAllByRole('img', { name: /share/i })).toHaveLength(2);
    });

    const drinkRecipeTitle = screen.getByText(doneRecipes[1].name);
    const mealRecipeTitle = screen.getByText(doneRecipes[0].name);
    expect(drinkRecipeTitle && mealRecipeTitle).toBeDefined();
  });

  it('Testa se quando o botão de bebidas é clicado mostra apenas receitas de Drinks', () => {
    const bttFilterDrinks = screen.getByRole('button', { name: /drinks/i });
    userEvent.click(bttFilterDrinks);
    const recipeCardImages = screen.getAllByRole('img', { name: /recipe/i });
    expect(recipeCardImages).not.toHaveLength(2);
    expect(recipeCardImages[0]).toHaveAttribute('src', doneRecipes[1].image);
  });

  it('Testa se quando o botão de compartilhamento é clicado, copia o URL da receita', () => {
    jest.spyOn(navigator.clipboard, 'writeText');
    const shareBtns = screen.getAllByRole('img', { name: 'share' });
    userEvent.click(shareBtns[0]);
    expect(navigator.clipboard.writeText)
      .toHaveBeenCalledWith(`http://localhost:3000/meals/${doneRecipes[0].id}`);
  });
});

describe('Teste se redireciona para a pág da receita ao clicar no cartão da recipe', () => {
  it('Testa se, ao clicar no cartão de receita de refeição, redireciona para a página de receita de Meal', () => {
    const { history } = renderPath('/done-recipes');
    const mealRecipeCard = screen.getAllByRole('img', { name: /recipe/i })[0];
    userEvent.click(mealRecipeCard);
    const { location: { pathname } } = history;
    expect(pathname).toBe(`/meals/${doneRecipes[0].id}`);
  });
});
