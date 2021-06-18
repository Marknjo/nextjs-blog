import { useState } from 'react';
import styles from './ContactForm.module.css';

export default function ContactForm() {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredName, setEnteredName] = useState('');
  const [enteredMessage, setEnteredMessage] = useState('');

  console.log('Re-render');

  async function sendMessageHandler(event) {
    try {
      event.preventDefault();

      //handle validations here

      //send to database
      const response = await fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify({
          email: enteredEmail,
          name: enteredName,
          message: enteredMessage,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response) {
        throw new Error(response.message || 'Something went wrong. Try again!');
      }

      const data = await response.json();

      console.log(data);

      //clear inputs
      setEnteredEmail('');
      setEnteredName('');
      setEnteredMessage('');
    } catch (error) {
      //handle errors here
      console.error(`💥💥💥💥 ${error}`);
    }
  }

  function emailChangeHandler(event) {
    setEnteredEmail(event.target.value);
  }

  function nameChangeHandler(event) {
    setEnteredName(event.target.value);
  }

  function messageChangeHandler(event) {
    setEnteredMessage(event.target.value);
  }

  return (
    <section className={styles.contact}>
      <h1>How Can I help you?</h1>
      <form className={styles.form} onSubmit={sendMessageHandler}>
        <div className={styles.controls}>
          <div className={styles.control}>
            <label htmlFor="email">Your Email</label>
            <input
              value={enteredEmail}
              type="email"
              name="email"
              id="email"
              required
              onChange={emailChangeHandler}
            />
          </div>

          <div className={styles.control}>
            <label htmlFor="name">Your Name</label>
            <input
              value={enteredName}
              type="text"
              name="name"
              id="name"
              required
              onChange={nameChangeHandler}
            />
          </div>
        </div>

        <div className={styles.control}>
          <label htmlFor="message">Your message</label>
          <textarea
            value={enteredMessage}
            onChange={messageChangeHandler}
            name="message"
            id="message"
            required
            rows="5"
          ></textarea>
        </div>

        <div className={styles.actions}>
          <button type="submit">Message</button>
        </div>
      </form>
    </section>
  );
}
