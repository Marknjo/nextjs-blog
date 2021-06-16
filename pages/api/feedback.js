import fs from 'fs';
import path from 'path';

function handler(req, res) {
  if (req.method === 'POST') {
    //extract data from the incoming request
    const email = req.body.email;
    const fedbackText = req.body.text;

    //transform data
    const newFeedback = {
      id: Math.random().toString().slice(2, 15),
      email: email,
      text: fedbackText,
      date: new Date().toISOString(),
    };

    //send it to the database
    const filePath = path.join(process.cwd(), 'data', 'feedback.json');
    const fileData = fs.readFileSync(filePath);
    const data = JSON.parse(fileData);

    data.push(newFeedback);

    fs.writeFileSync(filePath, JSON.stringify(data));

    res.status(201).json({ message: 'Success', ok: true, feedback: data });
  } else {
    res.status(200).json({ message: 'This works' });
  }
}

export default handler;
