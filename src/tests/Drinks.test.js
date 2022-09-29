import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import drinks from '../../cypress/mocks/drinks';
import drinkCategories from '../../cypress/mocks/drinkCategories';

describe('Testa a tela de Receitas', () => {
  test.only('Checa se ao clickar nos botões de categoria retorna o esperado', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/drinks'] });

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn()
        .mockResolvedValue(drinks)
        .mockResolvedValue(drinkCategories),
    });

    const shakeButton = await screen.findByTestId('Shake-category-filter');
    expect(shakeButton).toBeInTheDocument();
    const card0 = await screen.findByTestId('0-recipe-card');
    expect(card0).toBeInTheDocument();

    userEvent.click(shakeButton);
    const shakeImgs = await screen.findAllByRole('img');
    expect(shakeImgs).toHaveLength(16);
  });

  test('Checa se ao clickar nas receitas é levado a pagina de detalhes', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/drinks'] });

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn()
        .mockResolvedValue(drinks)
        .mockResolvedValue(drinkCategories),
    });

    const card0 = await screen.findAllByTestId('button-details');
    expect(card0[0]).toBeInTheDocument();

    userEvent.click(card0[0]);
    expect(screen.findByTestId('drink-recipe-page'));
  });
});
