import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';
import RecipeCard from '../components/RecipeCard';
import Footer from '../components/Footer';
import { fetchInitialDrinks } from '../services/fetchDrinks';
import FilteringDrinkButtons from '../components/FilteringDrinkButtons';

function Bebidas() {
  const { drinks, setDrinks } = useContext(RecipesContext);
  const maxNumber = 12;

  useEffect(() => {
    fetchInitialDrinks().then((data) => setDrinks(data.slice(0, maxNumber)));
  }, [setDrinks]);
  const renderDrinks = () => (
    drinks.map(({ idDrink, strDrink, strDrinkThumb }, index) => (
      <div key={ strDrink }>
        <RecipeCard
          id={ idDrink }
          name={ strDrink }
          thumb={ strDrinkThumb }
          index={ index }
          recipeType="drink"
        />
      </div>
    ))
  );

  return (
    <div className="main-container">
      <Header pageTitle="Bebidas" haveHeader="active" />
      <div className="recipes-cards-wrapper">
        { drinks && renderDrinks() }
      </div>
      <Footer />
      <FilteringDrinkButtons />
    </div>
  );
}

export default Bebidas;
