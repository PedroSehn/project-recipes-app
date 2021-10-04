import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function ButtonEndRecipe({ disabled }) {
  const history = useHistory();
  function HandleClick() {
    history.push('/receitas-feitas');
  }
  return (
    <div>
      <button
        onClick={ HandleClick }
        type="button"
        disabled={ disabled }
        data-testid="finish-recipe-btn"
      >
        Finalizar Receita
      </button>
    </div>
  );
}

ButtonEndRecipe.propTypes = {
  disabled: PropTypes.bool,
}.isRequired;
