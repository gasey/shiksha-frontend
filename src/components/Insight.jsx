import React, { useState, useEffect } from 'react';
import '../css/Insight.css';

const Insight = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [articleData, setArticleData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleRelatedTopicClick = async (topicTitle) => {
    setSearchQuery(topicTitle);
    // Trigger search automatically
    setLoading(true);
    setError('');
    setArticleData(null);

    try {
      const data = await fetchArticleData(topicTitle);
      setArticleData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setLoading(true);
    setError('');
    setArticleData(null);

    try {
      const data = await fetchArticleData(searchQuery.trim());
      setArticleData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchArticleData = async (query) => {
    try {
      const wikipediaData = await fetchWikipediaSummary(query);
      let description = null;
      let introHtml = null;
      let wikidataData = null;
      let dbpediaData = null;
      let relatedTopics = [];

      // Fetch a short description for the sidebar
      try {
        const extractResponse = await fetch(`https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro=true&explaintext=true&exchars=300&format=json&titles=${encodeURIComponent(query)}&origin=*`);
        if (extractResponse.ok) {
          const extractData = await extractResponse.json();
          const pages = extractData.query.pages;
          const pageId = Object.keys(pages)[0];
          const page = pages[pageId];
          if (!page.missing) {
            description = page.extract;
          }
        }
      } catch (err) {
        console.warn('Description fetch failed:', err);
      }

      // Fetch intro HTML for summary
      try {
        const introResponse = await fetch(`https://en.wikipedia.org/w/api.php?action=parse&page=${encodeURIComponent(query)}&prop=text&section=0&format=json&origin=*`);
        if (introResponse.ok) {
          const introData = await introResponse.json();
          if (introData.parse && introData.parse.text) {
            introHtml = introData.parse.text['*'];
          }
        }
      } catch (err) {
        console.warn('Intro HTML fetch failed:', err);
      }

      // Try to fetch additional data but don't fail if they don't work
      try {
        wikidataData = await fetchWikidata(query);
      } catch (err) {
        console.warn('Wikidata fetch failed:', err);
      }

      try {
        dbpediaData = await fetchDBpedia(query);
      } catch (err) {
        console.warn('DBpedia fetch failed:', err);
      }

      try {
        relatedTopics = await fetchRelatedTopics(query);
      } catch (err) {
        console.warn('Related topics fetch failed:', err);
      }

      return {
        title: wikipediaData.title,
        summary: introHtml || description,
        description: description,
        sections: wikipediaData.sections || [],
        infobox: wikidataData,
        metadata: dbpediaData,
        relatedTopics: relatedTopics,
        originalExtract: wikipediaData.extract
      };
    } catch (err) {
      throw new Error(`Failed to fetch article data: ${err.message}`);
    }
  };

  const fetchWikipediaSummary = async (title) => {
    try {
      // Get the full page content using the parse API
      const parseResponse = await fetch(`https://en.wikipedia.org/w/api.php?action=parse&page=${encodeURIComponent(title)}&prop=text&format=json&origin=*`);
      if (parseResponse.ok) {
        const parseData = await parseResponse.json();
        if (parseData.parse && parseData.parse.text) {
          const fullContent = parseData.parse.text['*'];

          // Also get sections for table of contents
          try {
            const sectionsResponse = await fetch(`https://en.wikipedia.org/api/rest_v1/page/mobile-sections/${encodeURIComponent(title)}`);
            if (sectionsResponse.ok) {
              const sectionsData = await sectionsResponse.json();
              const sections = sectionsData.remaining?.sections || [];
              // Filter out unwanted sections like "See also", "References", "External links"
              const filteredSections = sections.filter(section =>
                !['See also', 'References', 'External links', 'Bibliography', 'Further reading', 'Notes'].includes(section.line)
              );
              return {
                title: parseData.parse.title,
                extract: fullContent,
                sections: filteredSections.slice(0, 20), // Increased limit to 20 sections
                originalExtract: fullContent
              };
            }
          } catch (sectionsErr) {
            console.warn('Sections fetch failed, using full content only:', sectionsErr);
          }

          return {
            title: parseData.parse.title,
            extract: fullContent,
            sections: [],
            originalExtract: fullContent
          };
        }
      }

      // Fallback: Try to get a very long extract (no character limit)
      const extractResponse = await fetch(`https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro=false&explaintext&format=json&titles=${encodeURIComponent(title)}&origin=*`);
      if (extractResponse.ok) {
        const extractData = await extractResponse.json();
        const pages = extractData.query.pages;
        const pageId = Object.keys(pages)[0];
        const page = pages[pageId];
        if (!page.missing) {
          const fullExtract = page.extract;
          // Now try to get sections
          try {
            const sectionsResponse = await fetch(`https://en.wikipedia.org/api/rest_v1/page/mobile-sections/${encodeURIComponent(title)}`);
            if (sectionsResponse.ok) {
              const sectionsData = await sectionsResponse.json();
              const sections = sectionsData.remaining?.sections || [];
              // Filter out unwanted sections like "See also", "References", "External links"
              const filteredSections = sections.filter(section =>
                !['See also', 'References', 'External links', 'Bibliography', 'Further reading', 'Notes'].includes(section.line)
              );
              return {
                title: sectionsData.displaytitle || page.title,
                extract: fullExtract,
                sections: filteredSections.slice(0, 20), // Increased limit to 20 sections
                originalExtract: fullExtract
              };
            }
          } catch (sectionsErr) {
            console.warn('Sections fetch failed, using extract only:', sectionsErr);
          }
          return {
            title: page.title,
            extract: fullExtract,
            sections: [],
            originalExtract: fullExtract
          };
        }
      }

      // Final fallback to mobile-sections API
      const response = await fetch(`https://en.wikipedia.org/api/rest_v1/page/mobile-sections/${encodeURIComponent(title)}`);
      if (!response.ok) throw new Error('Failed to fetch Wikipedia content');
      const data = await response.json();
      const fullText = data.lead?.sections?.map(section => section.text).join(' ') || data.extract || '';
      const sections = data.remaining?.sections || [];
      // Filter out unwanted sections like "See also", "References", "External links"
      const filteredSections = sections.filter(section =>
        !['See also', 'References', 'External links', 'Bibliography', 'Further reading', 'Notes'].includes(section.line)
      );
      return {
        title: data.displaytitle || title,
        extract: fullText,
        sections: filteredSections.slice(0, 20), // Increased limit to 20 sections
        originalExtract: fullText
      };
    } catch (err) {
      // Final fallback with search
      try {
        const searchResponse = await fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(title)}&format=json&origin=*`);
        if (!searchResponse.ok) throw new Error('Page not found and search failed');
        const searchData = await searchResponse.json();
        if (searchData.query.search && searchData.query.search.length > 0) {
          const bestMatch = searchData.query.search[0].title;
          // Retry with the best match
          return await fetchWikipediaSummary(bestMatch);
        } else {
          throw new Error('Page not found');
        }
      } catch (fallbackErr) {
        throw new Error(`Failed to fetch article: ${fallbackErr.message}`);
      }
    }
  };



  const fetchWikidata = async (title) => {
    try {
      // First search for the Wikidata ID
      const searchResponse = await fetch(`https://www.wikidata.org/w/api.php?action=wbsearchentities&search=${encodeURIComponent(title)}&language=en&format=json&origin=*`);
      if (!searchResponse.ok) throw new Error('Failed to search Wikidata');
      const searchData = await searchResponse.json();

      if (!searchData.search || searchData.search.length === 0) {
        return null;
      }

      const qid = searchData.search[0].id;

      // Then fetch the entity data
      const entityResponse = await fetch(`https://www.wikidata.org/wiki/Special:EntityData/${qid}.json`);
      if (!entityResponse.ok) throw new Error('Failed to fetch Wikidata entity');
      const entityData = await entityResponse.json();

      return entityData.entities[qid];
    } catch (err) {
      console.warn('Wikidata fetch failed:', err);
      return null;
    }
  };

  const fetchDBpedia = async (title) => {
    try {
      const response = await fetch(`https://dbpedia.org/data/${encodeURIComponent(title)}.json`);
      if (!response.ok) throw new Error('Failed to fetch DBpedia data');
      return await response.json();
    } catch (err) {
      console.warn('DBpedia fetch failed:', err);
      return null;
    }
  };

  const fetchRelatedTopics = async (title) => {
    try {
      console.log('Fetching related topics for:', title);
      const response = await fetch(`https://en.wikipedia.org/api/rest_v1/page/related/${encodeURIComponent(title)}`);
      if (!response.ok) throw new Error('Failed to fetch related topics');
      const data = await response.json();
      console.log('Related topics data:', data);
      const topics = data.pages?.slice(0, 5) || [];
      console.log('Processed related topics:', topics);
      return topics;
    } catch (err) {
      console.warn('Related topics fetch failed:', err);
      return [];
    }
  };

  // Removed AI summary generation due to hardcoded API key security issue
  // const generateAISummary = async (text) => { ... }

  return (
    <div className="insight-page">
      {/* Header with Search Bar */}
      <header className="insight-header">
        <div className="insight-container">
          <div className="insight-search-bar">
            <input
              type="text"
              placeholder="Search insights..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={loading}
            />
            <button onClick={handleSearch} disabled={loading || !searchQuery.trim()}>
              {loading ? (
                <div className="loading-spinner"></div>
              ) : (
                <svg fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          </div>
          {error && <div className="error-message">{error}</div>}
        </div>
      </header>

      {/* Main Content */}
      <div className="insight-container">
        <div className="insight-grid">
          {/* Main Article */}
          <main>
            {loading ? (
              <div className="loading-container">
                <div className="loading-spinner large"></div>
                <p>Loading article...</p>
              </div>
            ) : articleData ? (
              <article className="insight-article-content">
                <h1>{articleData.title}</h1>

                <p dangerouslySetInnerHTML={{ __html: articleData.summary.replace(/<a[^>]*>(.*?)<\/a>/g, '$1').replace(/\n/g, '<br>') }} />

                {articleData.sections && articleData.sections.length > 0 && (
                  <div className="insight-toc">
                    <h2>Contents</h2>
                    <ol>
                      {articleData.sections.map((section, index) => (
                        <li key={index}>
                          <a href={`#section-${index}`}>{section.line || section.anchor}</a>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}

                {articleData.sections && articleData.sections.map((section, index) => (
                  <section key={index} id={`section-${index}`}>
                    <h2>{section.line || section.anchor}</h2>
                    {section.text && <div dangerouslySetInnerHTML={{ __html: section.text }} />}
                  </section>
                ))}

                {/*<section className="insight-related-topics">
                  <h2>Related Topics</h2>
                  <ul>
                    {articleData.relatedTopics && articleData.relatedTopics.length > 0 ? (
                      articleData.relatedTopics.map((topic, index) => (
                        <li key={index}>
                          <button
                            onClick={() => handleRelatedTopicClick(topic.title)}
                            className="related-topic-link"
                          >
                            {topic.title}
                          </button>
                          {topic.description && <span> - {topic.description}</span>}
                        </li>
                      ))
                    ) : (
                      <>
                        {articleData.infobox && articleData.infobox.claims && articleData.infobox.claims.P361 && articleData.infobox.claims.P361.length > 0 && (
                          <li>Part of: {articleData.infobox.claims.P361[0].mainsnak?.datavalue?.value?.id || 'Related entity'}</li>
                        )}
                        {articleData.infobox && articleData.infobox.claims && articleData.infobox.claims.P279 && articleData.infobox.claims.P279.length > 0 && (
                          <li>Subclass of: {articleData.infobox.claims.P279[0].mainsnak?.datavalue?.value?.id || 'Related class'}</li>
                        )}
                        {articleData.infobox && articleData.infobox.claims && articleData.infobox.claims.P31 && articleData.infobox.claims.P31.length > 0 && (
                          <li>Instance of: {articleData.infobox.claims.P31[0].mainsnak?.datavalue?.value?.id || 'Related instance'}</li>
                        )}
                        <li>Explore more about {articleData.title} through related searches.</li>
                      </>
                    )}
                  </ul>
                </section>*/}
              </article>
            ) : (
              <article className="insight-article-content">
                <h1>Welcome to Shiksha Insights</h1>
                <p>
                  Search for any topic above to get comprehensive information.
                </p>
                <p>
                  Try searching for topics like "Albert Einstein", "Machine Learning", or "Ancient Rome" to see the full information.
                </p>
              </article>
            )}
          </main>

          {/* Right Column */}
          <div className="right-column">
            {/* Left Sidebar */}
            <aside>
              <div className="insight-sidebar">
                <h3>Categories</h3>
                <ul>
                  <li><a href="#">Education</a></li>
                  <li><a href="#">Technology</a></li>
                  <li><a href="#">Science</a></li>
                  <li><a href="#">History</a></li>
                </ul>

                {articleData && articleData.sections && articleData.sections.length > 0 && (
                  <>
                    <h3>Table of Contents</h3>
                    <ul>
                      {articleData.sections.map((section, index) => (
                        <li key={index}>
                          <button onClick={() => scrollToSection(`section-${index}`)}>
                            {section.line || section.anchor}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </aside>

            {/* Right Sidebar - Infobox */}
            <aside>
              {articleData ? (
                <div className="insight-infobox">
                  <h3>{articleData.title}</h3>

                  {/* Basic Info */}
                  <h4>Article Information</h4>
                  <ul>
                    <li><strong>Topic:</strong> {articleData.title}</li>
                    {articleData.sections && articleData.sections.length > 0 && (
                      <li><strong>Sections:</strong> {articleData.sections.length}</li>
                    )}
                  </ul>

                  {/* Description from Wikipedia summary */}
                  <h4>Description</h4>
                  <p>
                    {articleData.description || 'No description available.'}
                  </p>

                  {articleData.infobox && articleData.infobox.aliases?.en && articleData.infobox.aliases.en.length > 0 && (
                    <>
                      <h4>Also Known As</h4>
                      <ul>
                        {articleData.infobox.aliases.en.slice(0, 3).map((alias, index) => (
                          <li key={index}>{alias.value}</li>
                        ))}
                      </ul>
                    </>
                  )}

                  <h4>Related Links</h4>
                  <ul>
                    {articleData.relatedTopics && articleData.relatedTopics.length > 0 ? (
                      articleData.relatedTopics.slice(0, 10).map((topic, index) => (
                        <li key={index}>
                          <a
                            href={`https://en.wikipedia.org/wiki/${encodeURIComponent(topic.title)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {topic.title}
                          </a>
                          {topic.description && <span> - {topic.description}</span>}
                        </li>
                      ))
                    ) : (
                      <li>No related links available for this topic.</li>
                    )}
                  </ul>
                </div>
              ) : (
                <div className="insight-infobox">
                  <h3>Shiksha Insights</h3>
                  <img src="/Shiksha.png" alt="Shiksha" />
                  <p>Search for any topic to see structured information.</p>
                  <h4>Key Highlights</h4>
                    <ul>
                      <li>In-depth explanations of topics</li>
                      <li>Clear summaries for quick understanding</li>
                      <li>Sections and tables for structured learning</li>
                      <li>Related topics for extended exploration</li>
                    </ul>
                </div>
              )}
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Insight;  
