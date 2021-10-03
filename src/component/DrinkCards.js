import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Context from '../context/Context';

function DrinkCards() {
  const { drinks } = useContext(Context);
  const DOZE = 12;

  return (
    <div>
      {drinks.map((drink, index) => (
        index < DOZE ? (
          <Link
            to={ `/bebidas/${drink.idDrink}` }
            key={ drink.idDrink }
          >
            <div data-testid={ `${index}-recipe-card` }>
              <div>
                <img
                  data-testid={ `${index}-card-img` }
                  style={ { width: '120px' } }
                  src={ drink.strDrinkThumb }
                  alt={ drink.strDrink }
                />
              </div>
              <div>
                <h5 data-testid={ `${index}-card-name` }>{ drink.strDrink }</h5>
              </div>
            </div>
          </Link>
        ) : null
      ))}
    </div>
  );
}

export default DrinkCards;
