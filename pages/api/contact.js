// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

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
      email,
      name,
      message,
    };

    res
      .status(201)
      .json({
        message: "We've successfully received your message!",
        message: newMessage,
      });
  }
};
