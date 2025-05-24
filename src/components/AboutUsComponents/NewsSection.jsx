import React, { useEffect, useState } from 'react';
import i18n from '../../i18n/i18n';
import { useTranslation } from 'react-i18next';

const NewsCard = () => {
  const { t } = useTranslation();  // Use for tranclation words in page
  const [news, setNews] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);

  // News loading and language change processing
  useEffect(() => {
    // Function for downloading news from the server
    const fetchNews = async (lang) => {
      try {
        // Requesting news based on the current language
        const response = await fetch(`http://127.0.0.1:5000/api/news?lang=${lang}`);
        if (!response.ok) {
          throw new Error(`Server error: ${response.status}`);
        }
        const data = await response.json();
        setNews(data); // Saving the news
        setFilteredNews(data); // Initializing the filtered news
      } catch (err) {
        console.error('Error when uploading news:', err);
        setError('The news could not be uploaded. Try again later.'); // Error message
      }
    };

    // Loading on mounting
    fetchNews(i18n.language);


    const handleLanguageChange = (lng) => { // Language change subscription
      fetchNews(lng);
    };

    i18n.on('languageChanged', handleLanguageChange);

    // Clearing subscription
    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, []);

  // Filtering news by search query
  useEffect(() => {
    const newSorted = news.filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredNews(newSorted); // Updating filtered news
  }, [searchTerm, news]);

  return (
    <section id="news">
      <div className="news-wrapper">
        <h2 className="news-heading">{t('news_heading')}</h2>
        <label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t('search_news')}
          />
        </label>
        <div className="news-grid">
          {error ? (
            <p className="error-message">{error}</p>
          ) : news.length === 0 ? (
            <p className="error-message">{t('loading_news')}</p>
          ) : (
            filteredNews.map((item) => (
              <div className="news-card" key={item.id || item.title}>
                <div className="news-image-container">
                  <img src={item.image_url} alt={item.title} className="news-image" />
                </div>
                <div className="news-content">
                  <p className="news-date">{item.date}</p>
                  <div className="news-tags">
                    {item.tags?.map((tag) => (
                      <span className="news-tag" key={tag}>{tag}</span>
                    ))}
                  </div>
                  <h3 className="news-title">{item.title}</h3>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="news-link"
                  >
                    {t('learn_more')} →
                  </a>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default NewsCard;
