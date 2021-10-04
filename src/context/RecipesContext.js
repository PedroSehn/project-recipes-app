import React, {
  createContext,
  useContext,
  useState,
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
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

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

  // Referência: https://stackoverflow.com/questions/1026069/how-do-i-make-the-first-letter-of-a-string-uppercase-in-javascript
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const disfavorRecipe = (favRecipe, type) => {
    const property = capitalizeFirstLetter(type);
    setFavoriteRecipes((prevState) => [...prevState
      .filter((fav) => fav.id !== (favRecipe[`id${property}`] || favRecipe.id))]);
  };

  const favoriteTypes = {
    meal: (type, recipe, colorAfter) => {
      const favRecipe = {
        id: (recipe.idMeal || recipe.id),
        type: 'comida',
        area: (recipe.strArea || recipe.area),
        category: (recipe.strCategory || recipe.category),
        alcoholicOrNot: '',
        name: (recipe.strMeal || recipe.name),
        image: (recipe.strMealThumb || recipe.image),
      };
      if (favoriteRecipes.some((fav) => fav.id === (recipe.idMeal || recipe.id))) {
        disfavorRecipe(recipe, type);
      } else {
        setFavoriteRecipes((prevState) => [...prevState, favRecipe]);
      } document.querySelector('.favIcon').setAttribute('src', `${colorAfter}`);
    },
    drink: (type, recipe, colorAfter) => {
      const favRecipe = {
        id: (recipe.idDrink || recipe.id),
        type: 'bebida',
        area: '',
        category: (recipe.strCategory || recipe.category),
        alcoholicOrNot: (recipe.strAlcoholic || recipe.alcoholicOrNot),
        name: (recipe.strDrink || recipe.name),
        image: (recipe.strDrinkThumb || recipe.image),
      };
      if (favoriteRecipes.some((fav) => fav.id === (recipe.idDrink || recipe.id))) {
        disfavorRecipe(recipe, type);
      } else {
        setFavoriteRecipes((prevState) => [...prevState, favRecipe]);
      } document.querySelector('.favIcon').setAttribute('src', `${colorAfter}`);
    },
  };

  const handleFavorite = (type,
    recipe,
    colorAfter) => favoriteTypes[type](type, recipe, colorAfter);

  // Referência para capturar a data: https://stackoverflow.com/questions/11971130/converting-a-date-to-european-format

  const finishedTypes = {
    meal: (recipe) => {
      const doneRecipe = {
        id: (recipe.idMeal || recipe.id),
        type: 'comida',
        area: (recipe.strArea || recipe.area),
        category: (recipe.strCategory || recipe.category),
        alcoholicOrNot: '',
        name: (recipe.strMeal || recipe.name),
        image: (recipe.strMealThumb || recipe.image),
        doneDate: new Date().toLocaleDateString('en-GB'),
        tags: ((recipe.strTags || recipe.tags)
          ? ([...recipe.strTags.split(',')] || [...recipe.tags.split(',')]) : []),
      };
      setFinishedRecipes((prevState) => [...prevState, doneRecipe]);
    },
    drink: (recipe) => {
      const doneRecipe = {
        id: (recipe.idDrink || recipe.id),
        type: 'bebida',
        area: '',
        category: (recipe.strCategory || recipe.category),
        alcoholicOrNot: (recipe.strAlcoholic || recipe.alcoholicOrNot),
        name: (recipe.strDrink || recipe.name),
        image: (recipe.strDrinkThumb || recipe.image),
        doneDate: new Date().toLocaleDateString('en-GB'),
        tags: ((recipe.strTags || recipe.tags)
          ? ([...recipe.strTags.split(',')] || [...recipe.tags.split(',')]) : []),
      };
      setFinishedRecipes((prevState) => [...prevState, doneRecipe]);
    },
  };

  const handleFinished = (type, recipe) => finishedTypes[type](recipe);

  const setInProgress = (obj, id, ingredients) => ({
    ...obj,
    inProgress: {
      ...obj.inProgress,
      [id]: ingredients,
    },
  });

  const inProgressTypes = {
    bebidas: (id, ingredients) => {
      setCocktails((prevState) => setInProgress(prevState, id, ingredients));
    },
    comidas: (id, ingredients) => {
      setMeals((prevState) => setInProgress(prevState, id, ingredients));
    },
  };

  const handleInProgress = (type,
    id,
    ingredients) => inProgressTypes[type](id, ingredients);

  useEffect(() => {
    const getFavFromLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (getFavFromLocalStorage !== null) {
      setFavoriteRecipes([...getFavFromLocalStorage]);
    }
    const getDoneFromLocalStorage = JSON.parse(localStorage.getItem('doneRecipes'));
    if (getDoneFromLocalStorage !== null) {
      setFinishedRecipes([...getDoneFromLocalStorage]);
    }
    const getInProgressFromLocalStorage = JSON
      .parse(localStorage.getItem('inProgressRecipes'));
    if (getInProgressFromLocalStorage !== null) {
      setMeals((prevState) => ({
        ...prevState,
        inProgress: getInProgressFromLocalStorage.meals,
      }));
      setCocktails((prevState) => ({
        ...prevState,
        inProgress: getInProgressFromLocalStorage.cocktails,
      }));
    }
  }, []);

  useEffect(() => {
    if (favoriteRecipes.length === 0) {
      localStorage.setItem('favoriteRecipes', '[]');
    } else if (favoriteRecipes.some((fav) => fav.id)) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([...favoriteRecipes]));
    }
  }, [favoriteRecipes]);

  useEffect(() => {
    if (finishedRecipes.length === 0) {
      localStorage.setItem('doneRecipes', '[]');
    } else if (finishedRecipes.some((done) => done.id)) {
      localStorage.setItem('doneRecipes', JSON.stringify([...finishedRecipes]));
    }
  }, [finishedRecipes]);

  const context = {
    setMealsList,
    setCocktailsList,
    setFinishedRecipes,
    handleFavorite,
    handleFinished,
    handleInProgress,
    favoriteRecipes,
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
