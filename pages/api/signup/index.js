function handler(req, res) {
  if (req.method === 'POST') {
    //handle incoming request

    const email = req.body.email;

    //do serverside validations before submitting the email

    res.status(200).json({ ok: true, data: { email } });
  }
}

export default handler;
