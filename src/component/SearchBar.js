import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router';
// import RadialInput from '../mini-components/RadialInput';
// import Button from '../mini-components/Button';
import Context from '../context/Context';

export default function SearchBar() {
  const history = useHistory();
  const { filterRadio,
    setFilterRadio,
    filterText,
    setFilterText,
    fetchFood,
    fetchDrink,
    foods,
    drinks,
  } = useContext(Context);

  useEffect(() => {
    if (filterRadio === 'f' && filterText.length > 1) {
      global.alert('Sua busca deve conter somente 1 (um) caracter');
    }
  }, [filterText]);

  useEffect(() => {
    if (foods.length === 1 && history.location.pathname === '/comidas') {
      history.push(`/comidas/${foods[0].idMeal}`);
    } if (drinks.length === 1 && history.location.pathname === '/bebidas') {
      history.push(`/bebidas/${drinks[0].idDrink}`);
    }
  }, [foods, drinks]);

  return (
    <form id="form">
      <input
        type="text"
        placeholder="Buscar Receita"
        data-testid="search-input"
        onChange={ (event) => setFilterText(event.target.value) }
      />
      <label htmlFor="ingredient">
        <input
          type="radio"
          id="ingredient"
          name="radiosFilter"
          data-testid="ingredient-search-radio"
          value="i"
          onClick={ (event) => setFilterRadio(event.target.value) }
        />
        Ingrediente
      </label>
      <label htmlFor="name">
        <input
          type="radio"
          id="name"
          name="radiosFilter"
          data-testid="name-search-radio"
          value="s"
          onClick={ (event) => setFilterRadio(event.target.value) }
        />
        Nome
      </label>
      <label htmlFor="firstLetter">
        <input
          type="radio"
          id="firstLetter"
          name="radiosFilter"
          data-testid="first-letter-search-radio"
          value="f"
          onClick={ (event) => setFilterRadio(event.target.value) }
        />
        Primeira letra
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ history.location.pathname === '/comidas' ? fetchFood : fetchDrink }
      >
        Buscar
      </button>
    </form>
  );
}
