function handler(req, resp) {
  if (req.method === 'POST') {
    //hande the post request
    const reqEmail = req.body.email;
    const reqName = req.body.name;
    const reqText = req.body.text;

    //do some server side validations

    //save the data to database

    //respond with the request -> for pre-rendering

    resp.status(200).json({
      ok: true,
      response: {
        email: reqEmail,
        name: reqName,
        text: reqText,
      },
    });
  }
}

export default handler;
