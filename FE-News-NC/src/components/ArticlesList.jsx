import { useState, useEffect } from "react";
import { fetchArticles } from "../utils/api";
import Loading from "./Loading";

function ArticlesList() {
  const [articles, setArticles] = useState([]); // ← ADD THIS LINE!
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    fetchArticles()
      .then((articlesData) => {
        setArticles(articlesData);
        setIsLoading(false);
      })
      .catch((err) => {
        setError("Failed to load articles. Please try again later.");
        setIsLoading(false);
        console.error(err);
      });
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="error-message">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <section className="articles-list">
      <h1>All Articles</h1>
      <div className="articles-grid">
        {articles.map((article) => (
          <div key={article.article_id} className="article-card">
            <img
              src={article.article_img_url}
              alt={article.title}
              className="article-image"
            />

            <div className="article-content">
              <h2>{article.title}</h2>
              <p>By {article.author}</p>
              <p>Topic: {article.topic}</p>
              <p>Date: {formatDate(article.created_at)}</p>
              <p>Votes: {article.votes}</p>
              <p>Comments: {article.comment_count || 0}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ArticlesList;
