import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header({ pageTitle, haveHeader }) {
  const [searchBarActive, setSearchBarActive] = useState(false);

  const searchTopBtn = () => {
    if (!haveHeader) return;
    return (
      <button
        type="button"
        onClick={ () => setSearchBarActive(!searchBarActive) }
      >
        <img
          data-testid="search-top-btn"
          src={ searchIcon }
          alt="botão para fazer buscas"
        />
      </button>
    );
  };

  return (
    <div>
      <div style={ { display: 'flex ' } }>
        <Link to="/perfil">
          <img
            data-testid="profile-top-btn"
            src={ profileIcon }
            alt="botão para entrar na página de perfil"
          />
        </Link>
        <h1 data-testid="page-title">{ pageTitle }</h1>
        { searchTopBtn() }
      </div>
      <div style={ { display: 'block' } }>
        { searchBarActive ? <SearchBar pageTitle={ pageTitle } /> : null}
      </div>
    </div>
  );
}

export default Header;

Header.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  haveHeader: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
};
