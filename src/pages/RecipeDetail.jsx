import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import DrinksSlider from '../components/DrinksSlider';
import getIngredients from '../services/getIngredients';
import shareIcon from '../images/shareIcon.svg';
import RecipeButton from '../components/RecipeButton';
import FrameVideo from '../components/FrameVideos';
import FavoriteBtn from '../components/FavoriteBtn';
import RecipeImage from '../components/RecipeImage';
import { fetchInitialMeals, fetchMealsById } from '../services/fetchMeals';
import { fetchInitialDrinks, fetchDrinksById } from '../services/fetchDrinks';
import './css/MealDetails.css';

const copy = require('clipboard-copy');

function RecipeDetail({ match: { params: { id } }, type }) {
  const [selectedRecipe, setSelectedRecipe] = useState([]);
  const [suggestedRecipes, setSuggestedRecipes] = useState([]);
  const [modal, setModal] = useState(false);
  const [favorited, setFavorited] = useState(false);

  let favoritesFromStorage = localStorage.getItem('favoriteRecipes');
  favoritesFromStorage = JSON.parse(favoritesFromStorage);

  if (favoritesFromStorage && favoritesFromStorage.find((recipe) => recipe.id === id)
    && !favorited) {
    setFavorited(true);
  }

  useEffect(() => {
    if (type === 'meals') {
      fetchMealsById(id)
        .then((data) => setSelectedRecipe(data))
        .catch((err) => console.log(err));
      return;
    }
    fetchDrinksById(id)
      .then((data) => setSelectedRecipe(data))
      .catch((err) => console.log(err));
  }, [id, type]);

  useEffect(() => {
    if (type === 'meals') {
      fetchInitialDrinks(id)
        .then((data) => setSuggestedRecipes(data))
        .catch((err) => console.log(err));
      return;
    }

    fetchInitialMeals(id)
      .then((data) => setSuggestedRecipes(data))
      .catch((err) => console.log(err));
  }, [id, type]);

  const handleShareClick = () => {
    setModal('Link copiado!');
    if (type === 'meals') return copy(`http://localhost:3000/comidas/${id}`);
    copy(`http://localhost:3000/bebidas/${id}`);
  };

  if (selectedRecipe) {
    return (
      <div>
        { selectedRecipe.map((recipe, i) => (
          <div key={ i }>
            <RecipeImage type={ type } recipe={ recipe } />
            <h2
              data-testid="recipe-title"
            >
              { type === 'meals' ? recipe.strMeal : recipe.strDrink }
            </h2>
            <div>
              <button data-testid="share-btn" type="button" onClick={ handleShareClick }>
                <img src={ shareIcon } alt="icone de compartilhar" />
              </button>
              { modal }
              <FavoriteBtn
                id={ id }
                type={ type }
                favorited={ favorited }
                selectedRecipe={ selectedRecipe }
                setFavorited={ setFavorited }
              />
            </div>
            <h4
              data-testid="recipe-category"
            >
              { type === 'meals' ? recipe.strCategory : recipe.strAlcoholic}
            </h4>
            <div>
              { getIngredients(selectedRecipe).map((ingredient, index) => (
                <p
                  data-testid={ `${index}-ingredient-name-and-measure` }
                  key={ ingredient }
                >
                  { ingredient }
                </p>
              ))}
            </div>
            <p data-testid="instructions">{ recipe.strInstructions }</p>
            <FrameVideo type={ type } recipe={ recipe } />
            <DrinksSlider type={ type } suggestedRecipes={ suggestedRecipes } />
            <RecipeButton type={ type } id={ id } />
          </div>
        ))}
      </div>
    );
  }
  return null;
}

export default RecipeDetail;

RecipeDetail.propTypes = {
  match: PropTypes.object,
}.isRequired;
