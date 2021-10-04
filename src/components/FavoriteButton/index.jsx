import React from 'react';
import PropTypes from 'prop-types';
import { useRecipes } from '../../context';

function FavoriteButton({
  colorBeforeClick,
  colorAfterClick,
  recipe,
  type,
}) {
  const { handleFavorite } = useRecipes();

  return (
    <button
      type="button"
      onClick={ () => {
        handleFavorite(type, recipe, colorAfterClick);
      } }
    >
      <img
        className="favIcon"
        data-testid="favorite-btn"
        src={ `${colorBeforeClick}` }
        alt=""
      />
    </button>
  );
}

FavoriteButton.propTypes = {
  colorBeforeClick: PropTypes.string.isRequired,
  colorAfterClick: PropTypes.string.isRequired,
  recipe: PropTypes.objectOf(PropTypes.string).isRequired,
  type: PropTypes.string.isRequired,
};

export default FavoriteButton;
