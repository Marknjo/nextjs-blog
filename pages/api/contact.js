// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { saveToJsonFile } from '../../lib/api-utils';

export default (req, res) => {
  if (req.method === 'POST') {
    const { email, name, message } = req.body;

    //validate
    if (
      !email ||
      !email.includes('@') ||
      !name ||
      name.trim() === '' ||
      !message ||
      message.trim() === ''
    ) {
      res.status(422).json({ message: 'Invalid input values' });
      return;
    }
    //Store it in a database
    const newMessage = {
      id: Math.random().toString().slice(2, 15),
      email,
      name,
      message,
    };

    try {
      saveToJsonFile(newMessage, 'contact-messages');
      res.status(201).json({
        message: "We've successfully received your message!",
        response: newMessage,
      });
    } catch (error) {
      res.status(500).json({ message: 'Could not save to the database' });
    }
  }
};
