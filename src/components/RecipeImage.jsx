import React from 'react';
import PropTypes from 'prop-types';

function RecipeImage({ type, recipe }) {
  return (
    <img
      data-testid="recipe-photo"
      src={ type === 'meals' ? recipe.strMealThumb : recipe.strDrinkThumb }
      alt="imagem da receita"
      style={ { height: '100px' } }
    />
  );
}

export default RecipeImage;

RecipeImage.propTypes = {
  type: PropTypes.string.isRequired,
  recipe: PropTypes.array,
}.isRequired;
