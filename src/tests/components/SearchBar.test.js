import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import SearchBar from '../../components/SearchBar';
import { renderWithRouterAndRedux } from '../../helpers/renderWith';

describe('Testes do componente <SearchBar />', () => {
  const ingredientId = 'ingredient-search-radio';
  const inputId = 'search-input';
  const buttonId = 'exec-search-btn';
  const firstLetter = 'first-letter-search-radio';
  it('', async () => {
    renderWithRouterAndRedux(<SearchBar />, { initialEntries: ['/meals'] });
    const searchInput = await screen.findByTestId(inputId);
    userEvent.type(searchInput, 'beef');
    const inputRadious = await screen.findByTestId(ingredientId);
    userEvent.click(inputRadious);
    const button = await screen.findByTestId(buttonId);
    userEvent.click(button);
    const receita = await screen.findByTestId('0-recipe-card');
    expect(receita).toBeInTheDocument();
  });

  it('', async () => {
    renderWithRouterAndRedux(<SearchBar />, { initialEntries: ['/meals'] });
    const searchInput = await screen.findByTestId(inputId);
    userEvent.type(searchInput, 'beef');
    const inputRadious = await screen.findByTestId(firstLetter);
    userEvent.click(inputRadious);
    const button = await screen.findByTestId(buttonId);
    userEvent.click(button);
  });

  it('', async () => {
    renderWithRouterAndRedux(<SearchBar />, { initialEntries: ['/meals'] });
    const button = await screen.findByTestId(buttonId);
    userEvent.click(button);
  });

  it('', async () => {
    renderWithRouterAndRedux(<SearchBar />, { initialEntries: ['/drinks'] });
    const button = await screen.findByTestId(buttonId);
    userEvent.click(button);
  });

  it('', async () => {
    renderWithRouterAndRedux(<SearchBar />, { initialEntries: ['/meals'] });
    const searchInput = await screen.findByTestId(inputId);
    userEvent.type(searchInput, 'Banana Pancakes');
    const inputRadious = await screen.findByTestId('name-search-radio');
    userEvent.click(inputRadious);
    const button = await screen.findByTestId(buttonId);
    userEvent.click(button);
  });
  it('', async () => {
    renderWithRouterAndRedux(<SearchBar />, { initialEntries: ['/meals'] });
    const searchInput = await screen.findByTestId(inputId);
    userEvent.type(searchInput, 'a');
    const inputRadious = await screen.findByTestId(firstLetter);
    userEvent.click(inputRadious);
    const button = await screen.findByTestId(buttonId);
    userEvent.click(button);
  });
});

describe('', () => {
  const ingredientId = 'ingredient-search-radio';
  const inputId = 'search-input';
  const buttonId = 'exec-search-btn';
  it('', async () => {
    renderWithRouterAndRedux(<SearchBar />, { initialEntries: ['/drinks'] });
    const searchInput = await screen.findByTestId(inputId);
    userEvent.type(searchInput, 'pineapple');
    const inputRadious = await screen.findByTestId(ingredientId);
    userEvent.click(inputRadious);
    const button = await screen.findByTestId(buttonId);
    userEvent.click(button);
    const receita = await screen.findByTestId('0-recipe-card');
    expect(receita).toBeInTheDocument();
    userEvent.click(receita);
  });

  it('', async () => {
    renderWithRouterAndRedux(<SearchBar />, { initialEntries: ['/drinks'] });
    const searchInput = await screen.findByTestId(inputId);
    userEvent.type(searchInput, 'apple');
    const inputRadious = await screen.findByTestId(ingredientId);
    userEvent.click(inputRadious);
    const button = await screen.findByTestId(buttonId);
    userEvent.click(button);
  });
  it('', async () => {
    renderWithRouterAndRedux(<SearchBar />, { initialEntries: ['/drinks'] });
    const searchInput = await screen.findByTestId(inputId);
    userEvent.type(searchInput, 'a');
    const inputRadious = await screen.findByTestId('first-letter-search-radio');
    userEvent.click(inputRadious);
    const button = await screen.findByTestId(buttonId);
    userEvent.click(button);
  });
  it('', async () => {
    renderWithRouterAndRedux(<SearchBar />, { initialEntries: ['/drinks'] });
    const searchInput = await screen.findByTestId(inputId);
    userEvent.type(searchInput, 'GG');
    const inputRadious = await screen.findByTestId('name-search-radio');
    userEvent.click(inputRadious);
    const button = await screen.findByTestId(buttonId);
    userEvent.click(button);
  });
});

describe('', () => {
  // it('', async () => {
  //   renderWithRouterAndRedux(<SearchBar />, { initialEntries: ['/meals'] });
  //   const searchInput = await screen.findByTestId('search-input');
  //   userEvent.type(searchInput, 'potato');
  //   const inputRadious = await screen.findByTestId('ingredient-search-radio');
  //   userEvent.click(inputRadious);
  //   const button = await screen.findByTestId('exec-search-btn');
  //   userEvent.click(button);
  // });
});
