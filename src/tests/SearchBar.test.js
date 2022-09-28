import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import { mockMeals } from './helpers/mock/mockFirstLetter';
import oneMeal from '../../cypress/mocks/oneMeal';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

// jest.spyOn(global, 'fetch');
// global.fetch.mockResolvedValue({
// json: jest.fn()
// .mockResolvedValueOnce(baseMeals)
// .mockResolvedValueOnce(mealCategories)
// .mockResolvedValue(oneMealMock),
// });

describe('Testa o componente SearchBar com a rota /meals', () => {
  // beforeEach(() => {
  //   jest.spyOn(global, 'fetch');
  //   global.fetch.mockResolvedValue({
  //     json: jest.fn().mockReturnValue(mockMeals),
  //   });
  // });

  test('Checa se todos os componentes foram renderizados', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/meals'] });

    const searchIcon = screen.getByTestId('help');
    expect(searchIcon).toBeInTheDocument();
    userEvent.click(searchIcon);

    const searchBar = screen.getByTestId('search-input');
    const radioIngredient = screen.getByTestId('ingredient-search-radio');
    const radioName = screen.getByTestId('name-search-radio');
    const radioFirstLetter = screen.getByTestId('first-letter-search-radio');
    const searchButton = screen.getByTestId('exec-search-btn');

    expect(searchBar).toBeInTheDocument();
    expect(radioIngredient).toBeInTheDocument();
    expect(radioName).toBeInTheDocument();
    expect(radioFirstLetter).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
  });
  // await waitFor(() => expect(alert).toHaveBeenCalledWith('Your search must have only 1 (one) character'));
  test.only('Checa se ao pesquisar por 1 caracter retorna o esperado', async () => {
    // jest.spyOn(global, 'fetch');
    // global.fetch.mockResolvedValue({
    //   json: jest.fn()
    //     .mockResolvedValue(mockMeals),
    // });
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(oneMeal),
    }));

    renderWithRouterAndRedux(<App />, { initialEntries: ['/meals'] });

    const searchIcon = screen.getByTestId('help');
    expect(searchIcon).toBeInTheDocument();
    userEvent.click(searchIcon);

    const searchBar = screen.getByTestId('search-input');
    const radioFirstLetter = screen.getByTestId('first-letter-search-radio');
    const searchButton = screen.getByTestId('exec-search-btn');

    expect(radioFirstLetter).toBeInTheDocument();
    userEvent.type(searchBar, 'S');
    userEvent.click(radioFirstLetter);
    userEvent.click(searchButton);

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    const card01 = screen.findByTestId('0-recipe-card');
    // const card0 = screen.getByTestId('0-recipe-card');
    // const card1 = screen.findByTestId('1-recipe-card');
    // const card2 = screen.findByTestId('2-recipe-card');

    expect(await card01).toBeInTheDocument();
  });
});
