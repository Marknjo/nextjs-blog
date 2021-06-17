import { useRef, useState } from 'react';
import classes from './newsletter-registration.module.css';

function NewsletterRegistration() {
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const emailInput = useRef();

  async function registrationHandler(event) {
    try {
      event.preventDefault();

      // fetch user input (state or refs)
      const enteredEmail = emailInput.current.value.trim().toLowerCase();
      // optional: validate input
      if (!enteredEmail) {
        throw new Error('Please enter your email address to proceed');
      }

      if (!enteredEmail.includes('@')) {
        throw new Error('Please enter a valid email');
      }
      // send valid data to API

      //form has no error & reset the input
      emailInput.current.value = '';
      setHasError(false);
      setErrorMessage('');
    } catch (error) {
      setHasError(true);
      setErrorMessage(error.message);
    }
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      {errorMessage && (
        <p className={classes['error-message-box']}>⛔ {errorMessage}</p>
      )}
      <form onSubmit={registrationHandler}>
        <div className={`${classes.control} ${hasError ? classes.error : ''}`}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
            ref={emailInput}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
