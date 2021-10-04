import React from 'react';
import { screen } from '@testing-library/react';
import { Route } from 'react-router';

import Detalhes from './index';
import {
  mealRecipeMock,
  mealIngredientsMock,
} from '../../utils/__mocks__/detailsMocks';

import render from '../../utils/renderWithRouterAndContext';

describe('In Progress Page should', () => {
  it('render the meal details page correctly', () => {
    render(
      <Route path="/comidas/:id/in-progress">
        <Detalhes />
      </Route>, {
        initialEntries: ['/comidas/52900/in-progress'],
        detailsProps: {
          fetchRecommendations: () => {},
          fetchRecipe: () => {},
          item: { meal: [mealRecipeMock] },
          ingredients: mealIngredientsMock,
        },
      },
    );

    const recipeImg = screen.getByTestId('recipe-photo');
    const recipeTitle = screen.getByTestId('recipe-title');
    const shareBtn = screen.getByTestId('share-btn');
    const favBtn = screen.getByTestId('favorite-btn');
    const recipeCategory = screen.getByTestId('recipe-category');
    const recipeIngredients = screen.getAllByTestId(/ingredient/i);
    const recipeInstructions = screen.getByTestId('instructions');
    const recipeVideo = screen.getByTestId('video');
    const finishBtn = screen.getByTestId('finish-recipe-btn');

    expect(recipeImg).toBeInTheDocument();
    expect(recipeTitle).toBeInTheDocument();
    expect(shareBtn).toBeInTheDocument();
    expect(favBtn).toBeInTheDocument();
    expect(recipeCategory).toBeInTheDocument();

    recipeIngredients.forEach((ingredient) => expect(ingredient).toBeInTheDocument());

    expect(recipeInstructions).toBeInTheDocument();
    expect(recipeVideo).toBeInTheDocument();

    expect(finishBtn).toBeInTheDocument();
  });
});
