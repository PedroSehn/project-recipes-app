import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import foodIcon from '../images/mealIcon.svg';

import './css/FooterStyle.css';

export default function Footer() {
  return (
    <div data-testid="footer" className="footer-test">
      <div>
        <Link to="/bebidas">
          <img
            data-testid="drinks-bottom-btn"
            src={ drinkIcon }
            alt="botão para entrar na página de perfil"
          />
        </Link>
      </div>
      <div>
        <Link to="/explorar">
          <img
            data-testid="explore-bottom-btn"
            src={ exploreIcon }
            alt="botão para entrar na página de perfil"
          />
        </Link>
      </div>
      <div>
        <Link to="/comidas">
          <img
            data-testid="food-bottom-btn"
            src={ foodIcon }
            alt="botão para entrar na página de perfil"
          />
        </Link>
      </div>
    </div>
  );
}
