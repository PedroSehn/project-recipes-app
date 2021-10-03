import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import getIngredients from '../services/getIngredients';
import shareIcon from '../images/shareIcon.svg';
import FavoriteBtn from '../components/FavoriteBtn';
import RecipeImage from '../components/RecipeImage';
import CheckList from '../components/CheckList';
import ButtonEndRecipe from '../components/ButtonEndRecipe';
import './css/ReceitasInProgress.css';

const copy = require('clipboard-copy');

function ReceitasInProgress({ match: { params: { id } }, type }) {
  const [selectedRecipe, setSelectedRecipe] = useState([]);
  const [modal, setModal] = useState(false);
  const [favorited, setFavorited] = useState(false);
  const [DisableButton, setDisableButton] = useState(true);

  let favoritesFromStorage = localStorage.getItem('favoriteRecipes');
  favoritesFromStorage = JSON.parse(favoritesFromStorage);

  if (favoritesFromStorage && favoritesFromStorage.find((recipe) => recipe.id === id)
    && !favorited) {
    setFavorited(true);
  }

  const endPoints = {
    meal: `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
    drink: `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`,
  };

  useEffect(() => {
    const getDetails = async () => {
      let url = endPoints.meal;
      if (type === 'drinks') {
        url = endPoints.drink;
      }
      let data = await fetch(url);
      data = await data.json();
      setSelectedRecipe(data[type]);
    };
    getDetails();
  }, []);

  const handleShareClick = () => {
    setModal('Link copiado!');
    if (type === 'meals') return copy(`http://localhost:3000/comidas/${id}`);
    copy(`http://localhost:3000/bebidas/${id}`);
  };

  return (
    <div>
      { selectedRecipe.map((recipe, i) => (
        <div className="details-container" key={ i }>
          <RecipeImage type={ type } recipe={ recipe } />
          <div className="details-buttons-and-titles-container">
            <div>
              <h2
                data-testid="recipe-title"
              >
                { type === 'meals' ? recipe.strMeal : recipe.strDrink }
              </h2>
              <h4
                data-testid="recipe-category"
              >
                { type === 'meals' ? recipe.strCategory : recipe.strAlcoholic}
              </h4>
            </div>
            <div className="details-buttons-container">
              <button
                data-testid="share-btn"
                type="button"
                onClick={ handleShareClick }
              >
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
          </div>

          <form className="used-ingredients-container">
            <div className="check-itens-container">

              { getIngredients(selectedRecipe).map((ingredient, index, array) => (

                <CheckList
                  key={ ingredient }
                  qtn={ array.length }
                  set={ setDisableButton }
                  id={ id }
                  type={ type }
                  name={ ingredient }
                  index={ index }
                />

              ))}
            </div>
          </form>
          <div className="detail-instructions-container">
            <h4>Instruções</h4>
            <p data-testid="instructions">{ recipe.strInstructions }</p>
          </div>
          <ButtonEndRecipe disabled={ DisableButton } setDisable={ setDisableButton } />
        </div>
      ))}
    </div>
  );
}

ReceitasInProgress.propTypes = {
  type: PropTypes.string,
  match: PropTypes.object,
}.isRequired;

export default ReceitasInProgress;
