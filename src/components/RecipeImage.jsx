import React from 'react';
import PropTypes from 'prop-types';

function RecipeImage({ type, recipe }) {
  return (
    <img
      className="detail-img"
      data-testid="recipe-photo"
      src={ type === 'meals' ? recipe.strMealThumb : recipe.strDrinkThumb }
      alt="imagem da receita"
    />
  );
}

export default RecipeImage;

RecipeImage.propTypes = {
  type: PropTypes.string.isRequired,
  recipe: PropTypes.array,
}.isRequired;
