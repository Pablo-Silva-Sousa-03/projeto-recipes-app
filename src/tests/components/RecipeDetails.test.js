import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../../App';
import { renderWithRouterAndRedux } from '../../helpers/renderWith';
// import RecipeDetails from '../../pages/RecipeDetails';

describe('Testes do componente <RecipeDetails />', () => {
  beforeEach(() => {
    navigator.clipboard = {
      writeText: jest.fn(),
    };
  });

  it('Testa Meals Details', async () => {
    localStorage.setItem('doneRecipes', JSON.stringify(
      [{
        id: '52977',
        type: 'meal',
        nationality: 'Turkish',
        category: 'Side',
        name: 'Corba',
        image: 'https://www.themealdb.com//images//media//meals//58oia61564916529.jpg',
        doneDate: '05/12/2022',
        tags: ['soup'],
      }, {
        id: '15288',
        type: 'drink',
        nationality: '',
        category: 'Shot',
        alcoholicOrNot: 'Alcoholic',
        name: '252',
        image: 'https://www.thecocktaildb.com//images//media//drink//rtpxqw1468877562.jpg',
        doneDate: '05/12/2021',
        tags: [],
      }],
    ));
    renderWithRouterAndRedux(<App />, { initialEntries: ['/meals/52977'] });
    expect(await screen.findByTestId('recipe-title'))
      .toHaveTextContent('Corba');
    const favoriteBtn = screen.getByTestId('favorite-btn');
    expect(favoriteBtn).toHaveAttribute('src', 'whiteHeartIcon.svg');
    userEvent.click(favoriteBtn);
    expect(favoriteBtn).toHaveAttribute('src', 'blackHeartIcon.svg');
    const shareBtn = screen.getByTestId('share-btn');
    userEvent.click(favoriteBtn);
    userEvent.click(shareBtn);
    await waitFor(
      () => expect(screen.getByText('Link copied!')).toHaveStyle({ display: 'none' }),
      { timeout: 4000 },
    );
    expect(screen.getByTestId('0-recommendation-title')).toBeInTheDocument();
  });
  it('Testa Drinks Details', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/drinks/15997'] });
    expect(await screen.findByTestId('recipe-title'))
      .toHaveTextContent('GG');
    const favoriteBtn = screen.getByTestId('favorite-btn');
    expect(favoriteBtn).toHaveAttribute('src', 'whiteHeartIcon.svg');
    userEvent.click(favoriteBtn);
    expect(favoriteBtn).toHaveAttribute('src', 'blackHeartIcon.svg');
    const shareBtn = screen.getByTestId('share-btn');
    userEvent.click(shareBtn);
    await waitFor(
      () => expect(screen.getByText('Link copied!')).toHaveStyle({ display: 'none' }),
      { timeout: 4000 },
    );
    expect(screen.getByTestId('0-recommendation-title')).toBeInTheDocument();
    userEvent.click(screen.getByTestId('start-recipe-btn'));
  });
});
