import React, { useState } from 'react';
import { useLocation } from 'react-router';
import PropTypes from 'prop-types';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';

export default function FavoriteButton({ props: { mealDetails, drinkDetails } }) {
  const [favorite, setFavorite] = useState(false);
  const location = useLocation().pathname.includes('/comidas');
  const mealId = useLocation().pathname.replace('/comidas/', '');
  const drinkId = useLocation().pathname.replace('/bebidas/', '');

  const favoriteRecipes = JSON
    .parse(localStorage.getItem('favoriteRecipes')) || [];
  const blackOrWhite = location ? favoriteRecipes
    .some((item) => item.id === mealId) : favoriteRecipes
    .some((item) => item.id === drinkId);

  if (!localStorage.getItem('favoriteRecipes')) {
    localStorage.setItem('favoriteRecipes', '[]');
  }

  const setFavoriteMealsRecipes = () => {
    const recipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const storeMealRecipe = { id: mealDetails.idMeal,
      category: mealDetails.strCategory,
      type: 'comida',
      area: mealDetails.strArea,
      alcoholicOrNot: '',
      name: mealDetails.strMeal,
      image: mealDetails.strMealThumb,
    };
    recipes.push(storeMealRecipe);
    const recipesToStore = JSON.stringify(recipes);
    localStorage.setItem('favoriteRecipes', recipesToStore);
    setFavorite(!favorite);
  };
  const setFavoriteDrinksRecipes = () => {
    const recipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const storeDrinkRecipe = { id: drinkDetails.idDrink,
      category: drinkDetails.strCategory,
      type: 'bebida',
      area: '',
      alcoholicOrNot: drinkDetails.strAlcoholic,
      name: drinkDetails.strDrink,
      image: drinkDetails.strDrinkThumb,
    };

    recipes.push(storeDrinkRecipe);
    const recipesToStore = JSON.stringify(recipes);
    localStorage.setItem('favoriteRecipes', recipesToStore);
    setFavorite(!favorite);
  };

  const removeFavoriteMealsRecipes = () => {
    const recipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const favRecipes = JSON.stringify(recipes.filter((recipe) => recipe.id !== mealId));
    localStorage.setItem('favoriteRecipes', favRecipes);
    setFavorite(!favorite);
  };

  const removeFavoriteDrinksRecipes = () => {
    const recipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const favRecipes = JSON.stringify(recipes.filter((recipe) => recipe.id !== drinkId));
    localStorage.setItem('favoriteRecipes', favRecipes);
    setFavorite(!favorite);
  };

  const test = blackOrWhite ? removeFavoriteMealsRecipes : setFavoriteMealsRecipes;

  const setOrRemoveFavoriteMealsRecipes = () => {
    test();
  };
  const setOrRemoveFavoriteDrinkRecipes = () => {
    if (!blackOrWhite) setFavoriteDrinksRecipes();
    if (blackOrWhite) removeFavoriteDrinksRecipes();
  };

  return (
    <button
      type="button"
      onClick={ () => {
        if (location) setOrRemoveFavoriteMealsRecipes();
        if (!location) setOrRemoveFavoriteDrinkRecipes();
      } }
    >
      <img
        data-testid="favorite-btn"
        src={ blackOrWhite ? blackHeartIcon : whiteHeartIcon }
        alt="A black heart Icon"
      />
    </button>
  );
}

FavoriteButton.propTypes = {
  props: {
    mealDetails: {
      idMeal: PropTypes.string.isRequired,
      strCategory: PropTypes.string.isRequired,
      strArea: PropTypes.string.isRequired,
      strMeal: PropTypes.string.isRequired,
      strMealThumb: PropTypes.string.isRequired,
    }.isRequired,
    drinkDetails: {
      idDrink: PropTypes.string.isRequired,
      strCategory: PropTypes.string.isRequired,
      strAlcoholic: PropTypes.string.isRequired,
      strDrink: PropTypes.string.isRequired,
      strDrinkThumb: PropTypes.string.isRequired,
    }.isRequired,
  }.isRequired,
};
