import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../../App';
import { renderWithRouterAndRedux } from '../../helpers/renderWith';
// import RecipeDetails from '../../pages/RecipeDetails';

describe('Testes do componente <RecipeDetails />', () => {
  it('Testa Meals Details', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/meals/52977'] });
    expect(await screen.findByTestId('recipe-title'))
      .toHaveTextContent('Corba');
    const favoriteBtn = screen.getByTestId('favorite-btn');
    expect(favoriteBtn).toHaveAttribute('src', 'whiteHeartIcon.svg');
    userEvent.click(favoriteBtn);
    expect(favoriteBtn).toHaveAttribute('src', 'blackHeartIcon.svg');
    // const shareBtn = screen.getByTestId('share-btn');
    // userEvent.click(shareBtn);
  });
  it('Testa Drinks Details', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/drinks/15997'] });
    expect(await screen.findByTestId('recipe-title'))
      .toHaveTextContent('GG');
    const favoriteBtn = screen.getByTestId('favorite-btn');
    expect(favoriteBtn).toHaveAttribute('src', 'whiteHeartIcon.svg');
    userEvent.click(favoriteBtn);
    expect(favoriteBtn).toHaveAttribute('src', 'blackHeartIcon.svg');
  });
});
