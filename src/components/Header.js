import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';

export default function Header({ title }) {
  return (
    <>
      <Link to="/perfil">
        <img
          src={ profileIcon }
          data-testid="profile-top-btn"
          alt="profile"
          type="button"
        />
      </Link>
      <h1 data-testid="page-title" className="h1">
        {title}
      </h1>
    </>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};
