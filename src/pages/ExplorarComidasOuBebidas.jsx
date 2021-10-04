import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { fetchRandomDrink } from '../services/fetchDrinks';
import { fetchRandomMeal } from '../services/fetchMeals';

function ExplorarComidas() {
  const { push, location: { pathname } } = useHistory();

  const handleClick = ({ target }) => {
    let middleRoute = 'comidas';
    if (pathname === '/explorar/bebidas') middleRoute = 'bebidas';

    if (target.innerText === 'Por Ingredientes') {
      push(`/explorar/${middleRoute}/ingredientes`);
      return;
    }

    if (target.innerText === 'Por Local de Origem') {
      push(`/explorar/${middleRoute}/area`);
      return;
    }

    if (middleRoute === 'comidas') {
      fetchRandomMeal().then((data) => push(`/comidas/${data[0].idMeal}`));
      return;
    }

    fetchRandomDrink().then((data) => push(`/bebidas/${data[0].idDrink}`));
  };

  const getPageTitle = () => {
    if (pathname === '/explorar/comidas') return 'Explorar Comidas';
    return 'Explorar Bebidas';
  };

  return (
    <div>
      <Header pageTitle={ getPageTitle() } haveHeader={ false } />
      <button
        onClick={ handleClick }
        data-testid="explore-by-ingredient"
        type="button"
      >
        Por Ingredientes
      </button>
      { pathname === '/explorar/comidas' && (
        <button
          onClick={ handleClick }
          type="button"
          data-testid="explore-by-area"
        >
          Por Local de Origem
        </button>)}
      <button
        data-testid="explore-surprise"
        type="button"
        onClick={ handleClick }
      >
        Me Surpreenda!
      </button>
      <Footer />
    </div>
  );
}

export default ExplorarComidas;
