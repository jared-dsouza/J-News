import { useState } from "react";

function CommentForm({ articleId, onCommentPosted }) {
  const [commentBody, setCommentBody] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmedComment = commentBody.trim();

    if (!trimmedComment) {
      setError("Section cannot be blank");
      return;
    }
    setIsSubmitting(true);
    onCommentPosted(trimmedComment)
      .then(() => {
        setCommentBody("");
        setSuccess(true);
        setIsSubmitting(false);

        setTimeout(() => setSuccess(false), 3000);
      })
      .catch((err) => {
        console.error("Failed to post comment:", err);
        setError(err.message || "Failed to post comment. Please try again.");
        setIsSubmitting(false);
      });
  };

  return (
    <div className="comment-form-container">
      <h3 className="comment-form-title">Add a Comment</h3>

      <form onSubmit={handleSubmit} className="comment-form">
        <textarea
          value={commentBody}
          onChange={(e) => setCommentBody(e.target.value)}
          placeholder="What are your thoughts?"
          className="comment-input"
          rows="4"
          disabled={isSubmitting}
          aria-label="Comment text"
        />

        <div className="comment-form-footer">
          <button
            type="submit"
            className="comment-submit-btn"
            disabled={isSubmitting || !commentBody.trim()}
          >
            {isSubmitting ? "Posting..." : "Post Comment"}
          </button>

          {commentBody.trim() && (
            <span className="character-count">
              {commentBody.trim().length} characters
            </span>
          )}
        </div>
        {/* Success message */}
        {success && (
          <div className="comment-success" role="alert">
            ✅ Comment posted successfully!
          </div>
        )}
        {/* Error message */}
        {error && (
          <div className="comment-error" role="alert">
            ❌ {error}
          </div>
        )}
      </form>
    </div>
  );
}

export default CommentForm;
