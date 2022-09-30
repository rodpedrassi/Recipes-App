import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import drinks from '../../cypress/mocks/drinks';
import drinkCategories from '../../cypress/mocks/drinkCategories';

describe('Testa a tela de Receitas', () => {
  test('Checa se ao clickar nos botões de categoria retorna o esperado', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn()
        .mockResolvedValue(drinks)
        .mockResolvedValue(drinkCategories),
    });

    renderWithRouterAndRedux(<App />, { initialEntries: ['/drinks'] });

    const shakeButton = await screen.findByTestId('Shake-category-filter');
    expect(shakeButton).toBeInTheDocument();
    const card0 = await screen.findByTestId('0-recipe-card');
    expect(card0).toBeInTheDocument();

    userEvent.click(shakeButton);
    const shakeImgs = await screen.findAllByRole('img');
    expect(shakeImgs).toHaveLength(15);
  });

  test('Checa se ao clickar nas receitas é levado a pagina de detalhes', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn()
        .mockResolvedValue(drinks)
        .mockResolvedValue(drinkCategories),
    });

    renderWithRouterAndRedux(<App />, { initialEntries: ['/drinks'] });

    const card0 = await screen.findAllByTestId('button-details');
    expect(card0[0]).toBeInTheDocument();

    userEvent.click(card0[0]);
    expect(screen.findByTestId('drink-recipe-page'));
  });

  test('Checa se todos os botões de categoria estão presentes na tela', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn()
        .mockResolvedValue(drinks)
        .mockResolvedValue(drinkCategories),
    });

    renderWithRouterAndRedux(<App />, { initialEntries: ['/drinks'] });

    expect(await screen.findByTestId('Shake-category-filter')).toBeInTheDocument();
    expect(await screen.findByTestId('Other/Unknown-category-filter')).toBeInTheDocument();
    expect(await screen.findByTestId('Cocoa-category-filter')).toBeInTheDocument();
    expect(await screen.findByTestId('Cocktail-category-filter')).toBeInTheDocument();
    expect(await screen.findByTestId('Ordinary Drink-category-filter')).toBeInTheDocument();
    expect(await screen.findByTestId('All-category-filter')).toBeInTheDocument();
  });
});
