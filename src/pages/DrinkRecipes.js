import React from 'react';
import ButtonsOfCategory from '../components/ButtonsOfCategorys';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RenderCards from '../components/RenderCards';
import RenderCardSearch from '../components/RenderCardSearch';
import SearchInput from '../components/SearchInput';
import { useRecipesContext } from '../context/Provider';
import { fetchApiRecipesDrinkMain, fetchApiRecipes,
  fetchApiListDrink, fetchApiCategoryDrink } from '../services';

export default function DrinkRecipes() {
  const { recipesApp } = useRecipesContext();

  return (
    <>
      <header className="header">
        <Header
          title="Bebidas"
        />
        <SearchInput
          fetchFood={ fetchApiRecipes }
          typeLowCase="drinks"
          typeUpperCase="Drink"
        />
      </header>
      {recipesApp.dataCategoryFoodAPI.length === 0
        ? (
          <>
            <ButtonsOfCategory
              typeCategory="drinks"
              func={ fetchApiListDrink }
              funcFilter={ fetchApiCategoryDrink }
            />
            <RenderCards
              func={ fetchApiRecipesDrinkMain }
              type="Drink"
              typeCards="drinks"
            />
            <Footer />
          </>
        )
        : (
          <>
            <RenderCardSearch
              cards={ recipesApp.dataCategoryFoodAPI }
              type="Drink"
            />
            <Footer />
          </>
        )}
    </>
  );
}
