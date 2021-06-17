function handler(req, resp) {
  if (req.method === 'POST') {
    //hande the post request
    const reqEmail = req.body.email;
    const reqName = req.body.name;
    const reqText = req.body.text;
    const reqEventId = req.body.eventId;

    //do some server side validations
    if (
      !enteredEmail ||
      enteredEmail.trim() === '' ||
      !enteredEmail.includes('@') ||
      !enteredName ||
      enteredName.trim() === '' ||
      !enteredComment ||
      enteredComment.trim() === ''
    ) {
      resp.status(400).json({ ok: false });
      return;
    }

    //save the data to database

    //respond with the request -> for pre-rendering

    resp.status(200).json({
      ok: true,
      response: {
        email: reqEmail,
        name: reqName,
        text: reqText,
        eventId: reqEventId,
      },
    });
  }
}

export default handler;
