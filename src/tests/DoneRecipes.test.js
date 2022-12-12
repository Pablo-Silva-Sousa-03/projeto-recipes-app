import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { renderWithRouterAndRedux } from '../helpers/renderWith';
import DoneRecipes from '../pages/DoneRecipes';

describe('Testes do componente <DoneRecipes />', () => {
  beforeEach(() => {
    navigator.clipboard = {
      writeText: jest.fn(),
    };
  });

  it('', async () => {
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

    renderWithRouterAndRedux(<DoneRecipes />, { initialEntries: ['/done-recipes'] });
    const shareBtn = screen.getByTestId('0-horizontal-share-btn');
    userEvent.click(shareBtn);
    const copiedSpan = screen.getAllByText('Link copied!');
    await waitFor(
      () => expect(copiedSpan[0]).toHaveStyle({ display: 'none' }),
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
});
