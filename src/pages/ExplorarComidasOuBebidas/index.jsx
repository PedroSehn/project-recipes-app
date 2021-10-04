import React, { useCallback, useState } from 'react';
import { useHistory, useParams, Redirect, Link } from 'react-router-dom';

import { useExplore } from '../../context';

import './styles.css';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

function ExplorarComidasOuBebidas() {
  const { type } = useParams();
  const { push } = useHistory();
  const { getRandomRecipe } = useExplore();
  const [loading, setLoading] = useState(false);

  const handleSurprise = useCallback(async () => {
    setLoading(true);
    const recipeId = await getRandomRecipe(type);
    setLoading(false);

    push(`/${type}/${recipeId}`);
  }, [getRandomRecipe, push, type]);

  if (type !== 'comidas' && type !== 'bebidas') {
    return <Redirect to="/explorar" />;
  }

  return (
    <>
      <Header
        pageTitle={ `Explorar ${type[0].toUpperCase() + type.slice(1)}` }
        showSearchIcon={ false }
      />
      <main className="explore-type-container">
        {
          loading
            ? (<span>Loading...</span>)
            : (
              <>
                <Link
                  to={ `/explorar/${type}/ingredientes` }
                  data-testid="explore-by-ingredient"
                >
                  Por Ingredientes
                </Link>
                { type === 'comidas' && (
                  <Link to={ `/explorar/${type}/area` } data-testid="explore-by-area">
                    Por Local de Origem
                  </Link>) }
                <button
                  type="button"
                  onClick={ handleSurprise }
                  data-testid="explore-surprise"
                >
                  Me Surpreenda!
                </button>
              </>
            )
        }
      </main>
      <Footer />
    </>
  );
}

export default ExplorarComidasOuBebidas;
