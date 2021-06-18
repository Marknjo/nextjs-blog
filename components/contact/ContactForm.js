import { useEffect, useState } from 'react';
import styles from './ContactForm.module.css';
import Notification from '../ui/Notification';

export default function ContactForm() {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredName, setEnteredName] = useState('');
  const [enteredMessage, setEnteredMessage] = useState('');
  const [requestStatus, setRequestStatus] = useState(); //pending, success, error default undefined
  const [requestSuccessMessage, setRequestSuccessMessage] = useState('');
  const [requestErrorMessage, setRequestErrorMessage] = useState('');

  useEffect(() => {
    if (requestStatus === 'success' || requestStatus === 'error') {
      const timer = setTimeout(() => {
        setRequestStatus(null);
        setRequestErrorMessage(null);
        setRequestSuccessMessage(null);
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [requestStatus]);

  async function sendMessageHandler(event) {
    try {
      event.preventDefault();

      setRequestStatus('pending');
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

      //Successful message
      setRequestStatus('success');
      setRequestSuccessMessage(data.message);

      //clear inputs
      setEnteredEmail('');
      setEnteredName('');
      setEnteredMessage('');
    } catch (error) {
      //handle errors here
      setRequestStatus('error');
      setRequestErrorMessage(error.message);
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

  let notification;

  if (requestStatus === 'pending') {
    notification = {
      status: 'pending',
      title: 'Sending your message...',
      message: "Your message is on it's way",
    };
  }

  if (requestStatus === 'success') {
    notification = {
      status: 'success',
      title: 'Success!',
      message: requestSuccessMessage,
    };
  }

  if (requestStatus === 'error') {
    notification = {
      status: 'error',
      title: 'Error!',
      message: requestErrorMessage,
    };
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

      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
    </section>
  );
}
