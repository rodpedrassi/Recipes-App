import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import meals from '../../cypress/mocks/meals';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import mealCategories from '../../cypress/mocks/mealCategories';

describe('Testa a tela de Receitas', () => {
  // beforeEach(() => {
  //   jest.restoreAllMocks();
  // });
  test('Checa se ao clickar nos botões de categoria retorna o esperado', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn()
        .mockResolvedValue(meals)
        .mockResolvedValue(mealCategories),
    });

    const { history } = renderWithRouterAndRedux(<App />, { initialEntries: ['/meals'] });

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(2));
    await waitFor(() => expect(history.location.pathname).toBe('/meals'));

    const beefButton = await screen.findByTestId('Beef-category-filter');
    expect(beefButton).toBeInTheDocument();
    const card0 = await screen.findByTestId('0-recipe-card');
    expect(card0).toBeInTheDocument();
    act(() => {
      userEvent.click(beefButton);
    });
    const beefImgs = await screen.findAllByRole('img');
    expect(beefImgs).toHaveLength(16);
  });

  test('Checa se ao clickar nas receitas é levado a pagina de detalhes', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn()
        .mockResolvedValue(meals)
        .mockResolvedValue(mealCategories),
    });

    renderWithRouterAndRedux(<App />, { initialEntries: ['/meals'] });

    const card0 = await screen.findAllByTestId('button-details');
    expect(card0[0]).toBeInTheDocument();
    act(() => {
      userEvent.click(card0[0]);
    });

    expect(screen.findByTestId('meal-recipe-page'));
  });

  test('Ao clickar novamente em uma categoria uma nova requisição é renderizada ', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn()
        .mockResolvedValue(meals)
        .mockResolvedValue(mealCategories),
    });

    renderWithRouterAndRedux(<App />, { initialEntries: ['/meals'] });

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(2));

    const beefButton = await screen.findByTestId('Beef-category-filter');
    expect(beefButton).toBeInTheDocument();
    act(() => {
      userEvent.click(beefButton);
    });
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    const beefImgs = await screen.findAllByRole('img');
    expect(beefImgs).toHaveLength(16);

    act(() => {
      userEvent.click(beefButton);
    });
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
  });
});
