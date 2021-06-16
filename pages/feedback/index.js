import { useState } from 'react';
import { buildFeedbackPath, extractFeedbacks } from '../api/feedback';

function FeedbackPage(props) {
  const [feedbackData, setFeedbackData] = useState(null);

  async function loadFeedbackHandler(id) {
    try {
      const resp = await fetch(`/api/feedback/${id}`);

      if (!resp.ok) {
        throw new Error('Could not fetch the feedback');
      }

      const data = await resp.json();

      setFeedbackData(data.feedback);
    } catch (error) {
      //handle error
      console.error(`💥💥💥 ${error.message}`);
    }
  }

  return (
    <>
      {feedbackData && <p>{feedbackData.email}</p>}
      <ul>
        {props.feedbackItems.map(item => (
          <li key={item.id}>
            {item.text}{' '}
            <button
              type="button"
              onClick={loadFeedbackHandler.bind(null, item.id)}
            >
              Show Details
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export async function getStaticProps() {
  const filePath = buildFeedbackPath();
  const data = extractFeedbacks(filePath);

  return {
    props: {
      feedbackItems: data,
    },
  };
}

export default FeedbackPage;
