import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from '../helpers/renderWith';
import Profile from '../pages/Profile';

describe('Testes do componente <Profile />', () => {
  it('Testa o botão done, e se email existe', () => {
    renderWithRouterAndRedux(<Profile />);
    expect(screen.getByTestId('profile-email')).toBeInTheDocument();
    const button = screen.getByTestId('profile-done-btn');
    userEvent.click(button);
  });
  it('Testa o botão favorite', () => {
    renderWithRouterAndRedux(<Profile />);
    const button = screen.getByTestId('profile-favorite-btn');
    userEvent.click(button);
  });
  it('Testa o botão logout', () => {
    renderWithRouterAndRedux(<Profile />);
    const button = screen.getByTestId('profile-logout-btn');
    userEvent.click(button);
  });
});
