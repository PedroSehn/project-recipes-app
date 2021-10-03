import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function BebidasIgredientes() {
  return (
    <div className="main-container">
      <Header pageTitle="Explorar Ingredientes" haveHeader={ false } />
      <div>Explorar Ingredientes</div>
      <Footer />
    </div>
  );
}

export default BebidasIgredientes;
