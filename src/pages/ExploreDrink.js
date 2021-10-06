import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function ExploreDrink() {
  const [surpriseDrink, setSurpriseDrink] = useState(0);
  useEffect(() => {
    async function fetchSurpriseDrink() {
      const url = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
      const response = await fetch(url).then((res) => res.json());
      return setSurpriseDrink(response.drinks[0].idDrink);
    }
    fetchSurpriseDrink();
  }, []);

  const idRandom = surpriseDrink;

  function randomDrinks() {
    if (idRandom > 0) {
      return (
        <Link to={ `/bebidas/${idRandom}` }>
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
    <div>
      <header className="header">
        <Header title="Explorar Bebidas" />
      </header>
      <Link to="/explorar/bebidas/ingredientes">
        <button
          className="btn btn-outline-primary"
          type="button"
          data-testid="explore-by-ingredient"
        >
          Por Ingredientes
        </button>
      </Link>
      {
        randomDrinks()
      }
      <Footer />
    </div>
  );
}
