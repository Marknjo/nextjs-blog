import {
  clientSideEventComments,
  extractDataFromJsonFile,
  getFilePath,
  saveDataToJsonFile,
} from '../../../helpers/server-utils';

function handler(req, resp) {
  //we are pre-rendering the reposnse
  const eventId = req.query.eventId;

  if (req.method === 'POST') {
    //handle the post request
    const reqEmail = req.body.email;
    const reqName = req.body.name;
    const reqText = req.body.text;

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
      resp.status(422).json({ message: 'One of the input has errors' });
      return;
    }

    const reqData = {
      id: Math.random().toString().slice(2, 15),
      email: reqEmail,
      name: reqName,
      text: reqText,
      eventId,
    };
    //transform response data

    //save the data to database
    const filePath = getFilePath('comments');

    //push new data
    const data = extractDataFromJsonFile(filePath);

    saveDataToJsonFile(data, filePath, reqData);

    //respond with the request -> for pre-rendering

    resp.status(201).json({
      messsage: 'Added comment successfully',
      response: reqData,
    });
  }

  if (req.method === 'GET') {
    //sanitize the data before fetching

    const eventComments = clientSideEventComments(eventId);

    resp.status(200).json({
      ok: true,
      response: {
        comments: eventComments,
      },
    });
  }
}

export default handler;
