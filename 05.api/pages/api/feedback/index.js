import fs from 'fs';
import path from 'path';

export function buildFeedbackPath() {
  return path.join(process.cwd(), 'data', 'feedback.json');
}

export function extractFeedbacks(filePath) {
  const fileData = fs.readFileSync(filePath);
  return JSON.parse(fileData);
}

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
    const filePath = buildFeedbackPath();
    const data = extractFeedbacks(filePath);

    data.push(newFeedback);

    fs.writeFileSync(filePath, JSON.stringify(data));

    res.status(201).json({ message: 'Success', ok: true, feedback: data });
  } else {
    const filePath = buildFeedbackPath();
    const data = extractFeedbacks(filePath);

    res.status(200).json({ message: 'Success', ok: true, feedbacks: data });
  }
}

export default handler;
