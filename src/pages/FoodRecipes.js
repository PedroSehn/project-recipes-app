import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RenderCardSearch from '../components/RenderCardSearch';
import SearchInput from '../components/SearchInput';
import { fetchApiCategoryFood, fetchApiListFood,
  fetchApiRecipes, fetchApiRecipesFoodMain } from '../services';
import RenderCards from '../components/RenderCards';
import ButtonsOfCategory from '../components/ButtonsOfCategorys';
import '../css/foodRecipes.css';
import { useRecipesContext } from '../context/Provider';

export default function FoodRecipes() {
  const { recipesApp } = useRecipesContext();
  return (
    <>
      <header className="header">
        <Header
          title="Comidas"
        />
        <SearchInput
          fetchFood={ fetchApiRecipes }
          typeLowCase="meals"
          typeUpperCase="Meal"
        />
      </header>
      {recipesApp.dataCategoryFoodAPI.length === 0
        ? (
          <>
            <ButtonsOfCategory
              typeCategory="meals"
              func={ fetchApiListFood }
              funcFilter={ fetchApiCategoryFood }
            />
            <RenderCards func={ fetchApiRecipesFoodMain } type="Meal" typeCards="meals" />
            <Footer />
          </>
        )
        : (
          <>
            <RenderCardSearch cards={ recipesApp.dataCategoryFoodAPI } type="Meal" />
            <Footer />
          </>
        )}
    </>
  );
}
