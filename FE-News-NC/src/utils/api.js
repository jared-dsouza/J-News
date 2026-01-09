const BASE_URL = "https://j-news.onrender.com";

export const fetchArticles = () => {
  const url = `${BASE_URL}/api/articles`;
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      return data.articles;
    })
    .catch((error) => {
      console.error("Error fetching articles:", error);
      throw error;
    });
};

export const fetchArticleById = (articleId) => {
  const url = `${BASE_URL}/api/articles/${articleId}`;
  return fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data.article;
    })
    .catch((error) => {
      console.error("Error fetching article:", error);
      throw error;
    });
};

export const fetchCommentsByArticleId = (articleId) => {
  const url = `${BASE_URL}/api/articles/${articleId}/comments`;
  return fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data.comments;
    })
    .catch((error) => {
      console.error("Error fetching comments:", error);
      throw error;
    });
};

export const voteOnArticle = (articleId, voteChange) => {
  const url = `${BASE_URL}/api/articles/${articleId}`;

  return fetch(url, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ inc_votes: voteChange }),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data.article;
    })
    .catch((error) => {
      console.error("Error fetching votes:", error);
      throw error;
    });
};

export const postComment = (articleId, author, body) => {
  const url = `${BASE_URL}/api/articles/${articleId}/comments`;
  return fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ author, body }),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data.comment;
    })
    .catch((error) => {
      console.error("Error posting comments:", error);
      throw error;
    });
};
