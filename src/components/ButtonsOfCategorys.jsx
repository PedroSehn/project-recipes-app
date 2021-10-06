/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useRecipesContext } from '../context/Provider';

export default function ButtonsOfCategory({ func, typeCategory, funcFilter }) {
  const [categorys, setCategorys] = useState({
    categorys: [],
    loading: true,
    categorySelected: '',
  });
  const { filterCategory, setFilterCategory } = useRecipesContext();
  useEffect(() => {
    function requestApi() {
      func()
        .then((request) => {
          setCategorys({ ...categorys, categorys: request, loading: false });
        });
    }
    requestApi();
    return function cleanUp() {
    };
  }, []);
  const MAX_CARDS = 5;

  async function handleClick({ target }) {
    if (filterCategory.categorySelected === target.innerText) {
      setFilterCategory({ ...filterCategory,
        categorySelected: '',
        categoryFilter: [],
        loading: true });
    } else {
      funcFilter(target.innerText).then((request) => {
        setFilterCategory({ ...filterCategory,
          loading: false,
          categorySelected: target.innerText,
          categoriesFilter: request[typeCategory] });
      });
    }
  }
  return (
    categorys.loading ? <h1>Loading</h1>
      : (
        <>
          <button
            type="button"
            onClick={ handleClick }
            data-testid="All-category-filter"
          >
            All
          </button>
          {categorys.categorys[typeCategory].map((category, index) => {
            if (index >= MAX_CARDS) return '';
            return (
              <button
                data-testid={ `${category.strCategory}-category-filter` }
                type="button"
                key={ index }
                onClick={ handleClick }
              >
                {category.strCategory}
              </button>
            );
          })}
        </>
      )
  );
}

ButtonsOfCategory.propTypes = {
  func: PropTypes.func.isRequired,
  typeCategory: PropTypes.string.isRequired,
  funcFilter: PropTypes.func.isRequired,
};
