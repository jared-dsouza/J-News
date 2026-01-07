function CommentCard({ comment }) {
  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("en-GB", options);
  };

  return (
    <article className="comment-card">
      <div className="comment-header">
        <span className="comment-author">👤 {comment.author}</span>
        <span className="comment-date">
          📅 {formatDate(comment.created_at)}
        </span>
      </div>

      <p className="comment-body">{comment.body}</p>

      <div className="comment-footer">
        <span className="comment-votes">⬆ {comment.votes} votes</span>
      </div>
    </article>
  );
}

export default CommentCard;
