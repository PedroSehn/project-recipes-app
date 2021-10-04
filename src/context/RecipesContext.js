import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from 'react';
import PropTypes from 'prop-types';

const mealsInitialState = {
  categories: [], // Lista de categorias recuperadas pela API
  list: [], // Lista de comidas recuperadas pela API
  inProgress: {}, // Objeto onde cada chave é o id da receita em andamento e o valor correspondente é o array com os ingredientes já marcados
};

const cocktailsInitialState = {
  categories: [], // Lista de categorias recuperadas pela API
  list: [], // Lista de comidas recuperadas pela API
  inProgress: {}, // Objeto onde cada chave é o id da receita em andamento e o valor correspondente é o array com os ingredientes já marcados
};

export const RecipesContext = createContext();

export const RecipesProvider = ({ children }) => {
  const [meals, setMeals] = useState(mealsInitialState);
  const [cocktails, setCocktails] = useState(cocktailsInitialState);
  const [finishedRecipes, setFinishedRecipes] = useState([]);
  const [ingredientsList, setIngredientsList] = useState([]);
  const [areas, setAreas] = useState([]);
  const [mealsByArea, setMealsByArea] = useState([]);
  const [selectedArea, setSelectedArea] = useState('All');
  // const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  const setMealsList = (mealsList) => {
    setMeals({
      ...meals,
      list: mealsList,
    });
  };

  const setCocktailsList = (cocktailsList) => {
    setCocktails({
      ...cocktails,
      list: cocktailsList,
    });
  };

  const getRandomRecipe = useCallback(async (page) => {
    if (page === 'comidas') {
      const { meals: mealsApi } = await fetch('https://www.themealdb.com/api/json/v1/1/random.php').then((response) => response.json());
      return mealsApi[0].idMeal;
    }
    if (page === 'bebidas') {
      const { drinks } = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php').then((response) => response.json());
      return drinks[0].idDrink;
    }
  }, []);

  const fecthIngredients = useCallback(async (type) => {
    const MAX_INGREDIENTS = 12;

    if (type === 'comidas') {
      const { meals: ingredients } = await fetch(
        'https://www.themealdb.com/api/json/v1/1/list.php?i=list',
      ).then((response) => response.json());
      const slice = ingredients.slice(0, MAX_INGREDIENTS);
      setIngredientsList(slice);
      return;
    }

    if (type === 'bebidas') {
      const { drinks: ingredients } = await fetch(
        'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list',
      ).then((response) => response.json());
      const slice = ingredients.slice(0, MAX_INGREDIENTS);
      setIngredientsList(slice);
      return;
    }

    setIngredientsList([]);
  }, []);

  useEffect(() => {
    const load = async () => {
      const MAX_MEALS = 12;

      if (selectedArea === 'All') {
        const { meals: byArea } = await fetch(
          'https://www.themealdb.com/api/json/v1/1/search.php?s=',
        ).then((response) => response.json());
        const slice = byArea.slice(0, MAX_MEALS);

        setMealsByArea(slice);
        return;
      }

      const { meals: byArea } = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?a=${selectedArea}`,
      ).then((response) => response.json());
      const slice = byArea.slice(0, MAX_MEALS);

      setMealsByArea(slice);
    };

    load();
  }, [selectedArea]);

  useEffect(() => {
    const load = async () => {
      const { meals: options } = await fetch(
        'https://www.themealdb.com/api/json/v1/1/list.php?a=list',
      ).then((response) => response.json());

      setAreas([{ strArea: 'All' }, ...options]);
    };

    load();
  }, []);

  const context = {
    getRandomRecipe,
    setMealsList,
    setCocktailsList,
    setFinishedRecipes,
    setSelectedArea,
    selectedArea,
    mealsByArea,
    areas,
    fecthIngredients,
    ingredientsList,
    finishedRecipes,
    meals,
    cocktails,
  };

  return (
    <RecipesContext.Provider value={ context }>
      { children }
    </RecipesContext.Provider>
  );
};

RecipesProvider.propTypes = {
  children: PropTypes.objectOf(PropTypes.any).isRequired,
};

export const useRecipes = () => useContext(RecipesContext);
