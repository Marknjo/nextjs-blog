import Head from 'next/head';
import ContactForm from '../components/contact/ContactForm';

function ContactPage() {
  return (
    <>
      <Head>
        <title>Contact Us</title>
        <meta name="description" content="Send Mark Njoroge your messages 😉" />
      </Head>
      <ContactForm />
    </>
  );
}

export default ContactPage;
