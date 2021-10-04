import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import RecipesContext from '../context/RecipesContext';
import fetchDrinks from '../services/fetchDrinks';
import fetchMeals from '../services/fetchMeals';

function SearchBar({ pageTitle }) {
  const history = useHistory();
  const { setMeals, setDrinks } = useContext(RecipesContext);
  const [inputValue, setInputValue] = useState('');
  const [radioValue, setRadioValue] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (pageTitle === 'Comidas') {
      const data = await fetchMeals(inputValue, radioValue);
      setMeals(data);
      if (!data) {
        return global.alert('Sinto muito, não encontramos nenhuma '
        + 'receita para esses filtros.');
      }
      if (data.length === 1) history.push(`comidas/${data[0].idMeal}`);
      return;
    }
    if (pageTitle === 'Bebidas') {
      const data = await fetchDrinks(inputValue, radioValue);
      setDrinks(data);
      if (!data) {
        return global.alert('Sinto muito, não encontramos nenhuma '
        + 'receita para esses filtros.');
      }
      if (data.length === 1) history.push(`bebidas/${data[0].idDrink}`);
    }
  };

  return (
    <div>
      <form onSubmit={ handleSubmit }>
        <input
          data-testid="search-input"
          onChange={ ({ target }) => setInputValue(target.value) }
          value={ inputValue }
        />
        <div onChange={ ({ target }) => setRadioValue(target.value) }>
          <label htmlFor="ingredient-search">
            <input
              data-testid="ingredient-search-radio"
              name="search-type"
              id="ingredient-search"
              type="radio"
              value="ingredientSearch"
            />
            Ingrediente
          </label>
          <label htmlFor="name-search">
            <input
              data-testid="name-search-radio"
              name="search-type"
              id="name-search"
              type="radio"
              value="nameSearch"
            />
            Nome
          </label>
          <label htmlFor="first-letter-search">
            <input
              data-testid="first-letter-search-radio"
              name="search-type"
              id="first-letter-search"
              type="radio"
              value="firstLetterSearch"
            />
            Primeira letra
          </label>
          <button
            data-testid="exec-search-btn"
            type="submit"
          >
            Buscar
          </button>
        </div>
      </form>
    </div>
  );
}

export default SearchBar;

SearchBar.propTypes = {
  pageTitle: PropTypes.string,
}.isRequired;
