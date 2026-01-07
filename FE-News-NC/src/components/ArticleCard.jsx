import { Link } from "react-router-dom";

function ArticleCard({ article }) {
  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-GB", options);
  };

  return (
    <article className="article-card">
      <Link to={`/articles/${article.article_id}`}>
        <img
          src={article.article_img_url}
          alt={article.title}
          className="article-image"
        />
      </Link>

      <div className="article-content">
        <h2>
          <Link to={`/articles/${article.article_id}`} className="article-link">
            {article.title}
          </Link>
        </h2>

        <div className="article-meta">
          <span className="meta-item topic">📁 {article.topic}</span>
          <span className="separator">•</span>
          <span className="meta-item author">👤 {article.author}</span>
          <span className="separator">•</span>
          <span className="meta-item date">
            📅 {formatDate(article.created_at)}
          </span>
        </div>

        <div className="article-stats">
          <span className="votes">⬆ {article.votes} votes</span>
          <span className="comments">
            💬 {article.comment_count || 0} comments
          </span>
        </div>
      </div>
    </article>
  );
}

export default ArticleCard;
