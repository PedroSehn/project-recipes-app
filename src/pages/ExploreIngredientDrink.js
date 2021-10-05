import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { useRecipesContext } from '../context/Provider';

export default function ExploreIngredientDrink() {
  const [ingredientsDrink, setIngredientsDrink] = useState([]);
  const { setIngredientsDrinks, setRecipesApp, recipesApp } = useRecipesContext();
  const history = useHistory();
  const limits = 12;

  useEffect(() => {
    const getIngredientsDrink = async () => {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list')
        .then((res) => res.json());
      setIngredientsDrink(response.drinks);
    };
    getIngredientsDrink();
  }, []);

  async function getDrinkFromIngredients(param) {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${param}`);
    const data = await response.json();
    return setIngredientsDrinks(data.drinks);
  }

  return (
    <div>
      <Header title="Explorar Ingredientes" />
      <div>
        {
          ingredientsDrink.map((drink, index) => (
            (index < limits) && (
              <button
                name={ drink.stringredient1 }
                type="button"
                onClick={ ({ target }) => {
                  getDrinkFromIngredients(target.getAttribute('name'));
                  setRecipesApp({ ...recipesApp, loading: true });

                  const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?${drink.strIngredient1}=i`;
                  fetch(url)
                    .then((request) => {
                      setRecipesApp({
                        ...recipesApp, dataCategoryAPI: request.drinks, loading: false,
                      });
                    }).then(() => history.push('/bebidas'))
                    .catch(() => console.log('deu ruim'));
                } }
              >
                <div>
                  <div data-testid={ `${index}-ingredient-card` }>
                    <img
                      name={ drink.strIngredient1 }
                      src={ `https://www.thecocktaildb.com/images/ingredients/${drink.strIngredient1}-Small.png` }
                      data-testid={ `${index}-card-img` }
                      alt={ drink.strIngredient1 }
                    />
                  </div>
                </div>
                <div
                  name={ drink.strIngredient1 }
                >
                  <span
                    data-testid={ `${index}-card-name` }
                  >
                    { drink.strIngredient1 }
                  </span>
                </div>
              </button>
            )
          ))
        }
      </div>
      <Footer />
    </div>
  );
}
