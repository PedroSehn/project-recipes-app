import React from 'react';
import { Link } from 'react-router-dom';

import './styles.css';

import { useExplore } from '../../context';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

function ExplorarOrigem() {
  const {
    selectedArea,
    setSelectedArea,
    areas,
    mealsByArea } = useExplore();

  const renderSelect = () => (
    <label htmlFor="area">
      <select
        data-testid="explore-by-area-dropdown"
        name="area"
        id="area"
        value={ selectedArea }
        onChange={ (e) => setSelectedArea(e.target.value) }
      >
        {
          areas.map(({ strArea }) => (
            <option
              key={ strArea }
              data-testid={ `${strArea}-option` }
              value={ strArea }
            >
              { strArea }
            </option>
          ))
        }
      </select>
    </label>
  );

  return (
    <>
      <Header pageTitle="Explorar Origem" showSearchIcon />
      <main>
        { renderSelect() }
        <article className="area-card-container">
          {
            mealsByArea.map(({ strMeal, strMealThumb, idMeal }, index) => (
              <Link
                key={ idMeal }
                data-testid={ `${index}-recipe-card` }
                to={ `/comidas/${idMeal}` }
              >
                <img
                  data-testid={ `${index}-card-img` }
                  src={ strMealThumb }
                  alt={ strMeal }
                />
                <h5 data-testid={ `${index}-card-name` }>{ strMeal }</h5>
              </Link>
            ))
          }
        </article>
      </main>
      <Footer />
    </>
  );
}

export default ExplorarOrigem;
