import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import drinks from '../../cypress/mocks/drinks';
import oneDrink from '../../cypress/mocks/oneDrink';
import drinksByIngredient from '../../cypress/mocks/drinksByIngredient';

describe('Testa o componente SearchBar com a rota /drinks', () => {
  const SEARCH_BAR = 'search-input';
  const SEARCH_BUTTON = 'exec-search-btn';

  test('Checa se ao pesquisar por 1 caracter retorna o esperado', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn()
        .mockResolvedValue(drinks),
    });

    renderWithRouterAndRedux(<App />, { initialEntries: ['/drinks'] });

    const searchIcon = screen.getByTestId('help');
    expect(searchIcon).toBeInTheDocument();
    userEvent.click(searchIcon);

    const searchBar = screen.getByTestId(SEARCH_BAR);
    const radioFirstLetter = screen.getByTestId('first-letter-search-radio');
    const searchButton = screen.getByTestId(SEARCH_BUTTON);

    expect(radioFirstLetter).toBeInTheDocument();
    userEvent.type(searchBar, 'g');
    userEvent.click(radioFirstLetter);
    userEvent.click(searchButton);
    expect(global.fetch).toHaveBeenCalled();

    const card0 = await screen.findByTestId('0-recipe-card');

    expect(card0).toBeInTheDocument();
  });

  test('Checa quando o retorno da API retorna apenas um drink', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn()
        .mockResolvedValue(oneDrink),
    });

    renderWithRouterAndRedux(<App />, { initialEntries: ['/drinks'] });

    const searchIcon = screen.getByTestId('help');
    expect(searchIcon).toBeInTheDocument();
    userEvent.click(searchIcon);

    const searchBar = screen.getByTestId(SEARCH_BAR);
    const radioNameSearch = screen.getByTestId('name-search-radio');
    const searchButton = screen.getByTestId(SEARCH_BUTTON);

    userEvent.type(searchBar, 'Aquamarine');
    userEvent.click(radioNameSearch);
    userEvent.click(searchButton);
    expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=Aquamarine');
    expect(await screen.findByTestId('drink-recipe-page'));
  });

  test('Checa se ao pesquisar por ingrediente retorna o esperado', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn()
        .mockResolvedValue(drinksByIngredient),
    });

    renderWithRouterAndRedux(<App />, { initialEntries: ['/drinks'] });

    const searchIcon = screen.getByTestId('help');
    expect(searchIcon).toBeInTheDocument();
    userEvent.click(searchIcon);

    const searchBar = screen.getByTestId(SEARCH_BAR);
    const radioIngredient = screen.getByTestId('ingredient-search-radio');
    const searchButton = screen.getByTestId(SEARCH_BUTTON);

    userEvent.type(searchBar, 'gim');
    userEvent.click(radioIngredient);
    userEvent.click(searchButton);
    expect(global.fetch).toHaveBeenCalled();

    const card0 = await screen.findByTestId('0-recipe-card');

    expect(card0).toBeInTheDocument();
  });
});
