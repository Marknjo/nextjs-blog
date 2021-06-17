import {
  fetchAllEventComments,
  filteredComments,
} from '../../../helpers/server-utils';

function handler(req, resp) {
  //we are pre-rendering the reposnse
  const eventId = req.query.commentId;
  //sanitize the data before fetching

  const allComments = fetchAllEventComments(eventId);
  const eventComments = filteredComments(allComments);

  resp.status(200).json({
    ok: true,
    response: {
      comments: eventComments,
    },
  });
}

export default handler;
