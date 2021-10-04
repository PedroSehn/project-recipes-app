import React, { useEffect, useCallback } from 'react';
import { Link, useParams, Redirect } from 'react-router-dom';

import './styles.css';

import { useExplore, useSearch } from '../../context';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

function ExplorarIngredientes() {
  const { type } = useParams();
  const { ingredientsList, fecthIngredients } = useExplore();
  const { handleSearch } = useSearch();

  useEffect(() => {
    fecthIngredients(type);

    return fecthIngredients;
  }, [fecthIngredients, type]);

  const renderFoodPage = useCallback(() => ingredientsList
    .map(({ strIngredient }, index) => (
      <Link
        to={ `/${type}` }
        className="ingredient-card"
        key={ strIngredient }
        data-testid={ `${index}-ingredient-card` }
        onClick={ () => handleSearch(strIngredient, 'ingredient') }
      >
        <img
          data-testid={ `${index}-card-img` }
          src={ `https://www.themealdb.com/images/ingredients/${strIngredient}-Small.png` }
          alt=""
        />
        <p data-testid={ `${index}-card-name` }>{ strIngredient }</p>
      </Link>
    )), [handleSearch, ingredientsList, type]);

  const renderDrinksPage = useCallback(() => ingredientsList
    .map(({ strIngredient1 }, index) => (
      <Link
        to={ `/${type}` }
        className="ingredient-card"
        key={ strIngredient1 }
        data-testid={ `${index}-ingredient-card` }
        onClick={ () => handleSearch(strIngredient1, 'ingredient') }
      >
        <img
          data-testid={ `${index}-card-img` }
          src={ `https://www.thecocktaildb.com/images/ingredients/${strIngredient1}-Small.png` }
          alt=""
        />
        <p data-testid={ `${index}-card-name` }>{ strIngredient1 }</p>
      </Link>
    )), [handleSearch, ingredientsList, type]);

  if (type !== 'comidas' && type !== 'bebidas') {
    return <Redirect to="/explorar" />;
  }

  return (
    <>
      <Header pageTitle="Explorar Ingredientes" showSearchIcon={ false } />
      <main className="ingredients-container">
        { (type === 'comidas') && renderFoodPage() }
        { (type === 'bebidas') && renderDrinksPage() }
      </main>
      <Footer />
    </>
  );
}

export default ExplorarIngredientes;
