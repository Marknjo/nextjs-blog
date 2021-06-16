import { buildFeedbackPath, extractFeedbacks } from '.';

function handler(req, res) {
  const feedbackId = req.query.feedbackId;

  const filePath = buildFeedbackPath();
  const feedbackData = extractFeedbacks(filePath);

  const selectedFeedback = feedbackData.find(
    feedback => feedback.id === feedbackId
  );

  res.status(200).json({ ok: true, feedback: selectedFeedback });
}

export default handler;
