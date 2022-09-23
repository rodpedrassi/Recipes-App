import React, { useState } from 'react';
import PropTypes from 'prop-types';

function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [btnDisable, setBtnDisable] = useState(true);
  const MIN_PASSWORD_LENGTH = 6;

  const validadeInputs = () => {
    const isEmailValid = /\S+@\S+\.\S+/.test(email);
    if (isEmailValid && password.length >= MIN_PASSWORD_LENGTH) {
      setBtnDisable(false);
    }
  };
  const handleClick = async () => {
    const { history } = props;
    const objStorage = { email };
    localStorage.setItem('user', JSON.stringify(objStorage));
    localStorage.setItem('mealsToken', JSON.stringify(1));
    localStorage.setItem('drinksToken', JSON.stringify(1));
    history.push('/meals');
  };

  return (
    <div>
      <fieldset>
        <input
          data-testid="email-input"
          type="email"
          name="email"
          value={ email }
          onChange={ (e) => {
            setEmail(e.target.value);
            validadeInputs();
          } }
          placeholder="Email"
        />
        <input
          data-testid="password-input"
          type="password"
          name="password"
          value={ password }
          onChange={ (e) => {
            setPassword(e.target.value);
            validadeInputs();
          } }
          placeholder="Senha"
        />
        <button
          data-testid="login-submit-btn"
          type="button"
          disabled={ btnDisable }
          onClick={ handleClick }
        >
          Enter
        </button>
      </fieldset>
    </div>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
