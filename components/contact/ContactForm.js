import styles from './ContactForm.module.css';

export default function ContactForm() {
  return (
    <section className={styles.contact}>
      <h1>How Can I help you?</h1>
      <form className={styles.form}>
        <div className={styles.controls}>
          <div className={styles.control}>
            <label htmlFor="email">Your Email</label>
            <input type="email" name="email" id="email" required />
          </div>

          <div className={styles.control}>
            <label htmlFor="name">Your Name</label>
            <input type="name" name="name" id="name" required />
          </div>
        </div>
        <div className={styles.control}>
          <label htmlFor="message">Your message</label>
          <textarea
            type="message"
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
