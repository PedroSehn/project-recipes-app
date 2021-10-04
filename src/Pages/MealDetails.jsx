import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import CustomCarousel from './CustomCarousel';

import FavoriteButton from './Utils/FavoriteButton';

const copy = require('clipboard-copy');

export default function MealDetalis() {
  const [mealDetails, setMealDetails] = useState({});
  const [copyLink, setCopyLink] = useState(false);
  // const [inProgress, setinProgress] = useState(false);
  const [drinks, setDrinks] = useState([]);

  const recipesDone = JSON.parse(localStorage.getItem('doneRecipes'));
  let recipeInProgress = JSON
    .parse(localStorage.getItem('inProgressRecipes'));
  if (recipeInProgress) recipeInProgress = recipeInProgress.meals;
  if (!recipeInProgress) recipeInProgress = {};
  const test = recipesDone || [];
  const SIX = 6;

  // id => API
  const locationToClipboard = useLocation().pathname;
  const getLocation = () => {
    const clipboardLocation = `http://localhost:3000${locationToClipboard}`;
    return clipboardLocation;
  };

  const id = useLocation().pathname.replace('/comidas/', '');
  const test2 = test.some((recipe) => recipe.id === id);

  // ref: Lucas Caribé
  const youtubeSource = mealDetails.strYoutube ? mealDetails
    .strYoutube.replace(/watch\?v=/, 'embed/') : '';
  const str1 = 'accelerometer; autoplay; clipboard-write;';
  const str2 = 'encrypted-media; gyroscope; picture-in-picture';
  const youtubeConf = str1 + str2;
  const TWENTY = 20;

  const ingredientList = [];
  const fetchMealIdAPi = async () => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`).then((res) => res.json());
    setMealDetails(response.meals[0]);
  };

  async function fetchDrinkAPI() {
    const APIDrinks = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    const response = await fetch(APIDrinks).then((resp) => resp.json());
    setDrinks(response.drinks.slice(0, SIX));
  }

  useEffect(() => {
    fetchDrinkAPI();
    fetchMealIdAPi();
  }, []);

  const firstCarousel = drinks.length ? [drinks[0], drinks[2], drinks[4]] : [];
  const secondCarousel = drinks.length ? [drinks[1], drinks[3], drinks[5]] : [];

  for (let index = 1; index <= TWENTY; index += 1) {
    if (mealDetails[`strIngredient${index}`] !== '') {
      ingredientList.push({
        [`ingredients${index}`]: mealDetails[`strIngredient${index}`],
        [`measure${index}`]: mealDetails[`strMeasure${index}`],
      });
    }
  }

  const hiddenButton = (
    <button
      type="button"
      data-testid="start-recipe-btn"
      className="startRecipeButton"
    >
      {recipeInProgress[id] ? 'Continuar Receita' : 'Iniciar Receita'}
    </button>);

  return (
    <>
      <img
        src={ mealDetails.strMealThumb }
        alt="img-Details"
        data-testid="recipe-photo"
      />
      <p data-testid="recipe-title">{ mealDetails.strMeal }</p>
      <button
        onClick={ () => {
          setCopyLink(true);
          copy(getLocation());
        } }
        type="button"
        data-testid="share-btn"
      >
        Compartilhar
      </button>
      <FavoriteButton props={ { mealDetails } } />
      {copyLink && <p>Link copiado!</p>}
      <p data-testid="recipe-category">{mealDetails.strCategory}</p>
      <ul>
        { ingredientList.map((ingredient, index) => (
          <li key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
            {
              `${ingredient[`ingredients${index + 1}`]} 
              - ${ingredient[`measure${index + 1}`]}`
            }
          </li>))}
      </ul>
      <h3>Instruções</h3>
      <p data-testid="instructions">{mealDetails.strInstructions}</p>
      <iframed-block
        w-100
        src={ youtubeSource }
        data-testid="video"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer;
         autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen={ youtubeConf }
      />
      <CustomCarousel props={ { firstCarousel, secondCarousel } } />
      <Link to={ `/comidas/${id}/in-progress` }>
        {!test2 ? hiddenButton : null}
      </Link>
    </>
  );
}
