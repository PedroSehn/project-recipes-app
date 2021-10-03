import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  favoritedItem,
  handleToShareBtn,
  handleFavoritedBtn } from '../services/utilityFunctions';
import Context from '../context/Context';
import IconButton from '../mini-components/IconButton';
import ShareIcon from '../images/shareIcon.svg';
import BlackHeart from '../images/blackHeartIcon.svg';
import WhiteHeart from '../images/whiteHeartIcon.svg';

function FoodDetailCard() {
  const { recipeID, ID } = useContext(Context);
  const [allIngredientsMeasures, setAllIngredientsMeasures] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [favorited, setFavorited] = useState(false);
  const [heartChange, setHeartChange] = useState('');
  const totalIngredients = 20;
  const SIX = 6;

  useEffect(() => {
    setFavorited(favoritedItem(ID));
  }, [heartChange]);

  useEffect(() => {
    function getIngredientsAndMeasures() {
      const ingredients = [];
      for (let index = 1; index < totalIngredients; index += 1) {
        const ingredient = recipeID[`strIngredient${index}`];
        const measure = recipeID[`strMeasure${index}`];
        if (ingredient) {
          ingredients.push({ ingredient, measure });
        }
      }
      setAllIngredientsMeasures(ingredients);
    }
    getIngredientsAndMeasures();
  }, []);

  useState(() => {
    async function fetchRecommendations() {
      const responseResult = await (await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')).json();
      setRecommendations(responseResult.meals);
    }
    fetchRecommendations();
  }, []);

  function handleClick(recipe, Id, type, func) {
    handleFavoritedBtn(recipe, Id, type, func);
  }

  return (
    <div>
      <div>
        <img
          style={ { width: '120px' } }
          data-testid="recipe-photo"
          src={ recipeID.strDrinkThumb }
          alt={ recipeID.strDrink }
        />
      </div>
      <div>
        <h2 data-testid="recipe-title">{ recipeID.strDrink }</h2>
        <div>
          <IconButton
            dataTest="share-btn"
            btnImage={ ShareIcon }
            altText="Share Icon"
            btnFunction={ ({ target }) => handleToShareBtn(target, ID, 'bebidas') }
          />
          <IconButton
            dataTest="favorite-btn"
            btnImage={ favorited ? BlackHeart : WhiteHeart }
            altText="Favorited Icon"
            btnFunction={ () => handleClick(recipeID, ID, 'bebida', setHeartChange) }
          />
        </div>
        <h5 data-testid="recipe-category">{ recipeID.strAlcoholic }</h5>
        <div />
        <div>
          {allIngredientsMeasures.length >= 1 ? (
            allIngredientsMeasures.map((ingredient, index) => (
              <div key={ index }>
                <p data-testid={ `${index}-ingredient-name-and-measure` }>
                  { `${ingredient.ingredient} - ${ingredient.measure}` }
                </p>
              </div>
            ))
          ) : <p>Loading...</p>}
        </div>
        <div>
          <p data-testid="instructions">
            {recipeID.strInstructions}
          </p>
        </div>
        <div>
          <p data-testid="video">video</p>
        </div>
        <div>
          {recommendations.length > 1 ? (
            recommendations.map((recommend, index) => (
              index < SIX ? (
                <div data-testid={ `${index}-recomendation-card` } key={ index }>
                  <div>
                    <img
                      style={ { width: '120px' } }
                      src={ recommend.strMealThumb }
                      alt={ recommend.strMeal }
                    />
                  </div>
                  <div>
                    <p>{ recommend.strCategory }</p>
                    <p>{ recommend.strMeal }</p>
                  </div>
                </div>
              ) : null
            ))
          ) : <p>Loading...</p>}
        </div>
        <div>
          <Link to={ `/bebidas/${ID}/in-progress` }>
            <button
              style={ { position: 'fixed', bottom: '0px' } }
              type="button"
              data-testid="start-recipe-btn"
            >
              Iniciar Receita
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default FoodDetailCard;
