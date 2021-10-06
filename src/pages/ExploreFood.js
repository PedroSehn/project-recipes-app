import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function ExploreFood() {
  const [surpriseMeal, setSurpiseMeal] = useState(0);

  useEffect(() => {
    async function fetchSurpriseFood() {
      const url = 'https://www.themealdb.com/api/json/v1/1/random.php';
      const response = await fetch(url).then((res) => res.json());
      return setSurpiseMeal(response.meals[0].idMeal);
    }
    fetchSurpriseFood();
  }, []);

  const idRandom = surpriseMeal;

  function randomMeals() {
    if (idRandom > 0) {
      return (
        <Link to={ `/comidas/${idRandom}` }>
          <button
            className="btn btn-outline-primary"
            type="button"
            data-testid="explore-surprise"
            name="Me Surpreenda"
          >
            Me Surpreenda!
          </button>
        </Link>
      );
    }
    return <p>Loading...</p>;
  }

  return (
    <>
      <header className="header">
        <Header title="Explorar Comidas" />
      </header>
      <Link to="/explorar/comidas/ingredientes">
        <button
          className="btn btn-outline-primary"
          type="button"
          data-testid="explore-by-ingredient"
        >
          Por Ingredientes
        </button>
      </Link>
      <Link to="/explorar/comidas/area">
        <button
          className="btn btn-outline-primary"
          type="button"
          data-testid="explore-by-area"
        >
          Por Local de Origem
        </button>
      </Link>
      {
        randomMeals()
      }
      <Footer />
    </>
  );
}
