import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function Explore() {
  return (
    <>
      <header className="header">
        <Header title="Explorar" />
      </header>
      <div className="buttonCategory">
        <Link to="/explorar/comidas">
          <button
            className="btn btn-outline-primary"
            type="button"
            data-testid="explore-food"
          >
            Explorar Comidas
          </button>
        </Link>
        <Link to="/explorar/bebidas">
          <button
            className="btn btn-outline-primary"
            type="button"
            data-testid="explore-drinks"
          >
            Explorar Bebidas
          </button>
        </Link>
      </div>
      <Footer />
    </>
  );
}
