import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  fetchArticleById,
  fetchCommentsByArticleId,
  voteOnArticle,
  postComment,
} from "../utils/api";
import Loading from "../components/Loading";
import CommentsList from "../components/CommentsList";
import VoteButtons from "../components/VoteButtons";
import CommentForm from "../components/CommentForm";

function ArticlePage() {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState([]);

  const loggedInUser = "grumpy19"; // Placeholder for authentication

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

  useEffect(() => {
    setIsLoading(true);

    fetchArticleById(article_id)
      .then((articleData) => {
        setArticle(articleData);

        return fetchCommentsByArticleId(article_id);
      })
      .then((commentsData) => {
        setComments(commentsData);
        setIsLoading(false);
      });
  }, [article_id]);

  const handleVote = (voteChange) => {
    setArticle((currentArticle) => ({
      ...currentArticle,
      votes: currentArticle.votes + voteChange,
    }));

    return voteOnArticle(article_id, voteChange)
      .then((updatedArticle) => {
        console.log("Vote successful", updatedArticle.votes);
        setArticle((currentArticle) => ({
          ...currentArticle,
          votes: updatedArticle.votes,
        }));
      })
      .catch((err) => {
        console.error("Vote failed:", err);
        setArticle((currentArticle) => ({
          ...currentArticle,
          votes: currentArticle.votes - voteChange,
        }));
        throw err;
      });
  };
  const handleCommentPosted = (commentBody) => {
    console.log("📝 Posting comment:", commentBody);
    const optimisticComment = {
      comment_id: Date.now(),
      author: loggedInUser,
      body: commentBody,
      votes: 0,
      created_at: new Date().toISOString(),
    };
    setComments((currentComments) => [optimisticComment, ...currentComments]);
    return postComment(article_id, loggedInUser, commentBody)
      .then((newComment) => {
        console.log("✅ Comment posted:", newComment);
        setComments((currentComments) =>
          currentComments.map((comment) =>
            comment.comment_id === optimisticComment.comment_id
              ? newComment
              : comment
          )
        );
      })
      .catch((err) => {
        console.error("Posting failed:", err);
        setComments((currentComments) =>
          currentComments.filter(
            (comment) => comment.comment_id !== optimisticComment.comment_id
          )
        );

        throw err;
      });
  };
  if (isLoading) {
    return <Loading />;
  }

  return (
    <main className="article-page">
      <article className="article-detail">
        <img
          src={article.article_img_url}
          alt={article.title}
          className="article-detail-image"
        />

        <div className="article-header">
          <h1 className="article-detail-title">{article.title}</h1>

          <div className="article-detail-meta">
            <span className="meta-item topic">📁 {article.topic}</span>
            <span className="meta-item author">👤 By {article.author}</span>
            <span className="meta-item date">
              📅 {formatDate(article.created_at)}
            </span>
          </div>

          <div className="article-voting">
            <VoteButtons
              votes={article.votes}
              onVote={handleVote}
              itemType="article"
            />
            <span className="comments-count">
              💬 {comments.length} comments
            </span>
          </div>
        </div>

        <div className="article-body">
          <p>{article.body}</p>
        </div>
      </article>
      <CommentForm
        articleId={article_id}
        onCommentPosted={handleCommentPosted}
      />

      <CommentsList comments={comments} />
    </main>
  );
}

export default ArticlePage;
