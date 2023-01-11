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

  const RECIPE_TITLE = 'recipe-title';

  it('Testa Meals Details', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/meals/52977/in-progress'] });
    expect(await screen.findByTestId(RECIPE_TITLE))
      .toHaveTextContent('Corba');
    expect(screen.getByTestId('recipe-category')).toHaveTextContent('Side');
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
    renderWithRouterAndRedux(<App />, { initialEntries: ['/drinks/15997/in-progress'] });
    expect(await screen.findByTestId(RECIPE_TITLE))
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
  });
  it('Testa Drinks Details', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/drinks/15997/in-progress'] });
    expect(await screen.findByTestId(RECIPE_TITLE))
      .toHaveTextContent('GG');
    const ingredient01 = screen.getByTestId('0-ingredient-step');
    userEvent.click(ingredient01);
    await waitFor(
      () => expect(ingredient01).toHaveStyle({ textDecoration: 'line-through' }),
      { timeout: 4000 },
    );
    userEvent.click(ingredient01);
    await waitFor(
      () => expect(ingredient01).toHaveStyle({ textDecoration: 'none' }),
      { timeout: 4000 },
    );
    for (let i = 0; i <= 2; i += 1) {
      userEvent.click(screen.getByTestId(`${i}-ingredient-step`));
    }
    userEvent.click(screen.getByTestId('finish-recipe-btn'));
  });
  it('Testa Meals Details', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/meals/52977/in-progress'] });
    expect(await screen.findByTestId(RECIPE_TITLE))
      .toHaveTextContent('Corba');
    const ingredient01 = screen.getByTestId('0-ingredient-step');
    userEvent.click(ingredient01);
    await waitFor(
      () => expect(ingredient01).toHaveStyle({ textDecoration: 'line-through' }),
      { timeout: 4000 },
    );
    userEvent.click(ingredient01);
    await waitFor(
      () => expect(ingredient01).toHaveStyle({ textDecoration: 'none' }),
      { timeout: 4000 },
    );
    for (let i = 0; i <= 12; i += 1) {
      userEvent.click(screen.getByTestId(`${i}-ingredient-step`));
    }
    userEvent.click(screen.getByTestId('finish-recipe-btn'));
  });
});
