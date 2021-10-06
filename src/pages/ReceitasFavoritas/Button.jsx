import PropTypes from 'prop-types';
import React from 'react';

function Button({ id, onClick, value }) {
  return (
    <button
      type="button"
      id={ id }
      data-testid={ id }
      onClick={ onClick }
    >
      {value}
    </button>
  );
}

Button.propTypes = {
  id: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default Button;
