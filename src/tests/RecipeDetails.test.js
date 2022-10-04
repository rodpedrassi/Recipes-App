import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import meals from '../../cypress/mocks/meals';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import mealCategories from '../../cypress/mocks/mealCategories';

describe('first', () => {
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
