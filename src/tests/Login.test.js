import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router-dom';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

const { history } = renderWithRouterAndRedux(<App />);
const { pathname } = history.location;
const EMAIL_INPUT_TEST_ID = 'email-input';
const PASSWORD_INPUT_TEST_ID = 'password-input';
beforeEach(() => {
  render(
    <Router history={ history }>
      <App />
    </Router>,
  );
});
describe('Testa se a página de login renderiza corretamente', () => {
  test('Verifica se a rota está correta', () => {
    expect(pathname).toBe('/');
  });
  test('Verifica se o input e-mail é renderizado', () => {
    const inputEmail = screen.getByTestId(EMAIL_INPUT_TEST_ID);
    expect(inputEmail).toBeInTheDocument();
  });
  test('Verifica se o input password é renderizado', () => {
    const inputPassword = screen.getByTestId(PASSWORD_INPUT_TEST_ID);
    expect(inputPassword).toBeInTheDocument();
  });
  test('Verifica se o botão Entrar é renderizado', () => {
    const buttonEntrar = screen.getByText('Enter');
    expect(buttonEntrar).toBeInTheDocument();
  });
  test('Verifica se os inputs são validados', () => {
    const inputEmail = screen.getByTestId(EMAIL_INPUT_TEST_ID);
    const inputPassword = screen.getByTestId(PASSWORD_INPUT_TEST_ID);
    const buttonEntrar = screen.getByText('Enter');
    userEvent.type(inputEmail, 'email');
    userEvent.type(inputPassword, '12345');
    expect(buttonEntrar).toHaveAttribute('disabled');
    userEvent.type(inputEmail, 'teste@email.com');
    userEvent.type(inputPassword, '1234567');
    expect(buttonEntrar).not.toHaveAttribute('disabled');
  });
  test('Checa se ao clickar no botão Enter é roteado para meals ', () => {
    const inputEmail = screen.getByTestId(EMAIL_INPUT_TEST_ID);
    const inputPassword = screen.getByTestId(PASSWORD_INPUT_TEST_ID);
    const buttonEntrar = screen.getByTestId('login-submit-btn');
    userEvent.type(inputEmail, 'teste@email.com');
    userEvent.type(inputPassword, '1234567');
    userEvent.click(buttonEntrar);
    const section = screen.getByTestId('section-recipes');
    expect(section).toBeInTheDocument();
  });
});
