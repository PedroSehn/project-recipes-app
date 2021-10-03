import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';
import RecipeCard from '../components/RecipeCard';
import Footer from '../components/Footer';
import { fetchInitialMeals } from '../services/fetchMeals';
import FilteringMealsButtons from '../components/FilteringMealsButtons';
import './css/Comidas.css';

function Comidas() {
  const { meals, setMeals } = useContext(RecipesContext);
  const maxNumber = 12;

  useEffect(() => {
    fetchInitialMeals()
      .then((data) => setMeals(data.slice(0, maxNumber)));
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
    <div className="main-container">
      <Header pageTitle="Comidas" haveHeader="active" />
      <div className="recipes-cards-wrapper">
        { meals && renderMeals() }
      </div>
      <FilteringMealsButtons />
      <Footer />
    </div>
  );
}

export default Comidas;
