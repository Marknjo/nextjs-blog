import path from 'path';
import fs from 'fs';

function handler(req, resp) {
  if (req.method === 'POST') {
    //hande the post request
    const reqEmail = req.body.email;
    const reqName = req.body.name;
    const reqText = req.body.text;
    const reqEventId = req.body.eventId;

    //do some server side validations
    if (
      !reqEmail ||
      reqEmail.trim() === '' ||
      !reqEmail.includes('@') ||
      !reqName ||
      reqName.trim() === '' ||
      !reqText ||
      reqText.trim() === ''
    ) {
      resp.status(400).json({ ok: false });
      return;
    }

    const transformedReq = {
      id: Math.random().toString().slice(2, 15),
      email: reqEmail,
      name: reqName,
      text: reqText,
      eventId: reqEventId,
    };
    //transform response data

    //save the data to database
    const filePath = path.join(process.cwd(), 'data', 'comments.json');
    const fileData = fs.readFileSync(filePath);

    //push new data
    const data = JSON.parse(fileData);

    data.push(transformedReq);

    //write data to the file on the disk
    fs.writeFileSync(filePath, JSON.stringify(data));

    //respond with the request -> for pre-rendering

    resp.status(200).json({
      ok: true,
      response: transformedReq,
    });
  }
}

export default handler;
