import PropTypes from 'prop-types';
import React from 'react';

function Input({ type, name, id, onChange, value }) {
  return (
    <label htmlFor={ id }>
      <input
        name={ name }
        type={ type }
        id={ id }
        data-testid={ id }
        onChange={ onChange }
        value={ value }
      />
    </label>
  );
}

Input.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default Input;
