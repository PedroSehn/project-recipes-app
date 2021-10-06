import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import PropTypes from 'prop-types';

import { useRecipesContext } from '../context/Provider';

export default function RenderCardSearch({ cards, type }) {
  const { recipesApp } = useRecipesContext();
  const MAX_CARDS = 12;
  const { pathname } = useLocation();
  const linkTo = pathname.includes('/comidas') ? '/comidas' : '/bebidas';
  return (
    recipesApp.loading ? <h1>Loading</h1>
      : (
        <div>
          {cards.map((card, index) => {
            if (index >= MAX_CARDS) return '';
            return (
              <Link
                to={ `${linkTo}/${card.idMeal || card.idDrink}` }
                key={ card[`id${type}`] }
                data-testid={ `${index}-recipe-card` }
              >
                <img
                  src={ card[`str${type}Thumb`] }
                  alt={ card[`str${type}`] }
                  data-testid={ `${index}-card-img` }
                  width="100px"
                />
                <h3 data-testid={ `${index}-card-name` }>
                  {card[`str${type}`]}
                </h3>
              </Link>
            );
          })}
        </div>
      )
  );
}

RenderCardSearch.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.object).isRequired,
  type: PropTypes.string.isRequired,
};
