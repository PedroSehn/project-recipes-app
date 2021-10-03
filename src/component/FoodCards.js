import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Context from '../context/Context';

function FoodCards() {
  const { foods } = useContext(Context);
  const DOZE = 12;

  return (
    <div>
      {foods.map((food, index) => (
        index < DOZE ? (
          <Link
            to={ `/comidas/${food.idMeal}` }
            key={ food.idMeal }
          >
            <div data-testid={ `${index}-recipe-card` }>
              <div>
                <img
                  data-testid={ `${index}-card-img` }
                  style={ { width: '120px' } }
                  src={ food.strMealThumb }
                  alt={ food.strMeal }
                />
              </div>
              <div>
                <h5 data-testid={ `${index}-card-name` }>{ food.strMeal }</h5>
              </div>
            </div>
          </Link>
        ) : null
      ))}
    </div>
  );
}

export default FoodCards;
