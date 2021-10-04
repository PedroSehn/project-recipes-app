import React from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';

import Header from '../components/Header';
import Footer from '../components/Footer';

function Perfil() {
  const userEmail = JSON.parse(localStorage.getItem('user'))
    ? JSON.parse(localStorage.getItem('user')).email : '';

  function logout() {
    localStorage.clear();
  }

  return (
    <div>
      <Header pageTitle="Perfil" haveHeader={ false } />
      <div>
        <Link to="/perfil">
          <img src={ profileIcon } alt="profile icon" />
        </Link>
        <h1>Perfil</h1>
        <h3 data-testid="profile-email">{userEmail}</h3>
        <Link to="/receitas-feitas">
          <button
            type="button"
            data-testid="profile-done-btn"
          >
            Receitas Feitas
          </button>
        </Link>
        <Link to="/receitas-favoritas">
          <button
            type="button"
            data-testid="profile-favorite-btn"
          >
            Receitas Favoritas
          </button>
        </Link>
        <Link to="/">
          <button
            type="button"
            data-testid="profile-logout-btn"
            onClick={ () => logout() }
          >
            Sair
          </button>
        </Link>
      </div>

      <Footer />
    </div>
  );
}

export default Perfil;
