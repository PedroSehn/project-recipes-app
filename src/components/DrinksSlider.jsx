import React from 'react';
import PropTypes from 'prop-types';
import './css/DrinksSlider.css';

function DrinksSlider({ type, suggestedRecipes }) {
  const sliderContent = [];
  const maxIndex = 6;

  if (suggestedRecipes.length && type === 'meals') {
    for (let i = 0; i < maxIndex; i += 1) {
      sliderContent.push({ thumb: suggestedRecipes[i].strDrinkThumb,
        name: suggestedRecipes[i].strDrink });
    }
  } else if (suggestedRecipes.length && type === 'drinks') {
    for (let i = 0; i < maxIndex; i += 1) {
      sliderContent.push({ thumb: suggestedRecipes[i].strMealThumb,
        name: suggestedRecipes[i].strMeal });
    }
  }

  const renderSlider = () => (
    <div className="slider-container">
      { sliderContent.map(({ thumb, name }, index) => (
        <div key={ index } data-testid={ `${index}-recomendation-card` }>
          <img src={ thumb } alt="thumbnail recipe" style={ { height: '151px' } } />
          <h4 data-testid={ `${index}-recomendation-title` }>{ name }</h4>
        </div>
      ))}
    </div>
  );

  return (
    <div>
      { suggestedRecipes.length && renderSlider() }
    </div>
  );
}

export default DrinksSlider;

DrinksSlider.propTypes = {
  suggestedRecipes: PropTypes.arrayOf(PropTypes.any),
  type: PropTypes.string,
}.isRequired;
