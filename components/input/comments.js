import { useState } from 'react';

import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';

function Comments(props) {
  const { eventId } = props;

  const [showComments, setShowComments] = useState(false);

  function toggleCommentsHandler() {
    setShowComments(prevStatus => !prevStatus);
  }

  async function addCommentHandler(commentData) {
    // send data to API
    //sanitized comments
    //transform data
    const transformData = {
      ...commentData,
      eventId,
    };

    // send the data
    const response = await fetch('/api/comments/', {
      method: 'POST',
      body: JSON.stringify(transformData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Could not save your comment! Please try again');
    }

    const data = await response.json();

    console.log(data.response);
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList />}
    </section>
  );
}

export default Comments;
