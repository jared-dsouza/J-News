import ArticlesList from "../components/ArticlesList";

function HomePage() {
  return (
    <main className="home-page">
      <section className="welcome-section">
        <h2>Welcome to NC News</h2>
        <p>
          Discover the latest articles, join discussions, and stay informed.
          Read content from our community of writers.
        </p>
      </section>

      <ArticlesList />
    </main>
  );
}

export default HomePage;
