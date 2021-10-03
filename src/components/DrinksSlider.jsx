import React from 'react';
import PropTypes from 'prop-types';

function DrinksSlider({ type, suggestedRecipes }) {
  let sliderContent = [];
  const maxIndex = 6;

  if (!suggestedRecipes.length) return <p>loading....</p>;

  if (type === 'meals') {
    sliderContent = suggestedRecipes.slice(0, maxIndex);
    console.log(sliderContent);
  }

  if (type === 'drinks') {
    sliderContent = suggestedRecipes.slice(0, maxIndex);
    console.log(sliderContent);
  }

  const renderSlider = () => (
    <div className="slider-container">
      { sliderContent.map((recipe, index) => (
        <div key={ index } data-testid={ `${index}-recomendation-card` }>
          <img
            src={ recipe.strMealThumb || recipe.strDrinkThumb }
            alt="thumbnail recipe"
            style={ { height: '151px' } }
          />
          <h4
            data-testid={ `${index}-recomendation-title` }
          >
            { recipe.strDrink || recipe.strMeal}
          </h4>
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
  type: PropTypes.string,
  suggestedRecipes: PropTypes.arrayOf(PropTypes.any),
}.isRequired;
