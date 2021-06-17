import {
  extractDataFromJsonFile,
  getFilePath,
  saveDataToJsonFile,
} from '../../../helpers/server-utils';

function handler(req, res) {
  if (req.method === 'POST') {
    //handle incoming request

    const email = req.body.email;

    if (!email && !email.includes('@')) {
      res.status(422).json({ message: 'Email submitted is invalid' });
      return;
    }

    const reqData = {
      id: Math.random().toString().slice(2, 15),
      email,
    };

    //do serverside validations before submitting the email
    const filePath = getFilePath('subscribers');
    const fileData = extractDataFromJsonFile(filePath);
    saveDataToJsonFile(fileData, filePath, reqData);

    res.status(200).json({ message: 'Success', response: { email } });
  }
}

export default handler;
