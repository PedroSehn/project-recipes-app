import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './ProgressRecipe.css';
import CopyButton from '../components/CopyButton';
import FaviriteButton from '../components/FavoriteButton';
// www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11007
export default function ProgressRecipeDrink({ match: { params: { id } } }) {
  const [drink, setDrink] = useState({});
  useEffect(() => {
    async function getDrink() {
      const site = 'https://www.thecocktaildb.com';
      const beverage = await fetch(`${site}/api/json/v1/1/lookup.php?i=${id}`);
      const beverageJson = await beverage.json();
      const [fetchedDrink] = beverageJson.drinks;
      setDrink(fetchedDrink);
    }
    getDrink();
  }, [id]);

  const MAX_INGREDIENTS = 15;
  const [numbers, ing, measures] = [[], [], []]; /* Três arrays vazios */
  /* Numbers preenchido com números de 1 a 15 */
  for (let index = 0; index < MAX_INGREDIENTS; index += 1) {
    numbers.push(index + 1);
  }
  /* ingredients e measures preenchidos com nomes das chaves "strIngredient" e */
  /* strMeasures de 1 a 15. */
  numbers.forEach((num) => ing.push(`strIngredient${num}`));
  numbers.forEach((num) => measures.push(`strMeasure${num}`));

  function checkIngredient({ target }) {
    target.nextSibling.className = target.checked
      ? 'checkedIngredient' : 'uncheckedIngredient';
  }

  function handleShare() {
    global.alert('Link copiado!');
    navigator.clipboard.writeText('');
  }

  return (
    <div id="current-recipe">
      <img
        width="360px"
        height="250px"
        data-testid="recipe-photo"
        src={ `${drink.strDrinkThumb}` }
        alt="drink"
      />
      <h1 data-testid="recipe-title">{ drink.strDrink }</h1>
      <CopyButton pathname={ `/bebidas/${id}` } />
      <button
        data-testid="favorite-btn"
        type="button"
      >
        Adicionar aos Favoritos
      </button>
      <p data-testid="recipe-category">{ drink.strCategory }</p>
      <div>
        {
          numbers
            .filter((num) => (
              Boolean(drink[ing[num - 1]])
              || Boolean(drink[measures[num - 1]])
            ))
            .map((num) => (
              <div key={ `section-${num - 1}` }>
                <label
                  htmlFor={ `${num - 1}-ingredient-check` }
                  data-testid={ `${num - 1}-ingredient-step` }
                >
                  <input
                    type="checkbox"
                    className="checkbox"
                    id={ `${num - 1}-ingredient-check` }
                    value={ num - 1 }
                    defaultChecked
                    onChange={ ({ target }) => !target.checked }
                    onClick={ checkIngredient }
                  />
                  <span>
                    { `${drink[measures[num - 1]] || ''} ${drink[ing[num - 1]] || ''}` }
                  </span>
                </label>
                <br />
              </div>
            ))
        }
      </div>
      <p data-testid="instructions" className="instructions">{ drink.strInstructions }</p>
      <button type="button" data-testid="finish-recipe-btn">Receita Finalizada</button>
    </div>
  );
}
ProgressRecipeDrink.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
