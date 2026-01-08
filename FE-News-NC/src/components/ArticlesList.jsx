import { useState, useEffect } from "react";
import { fetchArticles } from "../utils/api";
import ArticleCard from "./ArticleCard";
import Loading from "./Loading";

function ArticlesList() {
  const [articles, setArticles] = useState([]);
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
          <ArticleCard key={article.article_id} article={article} />
        ))}
      </div>
    </section>
  );
}

export default ArticlesList;
