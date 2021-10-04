import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

function RecipeButton({ type, id }) {
  const history = useHistory();
  const initialButtonText = 'Iniciar Receita';

  const handleRecipeClick = ({ target }) => {
    if (target.innerText === initialButtonText && type === 'meals') {
      history.push(`/comidas/${id}/in-progress`);
    }
    if (target.innerText === initialButtonText && type === 'drinks') {
      history.push(`/bebidas/${id}/in-progress`);
    }
  };

  let storageData = localStorage.getItem('inProgressRecipes');
  storageData = JSON.parse(storageData);

  let buttonText = initialButtonText;
  if (storageData && storageData.meals && Object.keys(storageData[type]).includes(id)) {
    buttonText = 'Continuar Receita';
  }
  if (storageData && storageData.cocktails
    && Object.keys(storageData.cocktails).includes(id)) {
    buttonText = 'Continuar Receita';
  }
  return (
    <button
      onClick={ handleRecipeClick }
      className="start-recipe-btn"
      data-testid="start-recipe-btn"
      type="button"
    >
      { buttonText }
    </button>
  );
}

export default RecipeButton;

RecipeButton.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};
