import React from 'react';
import PropTypes from 'prop-types';
import Footer from '../Components/Footer';
import Header from '../Components/Header';

export default function ExploreDrinks({ history }) {
  const fetchSomeDrink = async () => {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
    const { drinks } = await response.json();
    const id = await drinks[0].idDrink;
    return `/bebidas/${id}`;
  };
  return (
    <div>
      <Header />
      <button
        type="button"
        data-testid="explore-by-ingredient"
        onClick={ () => history.push('/explorar/bebidas/ingredientes') }
      >
        Por Ingredientes
      </button>
      <button
        type="button"
        data-testid="explore-surprise"
        onClick={ async () => history.push(await fetchSomeDrink()) }
      >
        Me Surpreenda!
      </button>
      <Footer />
    </div>
  );
}

ExploreDrinks.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
