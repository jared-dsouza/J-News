import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchArticleById } from "../utils/api";
import Loading from "../components/Loading";

function ArticlePage() {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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

    fetchArticleById(article_id).then((articleData) => {
      setArticle(articleData);
      setIsLoading(false);
    });
  }, [article_id]);

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

          <div className="article-detail-stats">
            <span className="stat-item votes">⬆ {article.votes} votes</span>
            <span className="stat-item comments">
              💬 {article.comment_count || 0} comments
            </span>
          </div>
        </div>

        <div className="article-body">
          <p>{article.body}</p>
        </div>
      </article>
    </main>
  );
}

export default ArticlePage;
