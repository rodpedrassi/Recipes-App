import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Testa a barra de navegação', () => {
  test('testa o botão meal', async () => {
    const { history } = renderWithRouter(<App />, '/foods');
    userEvent.click(screen.getByTestId('drinks-bottom-btn'))
    await waitFor(() => {
      expect(history.location.pathname).toBe('/drinks')
    }, { timeout: 1000, interval: 100 })

    userEvent.click(screen.getByTestId('food-bottom-btn'))
    expect(history.location.pathname).toBe('/foods')
  });
});