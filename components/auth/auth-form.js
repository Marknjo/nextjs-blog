import { useRef, useState } from 'react';
import classes from './auth-form.module.css';

async function createUser(email, password) {
  try {
    console.log(email, password);
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || 'We were unable to register you. Please try again.'
      );
    }

    return data;
  } catch (error) {
    throw error;
  }
}

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const emailInput = useRef();
  const passwordInput = useRef();

  function switchAuthModeHandler() {
    setIsLogin(prevState => !prevState);
  }

  async function submitHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInput.current.value.trim();
    const enteredPassword = passwordInput.current.value.trim();

    //do validations

    if (isLogin) {
      //login user
    } else {
      //register a new user
      try {
        const response = await createUser(enteredEmail, enteredPassword);

        console.log(response);
      } catch (error) {
        console.error(`💥💥💥 ${error.message}`);
      }
    }
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input ref={emailInput} type="email" id="email" required />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input ref={passwordInput} type="password" id="password" required />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? 'Login' : 'Create Account'}</button>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
}

export default AuthForm;
