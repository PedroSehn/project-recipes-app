import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ExplorarBebidas() {
  return (
    <div className="main-container">
      <Header pageTitle="Explorar Bebidas" haveHeader={ false } />
      <div>Explorar Bebidas</div>
      <Footer />
    </div>
  );
}

export default ExplorarBebidas;
