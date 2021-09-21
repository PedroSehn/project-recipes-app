import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import Input from '../components/Input';
import Context from '../context/Context';

function Login({ history }) {
  const [password, setPassword] = useState('');
  const [validLogin, setValid] = useState(false);
  const { email, setEmail } = useContext(Context);

  function validatePassword() {
    const MIN_LENGTH = 6;
    if (password.length >= MIN_LENGTH) {
      setValid(true);
    }
  }

  function validateEmail() {
    const regexEmail = /\S+@\S+\.\S+/;
    const check = regexEmail.test(email);
    return check;
  }

  function submitLogin() {
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email }));
    history.push('/comidas');
  }

  return (
    <div>
      Login
      <div>
        <Input
          type="text"
          name="email"
          id="email-input"
          value={ email }
          onChange={ ({ target }) => {
            setEmail(target.value);
            validatePassword();
          } }
        />
      </div>
      <div>
        <Input
          type="password"
          name="password"
          value={ password }
          id="password-input"
          onChange={ ({ target }) => {
            setPassword(target.value);
            validatePassword();
          } }
        />
      </div>
      <div>
        <button
          type="button"
          data-testid="login-submit-btn"
          disabled={ !validLogin || !validateEmail() }
          onClick={ () => submitLogin() }
        >
          Entrar
        </button>
      </div>
    </div>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
