import React, { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';
import { fetchMealByCategory, fetchInitialMeals } from '../services/fetchMeals';
import { fetchDrinkByCategory, fetchInitialDrinks } from '../services/fetchDrinks';

const NUMBER_OF_BUTTONS = 5;

function GenerateButtons(filterButtons, type) {
  const maxNumber = 12;
  const {
    setMeals,
    setDrinks,
    currentCategory,
    setCurrentCategory,
  } = useContext(RecipesContext);

  function handleClick(category, btnType) {
    if ((currentCategory === category) || btnType === 'all') {
      fetchInitialMeals()
        .then((data) => {
          setMeals(data.slice(0, maxNumber));
          setCurrentCategory('');
        });
      fetchInitialDrinks()
        .then((data) => {
          setDrinks(data.slice(0, maxNumber));
          setCurrentCategory('');
        });
      return;
    }

    if (btnType === 'meal') {
      fetchMealByCategory(category).then((data) => setMeals(data.slice(0, maxNumber)));
      setCurrentCategory(category);
    } else {
      fetchDrinkByCategory(category).then((data) => setDrinks(data.slice(0, maxNumber)));
      setCurrentCategory(category);
    }
  }

  const categories = filterButtons.map(({ strCategory }) => strCategory);
  return (
    <div className="filter-recipes-btns">
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ () => handleClick('', 'all') }
      >
        All
      </button>
      {categories.slice(0, NUMBER_OF_BUTTONS).map((category) => (
        <button
          type="button"
          key={ category }
          data-testid={ `${category}-category-filter` }
          onClick={ () => handleClick(category, type) }
        >
          { category }
        </button>
      ))}
    </div>
  );
}

export default GenerateButtons;
