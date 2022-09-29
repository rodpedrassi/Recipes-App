import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import beefMeals from '../../cypress/mocks/beefMeals';
import oneMeal from '../../cypress/mocks/oneMeal';
import mealsByIngredient from '../../cypress/mocks/mealsByIngredient';

describe('Testa o componente SearchBar com a rota /meals', () => {
  const SEARCH_BAR = 'search-input';
  const SEARCH_BUTTON = 'exec-search-btn';
  test('Checa se todos os componentes foram renderizados', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/meals'] });

    const searchIcon = screen.getByTestId('help');
    expect(searchIcon).toBeInTheDocument();
    userEvent.click(searchIcon);

    const searchBar = screen.getByTestId(SEARCH_BAR);
    const radioIngredient = screen.getByTestId('ingredient-search-radio');
    const radioName = screen.getByTestId('name-search-radio');
    const radioFirstLetter = screen.getByTestId('first-letter-search-radio');
    const searchButton = screen.getByTestId(SEARCH_BUTTON);

    expect(searchBar).toBeInTheDocument();
    expect(radioIngredient).toBeInTheDocument();
    expect(radioName).toBeInTheDocument();
    expect(radioFirstLetter).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
  });
  // await waitFor(() => expect(alert).toHaveBeenCalledWith('Your search must have only 1 (one) character'));
  test('Checa se ao pesquisar por 1 caracter retorna o esperado', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn()
        .mockResolvedValue(beefMeals),
    });

    renderWithRouterAndRedux(<App />, { initialEntries: ['/meals'] });

    const searchIcon = screen.getByTestId('help');
    expect(searchIcon).toBeInTheDocument();
    userEvent.click(searchIcon);

    const searchBar = screen.getByTestId(SEARCH_BAR);
    const radioFirstLetter = screen.getByTestId('first-letter-search-radio');
    const searchButton = screen.getByTestId(SEARCH_BUTTON);

    expect(radioFirstLetter).toBeInTheDocument();
    userEvent.type(searchBar, 'b');
    userEvent.click(radioFirstLetter);
    userEvent.click(searchButton);
    expect(global.fetch).toHaveBeenCalled();

    const card0 = await screen.findByTestId('0-recipe-card');

    expect(card0).toBeInTheDocument();
  });

  test('Checa quando o retorno da API retorna apenas uma meal', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn()
        .mockResolvedValue(oneMeal),
    });

    renderWithRouterAndRedux(<App />, { initialEntries: ['/meals'] });

    const searchIcon = screen.getByTestId('help');
    expect(searchIcon).toBeInTheDocument();
    userEvent.click(searchIcon);

    const searchBar = screen.getByTestId(SEARCH_BAR);
    const radioNameSearch = screen.getByTestId('name-search-radio');
    const searchButton = screen.getByTestId(SEARCH_BUTTON);

    userEvent.type(searchBar, 'Spicy Arrabiata Penne');
    userEvent.click(radioNameSearch);
    userEvent.click(searchButton);
    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=Spicy Arrabiata Penne');
    expect(await screen.findByTestId('meal-recipe-page'));
  });

  test('Checa se ao pesquisar por ingrediente retorna o esperado', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn()
        .mockResolvedValue(mealsByIngredient),
    });

    renderWithRouterAndRedux(<App />, { initialEntries: ['/meals'] });

    const searchIcon = screen.getByTestId('help');
    expect(searchIcon).toBeInTheDocument();
    userEvent.click(searchIcon);

    const searchBar = screen.getByTestId(SEARCH_BAR);
    const radioIngredient = screen.getByTestId('ingredient-search-radio');
    const searchButton = screen.getByTestId(SEARCH_BUTTON);

    userEvent.type(searchBar, 'chicken');
    userEvent.click(radioIngredient);
    userEvent.click(searchButton);
    expect(global.fetch).toHaveBeenCalled();

    const card0 = await screen.findByTestId('0-recipe-card');

    expect(card0).toBeInTheDocument();
  });
});
