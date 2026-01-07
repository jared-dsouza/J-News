import CommentCard from "./CommentCard";

function CommentsList({ comments }) {
  if (!comments || comments.length === 0) {
    return (
      <section className="comments-section">
        <h2 className="comments-title">Comments</h2>
        <p className="no-comments">No comments yet. Be the first to comment!</p>
      </section>
    );
  }

  return (
    <section className="comments-section">
      <h2 className="comments-title">Comments ({comments.length})</h2>

      <div className="comments-list">
        {comments.map((comment) => (
          <CommentCard key={comment.comment_id} comment={comment} />
        ))}
      </div>
    </section>
  );
}

export default CommentsList;
