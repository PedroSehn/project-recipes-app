/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import { useRecipesContext } from '../context/Provider';

export default function RenderCards({ type, typeCards }) {
  const [cards, setCards] = useState({ cards: [], loading: true });

  useEffect(() => {
    async function fetchApiRecipesFoodMain() {
      const endPoint = {
        meals: 'https://www.themealdb.com/api/json/v1/1/search.php?s=',
        drinks: 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=',
      };
      const url = endPoint[typeCards];
      fetch(url).then((responseJson) => responseJson.json()).then((response) => {
        setCards({ ...cards, cards: response, loading: false });
      })
        .catch(() => console.log('deu ruim'));
    }
    fetchApiRecipesFoodMain();
  }, []);

  const { filterCategory } = useRecipesContext();

  const history = useHistory();
  function renderCardsByCategories(card, index) {
    const MAX_CARDS = 12;
    if (index >= MAX_CARDS) return '';
    const { pathname } = history.location;
    return (
      <Link to={ `${pathname}/${card[`id${type}`]}` } key={ card[`id${type}`] }>
        <div data-testid={ `${index}-recipe-card` }>
          <img
            src={ card[`str${type}Thumb`] }
            alt={ card[`str${type}`] }
            data-testid={ `${index}-card-img` }
            width="100px"
          />
          <h3 data-testid={ `${index}-card-name` }>
            {card[`str${type}`]}
          </h3>
        </div>
      </Link>
    );
  }

  if (filterCategory.categorySelected) {
    return (
      filterCategory.loading ? <h1>Loading</h1>
        : (
          <>
            {filterCategory.categoriesFilter
              .map((card, index) => renderCardsByCategories(card, index))}
          </>
        )
    );
  }

  return (
    cards.loading ? <h1>Loading</h1>
      : (
        <>
          {cards.cards[typeCards]
            .map((card, index) => renderCardsByCategories(card, index))}
        </>
      )
  );
}

RenderCards.propTypes = {
  type: PropTypes.string.isRequired,
  typeCards: PropTypes.string.isRequired,
};
