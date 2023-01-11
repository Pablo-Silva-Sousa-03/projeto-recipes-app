import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { renderWithRouterAndRedux } from '../helpers/renderWith';
import FavoriteRecipes from '../pages/FavoriteRecipes';

describe('Testes do componente <FavoriteRecipes />', () => {
  beforeEach(() => {
    navigator.clipboard = {
      writeText: jest.fn(),
    };
  });

  it('', async () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(
      [{
        id: '52977',
        type: 'meal',
        nationality: 'Turkish',
        category: 'Side',
        name: 'Corba',
        image: 'https://www.themealdb.com//images//media//meals//58oia61564916529.jpg',
        tags: ['soup'],
      }, {
        id: '15288',
        type: 'drink',
        nationality: '',
        category: 'Shot',
        alcoholicOrNot: 'Alcoholic',
        name: '252',
        image: 'https://www.thecocktaildb.com//images//media//drink//rtpxqw1468877562.jpg',
        tags: [],
      }],
    ));

    renderWithRouterAndRedux(<FavoriteRecipes />, { initialEntries: ['/favorite-recipes'] });
    const shareBtn = await screen.findByTestId('0-horizontal-share-btn');
    userEvent.click(shareBtn);
    userEvent.click(screen.getByTestId('0-horizontal-favorite-btn'));
    const copiedSpan = screen.getAllByText('Link copied!');
    expect(copiedSpan[0]).toHaveStyle({ display: 'block' });
    await waitFor(
      () => expect(copiedSpan[0]).not.toBeInTheDocument(),
      { timeout: 4000 },
    );
    const filterMealsButton = screen.getByTestId('filter-by-meal-btn');
    userEvent.click(filterMealsButton);
    const filterDrinksButton = screen.getByTestId('filter-by-drink-btn');
    userEvent.click(filterDrinksButton);
    const filterAllButton = screen.getByTestId('filter-by-all-btn');
    userEvent.click(filterAllButton);
    const imagelink = screen.getByTestId('0-horizontal-image');
    userEvent.click(imagelink);
  });
  it('', async () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(
      null,
    ));
    renderWithRouterAndRedux(<FavoriteRecipes />, { initialEntries: ['/favorite-recipes'] });
    const filterAllButton = screen.getByTestId('filter-by-all-btn');
    userEvent.click(filterAllButton);
  });
});
