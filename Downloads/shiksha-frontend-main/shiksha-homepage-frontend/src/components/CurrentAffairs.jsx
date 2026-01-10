import { useState, useEffect } from 'react';
import '../css/CurrentAffairs.css';

const CurrentAffairs = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCurrentAffairs();
  }, []);

  const fetchCurrentAffairs = async () => {
    try {
      // GNews API - Free tier allows client-side requests
      // Get your free API key from https://gnews.io/
      const API_KEY = '95c7ba11755ab8e91c0ebed1cf3b56bd'; // Replace with your GNews API key
      const response = await fetch(
        `https://gnews.io/api/v4/top-headlines?country=in&category=general&apikey=${API_KEY}&max=10`
      );

      console.log('API Response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error response:', errorText);
        throw new Error(`API Error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log('API Response data:', data);

      // Transform GNews data to match our component structure
      const transformedArticles = data.articles.map(article => ({
        title: article.title,
        description: article.description,
        urlToImage: article.image,
        source: { name: article.source.name },
        publishedAt: article.publishedAt,
        url: article.url
      }));

      setNews(transformedArticles);
    } catch (error) {
      console.error('Error fetching current affairs:', error);
      setError(`Failed to load current affairs: ${error.message}. Make sure to add your GNews API key.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="current-affairs-page">
      <h1>Daily Current Affairs</h1>
      <p className="page-description">
        Stay updated with the latest news and current affairs from around the world
      </p>

      {loading ? (
        <div className="loading">
          <p>Loading current affairs...</p>
        </div>
      ) : error ? (
        <div className="error">
          <p>{error}</p>
          <p>
            To get news updates, sign up for a free API key at{' '}
            <a href="https://gnews.io" target="_blank" rel="noopener noreferrer">
              GNews.io
            </a>{' '}
            and replace 'YOUR_GNEWS_API_KEY_HERE' in the code.
          </p>
        </div>
      ) : (
        <div className="news-grid">
          {news.map((article, index) => (
            <div key={index} className="news-card">
              {article.urlToImage && (
                <img
                  src={article.urlToImage}
                  alt={article.title}
                  className="news-image"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              )}
              <div className="news-content">
                <h3 className="news-title">{article.title}</h3>
                <p className="news-description">
                  {article.description || 'No description available'}
                </p>
                <div className="news-meta">
                  <span className="news-source">{article.source?.name}</span>
                  <span className="news-date">
                    {new Date(article.publishedAt).toLocaleDateString()}
                  </span>
                </div>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="read-more-link"
                >
                  Read Full Article →
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CurrentAffairs;