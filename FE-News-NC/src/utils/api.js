const BASE_URL = "";

export const fetchArticles = (topic) => {
  const url = topic
    ? `${BASE_URL}/api/articles?topic=${topic}`
    : `${BASE_URL}/api/articles`;
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
