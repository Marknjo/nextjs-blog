import fs from 'fs';
import {
  extractDataFromJsonFile,
  getFilePath,
  saveDataToJsonFile,
} from '../../../helpers/server-utils';

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

    const reqData = {
      id: Math.random().toString().slice(2, 15),
      email: reqEmail,
      name: reqName,
      text: reqText,
      eventId: reqEventId,
    };
    //transform response data

    //save the data to database
    const filePath = getFilePath('comments');

    //push new data
    const data = extractDataFromJsonFile(filePath);

    saveDataToJsonFile(data, filePath, reqData);

    //respond with the request -> for pre-rendering

    resp.status(200).json({
      ok: true,
      response: reqData,
    });
  }
}

export default handler;
