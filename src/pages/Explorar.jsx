import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './css/Explorar.css';

function Explorar() {
  const history = useHistory();
  return (
    <div className="main-container">
      <Header pageTitle="Explorar" haveHeader={ false } />
      <div className="explore-container">
        <button
          type="button"
          data-testid="explore-food"
          onClick={ () => history.push('/explorar/comidas') }
        >
          Explorar Comidas
        </button>
        <button
          type="button"
          data-testid="explore-drinks"
          onClick={ () => history.push('/explorar/bebidas') }
        >
          Explorar Bebidas
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default Explorar;
