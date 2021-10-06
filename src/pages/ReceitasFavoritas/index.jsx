import React, { useState } from 'react';
import './index.css';
import PropTypes from 'prop-types';
import { useRecipes } from '../../context';

import Header from '../../components/Header';
import Button from './Button';

import shareIcon from '../../images/shareIcon.svg';
import whiteHeart from '../../images/whiteHeartIcon.svg';
import blackHeart from '../../images/blackHeartIcon.svg';

function FavoriteRecipes({ history }) {
  // filtro
  const [food, setFood] = useState(false);
  const [drink, setDrink] = useState(false);
  // copia
  const [url, setUrl] = useState(false);

  const { favoriteRecipes, handleFavorite } = useRecipes();

  const checkFavorites = (obj, index, type) => {
    const checkIfIsFavorite = favoriteRecipes
      .some((fav) => fav.id === obj.id);
    if (checkIfIsFavorite) {
      return (
        <button
          className="buttonDrinks"
          key={ index }
          type="button"
          onClick={ () => handleFavorite(type, obj, whiteHeart) }
        >
          <img
            className="favIcon"
            data-testid={ `${index}-horizontal-favorite-btn` }
            src={ blackHeart }
            alt=""
          />
        </button>
      );
    } return (
      <button
        key={ index }
        type="button"
        onClick={ () => handleFavorite(type, obj, blackHeart) }
      >
        <img
          className="favIcon"
          data-testid={ `${index}-horizontal-favorite-btn` }
          src={ whiteHeart }
          alt=""
        />
      </button>
    );
  };

  return (
    <div>
      <Header pageTitle="Receitas Favoritas " showSearchIcon={ false } />
      <div className="filter">
        <Button
          className="buttonAll"
          name="All"
          type="button"
          id="filter-by-all-btn"
          value="All"
          onClick={ () => { setFood(false); setDrink(false); } }
        />
        <Button
          className="buttonFoods"
          name="Foods"
          type="button"
          id="filter-by-food-btn"
          value="Foods"
          onClick={ () => { setFood(true); setDrink(false); } }
        />
        <Button
          className="buttonDrinks"
          name="Drinks"
          type="button"
          id="filter-by-drink-btn"
          value="Drinks"
          onClick={ () => { setFood(false); setDrink(true); } }
        />
      </div>
      <div className="itensList">
        { favoriteRecipes && favoriteRecipes
          .filter((favRecipe) => {
            if (drink) {
              return favRecipe.type === 'bebida';
            } if (food) {
              return favRecipe.type === 'comida';
            }
            return favRecipe;
          })
          .map((obj, index) => {
            if (obj.type === 'comida') {
              return ( // Card para comidas !!
              // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-noninteractive-element-interactions.md
                <section
                  className="card"
                  key={ obj.id }
                >
                  <img
                    className="image"
                    src={ obj.image }
                    alt={ obj.name }
                    data-testid={ `${index}-horizontal-image` }
                    role="presentation"
                    onClick={ () => history.push(`/comidas/${obj.id}`) }
                  />
                  <h1
                    data-testid={ `${index}-horizontal-top-text` }
                  >
                    { `${obj.area} - ${obj.category}` }
                  </h1>
                  <p
                    data-testid={ `${index}-horizontal-name` }
                    role="presentation"
                    onClick={ () => history.push(`/comidas/${obj.id}`) }
                  >
                    { obj.name }
                  </p>
                  {checkFavorites(obj, index, 'meal')}
                  <Button
                  // https://web.dev/async-clipboard/
                    className="buttonDrinks"
                    type="button"
                    onClick={ () => {
                      navigator.clipboard.writeText(`http://localhost:3000/comidas/${obj.id}`);
                      setUrl(true);
                    } }
                    value={ <img
                      alt="Share Icon"
                      src={ shareIcon }
                      data-testid={ `${index}-horizontal-share-btn` }
                    /> }
                  />
                  { url && <p> Link copiado! </p>}
                </section>
              );
            } return ( // Card para bebidas
              <section
                className="card"
                key={ obj.id }
              >
                <img
                  className="image"
                  alt={ obj.name }
                  src={ obj.image }
                  data-testid={ `${index}-horizontal-image` }
                  role="presentation"
                  onClick={ () => history.push(`/bebidas/${obj.id}`) }
                />
                <p
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  {obj.alcoholicOrNot}
                </p>
                <p
                  data-testid={ `${index}-horizontal-name` }
                  role="presentation"
                  onClick={ () => history.push(`/bebidas/${obj.id}`) }
                >
                  { obj.name }
                </p>
                {checkFavorites(obj, index, 'drink')}
                <Button
                  className="buttonDrinks"
                  type="button"
                  onClick={ () => { navigator.clipboard.writeText(`http://localhost:3000/comidas/${obj.id}`); } }
                  value={ <img
                    src={ shareIcon }
                    alt="Share Icon"
                    data-testid={ `${index}-horizontal-share-btn` }
                  /> }
                />
              </section>
            );
          })}
      </div>
    </div>
  );
}

FavoriteRecipes.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default FavoriteRecipes;
