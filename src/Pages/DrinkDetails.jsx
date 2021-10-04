import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import '../App.css';
import CustomCarousel from './CustomCarousel';
import FavoriteButton from './Utils/FavoriteButton';

const copy = require('clipboard-copy');

export default function DrinkDetalis() {
  const [drinkDetails, setDrinkDetails] = useState({});
  const [copyLink, setCopyLink] = useState(false);
  const [meals, setMeals] = useState([]);
  const SIX = 6;

  const locationToClipboard = useLocation().pathname;
  const getLocation = () => {
    const clipboardLocation = `http://localhost:3000${locationToClipboard}`;
    return clipboardLocation;
  };

  const recipesDone = JSON.parse(localStorage.getItem('doneRecipes'));
  const test = recipesDone || [];
  let recipeInProgress = JSON
    .parse(localStorage.getItem('inProgressRecipes'));
  if (recipeInProgress) recipeInProgress = recipeInProgress.cocktails;
  if (!recipeInProgress) recipeInProgress = {};

  const firstCarousel = meals.length ? [meals[0], meals[2], meals[4]] : [];
  const secondCarousel = meals.length ? [meals[1], meals[3], meals[5]] : [];

  const id = useLocation().pathname.replace('/bebidas/', '');
  const test2 = test.some((recipe) => recipe.id === id);

  // ref: Lucas Caribé
  const youtubeSource = drinkDetails.strYoutube ? drinkDetails
    .strYoutube.replace(/watch\?v=/, 'embed/') : '';
  const str1 = 'accelerometer; autoplay; clipboard-write;';
  const str2 = 'encrypted-media; gyroscope; picture-in-picture';
  const youtubeConf = str1 + str2;
  const TWENTY = 20;

  const ingredientList = [];
  const fetchDrinkIdAPi = async () => {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`).then((res) => res.json());
    setDrinkDetails(response.drinks[0]);
  };

  async function fetchMealAPI() {
    const APIMeals = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    const response = await fetch(APIMeals).then((resp) => resp.json());
    setMeals(response.meals.slice(0, SIX));
  }

  useEffect(() => {
    fetchMealAPI();
    fetchDrinkIdAPi();
  }, []);

  for (let index = 1; index <= TWENTY; index += 1) {
    if (drinkDetails[`strIngredient${index}`]) {
      ingredientList.push({
        [`ingredients${index}`]: drinkDetails[`strIngredient${index}`],
        [`measure${index}`]: drinkDetails[`strMeasure${index}`],
      });
    }
  }

  const hiddenButton = (
    <button type="button" data-testid="start-recipe-btn" className="startRecipeButton">
      {recipeInProgress[id] ? 'Continuar Receita' : 'Iniciar Receita'}
    </button>);

  return (
    <>
      <img
        src={ drinkDetails.strDrinkThumb }
        alt="img-Details"
        data-testid="recipe-photo"
      />
      <p data-testid="recipe-title">{ drinkDetails.strDrink }</p>
      <p data-testid="recipe-category">{ drinkDetails.strAlcoholic }</p>
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
      <FavoriteButton props={ { drinkDetails } } />
      {copyLink && <p>Link copiado!</p>}
      <p data-testid="recipe-category">{drinkDetails.strCategory}</p>
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
      <p data-testid="instructions">{drinkDetails.strInstructions}</p>
      <iframe
        data-testid="video"
        width="560"
        height="315"
        src={ youtubeSource }
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer;
         autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen={ youtubeConf }
      />
      <CustomCarousel props={ { firstCarousel, secondCarousel } } />
      <Link to={ `/bebidas/${id}/in-progress` }>
        {!test2 ? hiddenButton : null}
      </Link>
    </>
  );
}
