import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import { Router } from 'react-router-dom';
// import Header from '../Components/Header';
import App from '../App';
// import Recipes from '../pages/Recipes';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

describe('testa o componente Header', () => {
  it('1- testa o Header', () => {
    const { history } = renderWithRouterAndRedux(<App />, { initialEntries: ['/meals'] });
    // render(
    //   <Router history={ history }>
    //     <Recipes />
    //   </Router>,
    // );
    const heading = screen.getByTestId('page-title');
    expect(heading).toBeInTheDocument();
    // 'heading', { name: /meals/i, level: 2 }
    const profileIcon = screen.getByTestId('profile-top-btn');
    const searchIcon = screen.getByTestId('search-top-btn');

    expect(profileIcon).toBeInTheDocument();
    expect(searchIcon).toBeInTheDocument();

    const buttonSearch = screen.getByRole('button');

    userEvent.click(buttonSearch);
    expect(buttonSearch).toBeInTheDocument();

    userEvent.click(profileIcon);
    expect(history.location.pathname).toBe('/profile');
  });
});
