import React, { useState } from 'react';
import PropTypes from 'prop-types';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';

export default function FavoriteButton({ index, favorite,
  cardFavorite, type, removeItem }) {
  const [favorited, setFavorited] = useState(favorite);

  const imageSource = favorited ? blackHeartIcon : whiteHeartIcon;
  function handleClick() {
    setFavorited(!favorited);
    if (!localStorage.favoriteRecipes) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    }
    const localStorageFavorite = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favorited && localStorageFavorite.length > 0) {
      const newLocalFavorite = localStorageFavorite
        .filter((recipe) => recipe.id !== cardFavorite.id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newLocalFavorite));
      removeItem(newLocalFavorite);
    } else {
      const object = {
        id: cardFavorite[`id${type}`],
        type: type === 'Meal' ? 'comida' : 'bebida',
        area: cardFavorite.strArea || '',
        category: cardFavorite.strCategory,
        alcoholicOrNot: cardFavorite.strAlcoholic || '',
        name: cardFavorite[`str${type}`],
        image: cardFavorite[`str${type}Thumb`],
      };
      const newLocalStorage = [...localStorageFavorite, object];
      localStorage.setItem('favoriteRecipes', JSON.stringify(newLocalStorage));
    }
  }

  function typeButton(img) {
    return (
      <img
        data-testid={ index !== undefined
          ? `${index}-horizontal-favorite-btn`
          : 'favorite-btn' }
        src={ img }
        alt="Botão de favorito"
      />
    );
  }
  return (
    <button
      type="button"
      // data-testid={ index !== undefined
      //   ? `${index}-horizontal-favorite-btn`
      //   : 'favorite-btn' }
      onClick={ handleClick }
      // src={ imageSource }
    >
      {typeButton(imageSource)}
    </button>
  );
}

FavoriteButton.propTypes = {
  removeItem: PropTypes.func.isRequired,
  favorite: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
  cardFavorite: PropTypes.objectOf(PropTypes.object).isRequired,
  type: PropTypes.number.isRequired,
};
