import React from 'react';
import { Link } from 'react-router-dom';
import HeaderWithoutSearch from './HeaderWithoutSearch';

export default function DoneRecipes() {
  const lsDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));

  return (
    <>
      <HeaderWithoutSearch />
      <h3 data-testid="page-title">Receitas Feitas</h3>
      <Link to=" ">
        <button type="button" data-testid="filter-by-all-btn">
          All
        </button>
      </Link>
      <Link to=" ">
        <button type="button" data-testid="filter-by-food-btn">
          Food
        </button>
      </Link>
      <Link to="/">
        <button type="button" data-testid="filter-by-drink-btn">
          Drinks
        </button>
      </Link>
      {lsDoneRecipes.map((recipe, index) => (
        <div key={ index }>
          {recipe.tags.map((tag, index1) => (
            <p
              key={ index1 }
              data-testid={ `${index}-${recipe.tags[index1]}-horizontal-tag` }
            >
              {tag}
            </p>))}
          <img
            src={ `${index}` }
            alt="img-Details"
            data-testid={ `${index}-horizontal-image` }
          />
          <p data-testid={ `${index}-horizontal-top-text` } />
          <p data-testid={ `${index}-horizontal-name` } />
          <p data-testid={ `${index}-horizontal-done-date` } />
          <button type="button" data-testid={ `${index}-horizontal-share-btn` }>
            Compartilhar
          </button>
        </div>))}

    </>
  );
}
