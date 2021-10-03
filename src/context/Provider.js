import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

function Provider({ children }) {
  const [showHeader, setShowHeader] = useState(false);
  const [titleName, setTitleName] = useState('');
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [showFooter, setShowFooter] = useState(false);
  const [showSearchHeaderIcon, setShowSearchHeaderIcon] = useState(true);
  const [filteredItem, setFilteredItem] = useState([]);
  const [filterRadio, setFilterRadio] = useState('s');
  const [filterText, setFilterText] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState('');
  const [foods, setFoods] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [categoryFoodButtons, setCategoryFoodButtons] = useState([]);
  const [categoryDrinkButtons, setCategoryDrinkButtons] = useState([]);
  const [filtered, setFiltered] = useState(false);
  const [filterButton, setFilterButton] = useState('');
  const [recipeID, setRecipeID] = useState('');
  const [ID, setID] = useState('');
  const [foods, setFoods] = useState([]);
  const [drinks, setDrinks] = useState([]);

  async function fetchFood() {
    let endPoint = `https://www.themealdb.com/api/json/v1/1/search.php?${filterRadio}=${filterText}`;
    if (filterRadio === 'i') {
      endPoint = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${filterText}`;
    }
    const request = await fetch(endPoint);
    const response = await request.json();
    const data = response.meals;
    if (data !== null) {
      setFoods(data);
    } else {
      global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
  }

  async function fetchDrink() {
    let endPoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?${filterRadio}=${filterText}`;
    if (filterRadio === 'i') {
      endPoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${filterText}`;
    }
    const request = await fetch(endPoint);
    const response = await request.json();
    const data = response.drinks;
    if (data !== null) {
      setDrinks(data);
    } else {
      global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
  }

  const contextDefault = {
    showHeader,
    showSearchBar,
    showFooter,
    showSearchHeaderIcon,
    titleName,
    filteredItem,
    filterRadio,
    filterText,
    filteredRecipes,
    foods,
    drinks,
    categoryFoodButtons,
    categoryDrinkButtons,
    filtered,
    filterButton,
    recipeID,
    ID,
    setShowHeader,
    setShowSearchBar,
    setShowFooter,
    setShowSearchHeaderIcon,
    setTitleName,
    setFilteredItem,
    setFilterRadio,
    setFilterText,
    fetchFood,
    fetchDrink,
    setFilteredRecipes,
    setFoods,
    setDrinks,
    setCategoryFoodButtons,
    setCategoryDrinkButtons,
    setFiltered,
    setFilterButton,
    setRecipeID,
    setID,
  };

  return (
    <Context.Provider value={ contextDefault }>
      {children}
    </Context.Provider>
  );
}

export default Provider;

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
