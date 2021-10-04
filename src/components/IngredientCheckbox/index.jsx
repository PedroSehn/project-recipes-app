import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

function IngredientCheckbox({
  ingredient,
  index,
  ingredientsChecked,
  setIngredientsChecked,
  setAllChecked,
}) {
  // Referência para implementar lógica de checar as checkbox: https://stackoverflow.com/questions/5541387/check-if-all-checkboxes-are-selected
  const checkAllCheckbox = () => {
    const allCheckbox = document.querySelectorAll('.ingredient-checkbox');
    const allCheckboxChecked = document.querySelectorAll('.ingredient-checkbox:checked');
    if (allCheckboxChecked.length === allCheckbox.length) {
      setAllChecked(true);
    } else {
      setAllChecked(false);
    }
  };

  const checkStyle = () => {
    const getCheckedFromLocalStorage = localStorage.getItem('checkedIngredients');
    if (getCheckedFromLocalStorage && Object.values(ingredientsChecked)) {
      const checkboxStatus = Object
        .values(JSON.parse(getCheckedFromLocalStorage));
      const ingredientsCheckedStatus = Object.values(ingredientsChecked);
      if (checkboxStatus[index] || ingredientsCheckedStatus[index]) {
        return { textDecoration: 'line-through' };
      }
      return { textDecoration: 'none' };
    }
  };

  useEffect(() => {
    checkAllCheckbox();
  }, []);

  const checkIngredient = (target) => {
    if (!target.checked) {
      setIngredientsChecked({
        ...ingredientsChecked,
        [target.id]: false,
      });
      target.parentElement.style.textDecoration = 'none';
      checkAllCheckbox();
    } else {
      setIngredientsChecked({
        ...ingredientsChecked,
        [target.id]: true,
      });
      target.parentElement.style.textDecoration = 'line-through';
      checkAllCheckbox();
    }
  };

  return (
    <div data-testid={ `${index}-ingredient-step` }>
      <label htmlFor={ `${index}-ingredient-step` } style={ checkStyle() }>
        <input
          className="ingredient-checkbox"
          id={ `${index}-ingredient-step` }
          type="checkbox"
          name="ingredients"
          checked={ ingredientsChecked
            ? (/true/i).test(ingredientsChecked[`${index}-ingredient-step`]) : false }
          onChange={ (e) => checkIngredient(e.target) }
        />
        {ingredient}
      </label>
    </div>
  );
}

IngredientCheckbox.propTypes = {
  ingredient: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  ingredientsChecked: PropTypes.objectOf(PropTypes.any).isRequired,
  setIngredientsChecked: PropTypes.func.isRequired,
  setAllChecked: PropTypes.func.isRequired,
};

export default IngredientCheckbox;
