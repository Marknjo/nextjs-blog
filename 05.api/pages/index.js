import { useRef, useState } from 'react';
import styles from '../styles/Home.module.css';

export default function Home() {
  const emailInput = useRef();
  const feedbackInput = useRef();
  const [feedbacksResp, setFeedbacksResp] = useState([]);

  async function submitFormHandler(event) {
    event.preventDefault();

    try {
      const enteredEmail = emailInput.current.value.trim();

      const enteredFeedback = feedbackInput.current.value.trim();

      //@TODO: do validations

      const reqBody = {
        email: enteredEmail,
        text: enteredFeedback,
      };

      //submit to database
      const resp = await fetch('/api/feedback', {
        method: 'POST',
        body: JSON.stringify(reqBody),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!resp.ok) {
        throw new Error('Could not fetch the data');
      }

      const data = await resp.json();

      console.log(data);

      //clear inputs
      emailInput.current.value = '';
      feedbackInput.current.value = '';
    } catch (error) {
      console.error(`💥💥💥 ${error.message}`);
    }
  }

  async function loadFeedbackHandler() {
    try {
      //load data from the file
      const resp = await fetch('/api/feedback');

      if (!resp.ok) {
        throw new Error('Could not fetch data');
      }

      const { feedbacks } = await resp.json();
      console.log(feedbacks);

      setFeedbacksResp(feedbacks);
    } catch (error) {
      //handle erros
      console.log(`💥💥💥 ${error}`);
    }
  }

  return (
    <div className={styles.container}>
      <h1>Home Page</h1>

      <form onSubmit={submitFormHandler}>
        <div>
          <label htmlFor="email">Your Email Address</label>
          <input type="email" id="email" name="email" ref={emailInput} />
        </div>

        <div>
          <label htmlFor="feeback">Your Feeback</label>
          <textarea
            type="text"
            id="feeback"
            name="feeback"
            rows="5"
            placeholder="Your Feedback"
            ref={feedbackInput}
          ></textarea>
        </div>

        <button type="submit" role="form submition">
          Send Feedback
        </button>
      </form>

      <hr size="5" />

      <button type="button" onClick={loadFeedbackHandler}>
        Load Feedback
      </button>

      <ul>
        {feedbacksResp.map(feedback => (
          <li key={feedback.id}>{feedback.text}</li>
        ))}
      </ul>
    </div>
  );
}
