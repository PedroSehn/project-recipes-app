import React from 'react';
import PropTypes from 'prop-types';
import Footer from '../Components/Footer';
import Header from '../Components/Header';

export default function ExploreFood({ history }) {
  const fetchSomeFood = async () => {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    const { meals } = await response.json();
    const id = await meals[0].idMeal;
    return `/comidas/${id}`;
  };
  return (
    <div>
      <Header />
      <button
        type="button"
        data-testid="explore-by-ingredient"
        onClick={ () => history.push('/explorar/comidas/ingredientes') }
      >
        Por Ingredientes
      </button>
      <button
        type="button"
        data-testid="explore-by-area"
        onClick={ () => history.push('/explorar/comidas/area') }
      >
        Por Local de Origem
      </button>
      <button
        type="button"
        data-testid="explore-surprise"
        onClick={ async () => history.push(await fetchSomeFood()) }
      >
        Me Surpreenda!
      </button>
      <Footer />
    </div>
  );
}

ExploreFood.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
