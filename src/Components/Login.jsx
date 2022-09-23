import React, { useState } from 'react'

function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState();
  const [btnDisable, setBtnDisable] = useState(true);

  const validadeInputs = () => {
    console.log(password);
    const MIN_PASSWORD_LENGTH = 4;
    const isEmailValid = /\S+@\S+\.\S+/.test(email);
    if(isEmailValid && password.length > MIN_PASSWORD_LENGTH){
      setBtnDisable(false);
    }
  };


  return (
    <div>
        <fieldset>
          <input
            data-testid="email-input"
            type="email"
            name="email"
            value={ email }
            onChange={(e) => {
              setEmail(e.target.value)
              validadeInputs();
            }}
            placeholder="Email"
          />
          <input
            data-testid="password-input"
            type="password"
            name="password"
            value={ password }
            onChange={(e) => {
              setPassword(e.target.value)
              validadeInputs();
            }}
            placeholder="Senha"
          />
          <button
            data-testid="login-submit-btn"
            type="button"
            disabled={ btnDisable }
          >
            Enter
          </button>
        </fieldset>
      </div>
  )
}

export default Login