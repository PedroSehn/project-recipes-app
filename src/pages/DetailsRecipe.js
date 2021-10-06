/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useCallback } from 'react';
import { useLocation, useParams, useHistory } from 'react-router-dom';
import ReactPlayer from 'react-player';

import './DetailsRecipe.css';

import { useRecipesContext } from '../context/Provider';

import { getDetails, getDefaultData } from '../services';
import ListDetails from './ListDetails';
import RecipesRecommendation from '../components/RecipesRecommendation';
import CopyButton from '../components/CopyButton';
import FavoriteButton from '../components/FavoriteButton';

export default function DetailsRecipe() {
  const [recipeDetails, setRecipeDetails] = useState({});
  const [localData, setLocalData] = useState({
    foods: [],
    drinks: [],
  });

  const history = useHistory();

  const { id } = useParams();
  const { pathname } = useLocation();
  const type = pathname.includes('/comidas/') ? 'foods' : 'drinks';

  const currentPath = pathname.includes('/comidas/') ? '/comidas/' : '/bebidas/';
  const typeUpperCase = pathname.includes('/comidas/') ? 'Meal' : 'Drink';
  const typeCopy = pathname.includes('/comidas') ? 'comida' : 'bebida';

  const { setRecipesApp } = useRecipesContext();

  const setInitialData = useCallback(async () => {
    setRecipesApp((prevState) => ({ ...prevState, loading: true }));
    const { meals } = await getDefaultData('foods');
    const { drinks } = await getDefaultData('drinks');
    setLocalData((prevData) => ({ ...prevData, foods: meals, drinks }));
    setRecipesApp((prevState) => ({ ...prevState, loading: false }));
  }, []);
  useEffect(() => { setInitialData(); }, [setInitialData]);

  // Executa a função "getItem" quando o componente é montado;

  useEffect(() => {
    const getItem = async (itemType, itemID) => {
      setRecipesApp((prevState) => ({ ...prevState, loading: true }));
      const item = await getDetails(itemType, itemID);
      const [details] = item.meals || item.drinks;

      // Salva os detalhes recebidos pela API no estado;
      setRecipesApp((prevState) => ({ ...prevState, loading: false }));
      setRecipeDetails(details);
    };
    getItem(type, id);
  }, [id, setRecipeDetails, type, setRecipesApp]);

  const itemKeys = Object.keys(recipeDetails);

  // Cria um array a partir dos ingredientes disponíveis;
  const ingredients = itemKeys
    .filter((key) => key.includes('strIngredient') && recipeDetails[key])
    .map((key) => recipeDetails[key]);

  // Cria um array a partir das medidas disponíveis;
  const measures = itemKeys
    .filter((key) => key.includes('strMeasure') && recipeDetails[key])
    .map((key) => recipeDetails[key]);

  if (localData[type].length <= 0) return <p>Loading...</p>;

  return (
    <div className="card">
      <img
        src={ recipeDetails.strDrinkThumb || recipeDetails.strMealThumb }
        data-testid="recipe-photo"
        alt={ recipeDetails.strDrink }
        className="main-image card-img-top"
      />
      <div className="details-container card-body">
        <div className="details-title-container">
          <h1 classeName="card-title" data-testid="recipe-title">
            { recipeDetails.strDrink || recipeDetails.strMeal }
          </h1>
        </div>
        <div
          style={ {
            display: 'flex',
            justifyContent: 'center' } }
        >
          <CopyButton
            pathname={ pathname }
            typeUrl={ `${typeCopy}s/${id}` }
          />
          <FavoriteButton cardFavorite={ recipeDetails } type={ typeUpperCase } />
        </div>
        <hr />
        <h2>Ingredients</h2>
        <ul className="details-info-container">
          <ListDetails
            ingredients={ ingredients }
            measures={ measures }
          />
        </ul>
        <hr />
        <h2>
          { 'Category: ' }
          <span data-testid="recipe-category">
            { recipeDetails.strAlcoholic || recipeDetails.strCategory }
          </span>
        </h2>
        <hr />
        <h2>Instructions</h2>
        <p
          data-testid="instructions"
          className="details-info-container card-text"
        >
          { recipeDetails.strInstructions }
        </p>
        { recipeDetails.strDrink && <p>{ `Cup: ${recipeDetails.strGlass}` }</p> }
        { type === 'foods' && (
          <ReactPlayer
            url={ recipeDetails.strYoutube }
            controls
            width="70%"
            height="400px"
            data-testid="video"
          />
        ) }
      </div>
      <button
        type="button"
        data-testid="start-recipe-btn"
        className="start-recipe-btn"
        onClick={ () => history.push(`${currentPath}${id}/in-progress`) }
      >
        Iniciar Receita
      </button>
      <hr />
      <RecipesRecommendation type={ type } />
    </div>
  );
}
