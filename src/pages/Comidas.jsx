import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';
import RecipeCard from '../components/RecipeCard';
import Footer from '../components/Footer';
import { fetchInitialMeals } from '../services/fetchMeals';
import FilteringMealsButtons from '../components/FilteringMealsButtons';

function Comidas() {
  const { meals, setMeals } = useContext(RecipesContext);

  useEffect(() => {
    fetchInitialMeals()
      .then((data) => setMeals([...data]));
  }, [setMeals]);

  const renderMeals = () => (
    meals.map(({ idMeal, strMeal, strMealThumb }, index) => (
      <div key={ strMeal }>
        <RecipeCard
          id={ idMeal }
          name={ strMeal }
          thumb={ strMealThumb }
          index={ index }
          recipeType="meal"
        />
      </div>
    ))
  );

  return (
    <div>
      <Header pageTitle="Comidas" haveHeader="active" />
      <div>comidas</div>
      { meals && renderMeals() }
      <Footer />
      <FilteringMealsButtons />
    </div>
  );
}

export default Comidas;
