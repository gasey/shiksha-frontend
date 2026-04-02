import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import blogsData from "../data/blogsData";
import "../css/BlogDetail.css";

const letters = ["A", "B", "C", "D"];

function PremiumQuiz({ quizMeta, quiz }) {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [revealed, setRevealed] = useState({});
  const [openSolutions, setOpenSolutions] = useState({});
  const [showScore, setShowScore] = useState(false);

  useEffect(() => {
    setSelectedAnswers({});
    setRevealed({});
    setOpenSolutions({});
    setShowScore(false);
  }, [quiz]);

  const score = quiz.reduce((total, q, index) => {
    return total + (revealed[index] && selectedAnswers[index] === q.answer ? 1 : 0);
  }, 0);

  const allChecked = quiz.length > 0 && quiz.every((_, index) => revealed[index]);

  const selectOption = (qIndex, option) => {
    if (revealed[qIndex]) return;
    setSelectedAnswers((prev) => ({ ...prev, [qIndex]: option }));
  };

  const checkAnswer = (qIndex) => {
    if (!selectedAnswers[qIndex]) return;
    setRevealed((prev) => ({ ...prev, [qIndex]: true }));
  };

  const toggleSolution = (qIndex) => {
    setOpenSolutions((prev) => ({ ...prev, [qIndex]: !prev[qIndex] }));
  };

  const handleShowScore = () => {
    setShowScore(true);

    setTimeout(() => {
      const resultBox = document.querySelector(".result-banner");
      if (resultBox) {
        resultBox.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 100);
  };

  return (
    <section className="premium-quiz-section">
      <div className="quiz-header">
        <div className="quiz-badge">{quizMeta?.badge || "📚 Knowledge Check"}</div>
        <h2 className="quiz-title">Test Your Understanding</h2>
        <p className="quiz-subtitle">{quizMeta?.subtitle}</p>

        <div className="quiz-stats">
          <div className="stat-item">
            <span className="stat-number">{quiz.length}</span>
            <span className="stat-label">Questions</span>
          </div>

          <div className="stat-item">
            <span className="stat-number">4</span>
            <span className="stat-label">Options Each</span>
          </div>

          <div className="stat-item">
            <span className="stat-number">{score}</span>
            <span className="stat-label">Your Score</span>
          </div>
        </div>
      </div>

      <div className={`result-banner ${showScore ? "show" : ""}`}>
        <div className="result-score">
          {score}/{quiz.length}
        </div>
        <div className="result-text">
          Great effort! Review the solutions to learn more.
        </div>
      </div>

      <div className="quiz-container">
        {quiz.map((q, qIndex) => {
          const selected = selectedAnswers[qIndex];
          const isRevealed = revealed[qIndex];

          return (
            <div className="question-card" key={qIndex}>
              <div className="question-header">
                <div className="question-number">{qIndex + 1}</div>
                <p className="question-text">{q.question}</p>
              </div>

              <div className="options-grid">
                {q.options.map((option, oIndex) => {
                  const isSelected = selected === option;
                  const isCorrect = q.answer === option;
                  const incorrectSelected = isRevealed && isSelected && !isCorrect;

                  return (
                    <button
                      key={option}
                      type="button"
                      className={`option-btn ${isSelected ? "selected" : ""} ${
                        isRevealed && isCorrect ? "correct" : ""
                      } ${incorrectSelected ? "incorrect" : ""} ${
                        isRevealed ? "disabled" : ""
                      }`}
                      onClick={() => selectOption(qIndex, option)}
                    >
                      <span className="option-letter">{letters[oIndex]}</span>
                      <span className="option-text">{option}</span>
                    </button>
                  );
                })}
              </div>

              <div className="action-row">
                <button
                  type="button"
                  className="reveal-btn"
                  onClick={() => checkAnswer(qIndex)}
                  disabled={!selected || isRevealed}
                >
                  ✓ Check Answer
                </button>

                <button
                  type="button"
                  className={`solution-btn ${openSolutions[qIndex] ? "open" : ""}`}
                  onClick={() => toggleSolution(qIndex)}
                >
                  <span>💡 Solution</span>
                  <span className="icon">▼</span>
                </button>
              </div>

              <div className={`solution-box ${openSolutions[qIndex] ? "show" : ""}`}>
                <span className="solution-label">
                  Answer: {letters[q.options.findIndex((item) => item === q.answer)]}
                </span>
                <p className="solution-text">{q.explanation}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="quiz-score-action">
        <button
          type="button"
          className="check-score-btn"
          onClick={handleShowScore}
          disabled={!allChecked}
        >
          Check Your Score
        </button>
      </div>
    </section>
  );
}

function BlogHero({ blog }) {
  return (
    <div className="blog-hero-card custom-blog-hero">
      <img src={blog.thumbnail} alt={blog.title} className="blog-hero-image" />
      <div className="blog-hero-overlay">
        <span className="blog-category-badge">{blog.category}</span>
        <h1>{blog.title}</h1>
        <p>{blog.subtitle}</p>
      </div>
    </div>
  );
}

function ClimateArticle({ blog }) {
  return (
    <article className="custom-article">
      <BlogHero blog={blog} />

      <section className="article-section">
        <h2 className="section-title">Introduction</h2>
        {blog.intro.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </section>

      <section className="article-section">
        <h2 className="section-title">Factors Affecting India&apos;s Climate</h2>
        {blog.factors.map((item) => (
          <div className="side-card" key={item.title}>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </div>
        ))}
      </section>

      <section className="article-section">
        <h2 className="section-title">Five Major Climate Zones of India</h2>
        <p>
          According to the Energy Conservation Building Code (ECBC) and National Building
          Code, India is divided into five distinct climate zones based on temperature,
          humidity, and rainfall patterns.
        </p>

        {blog.climateZones.map((zone) => (
          <div className="zone-card" key={zone.title}>
            <h3 className="zone-title">{zone.title}</h3>
            <p className="zone-region">
              <strong>Regions:</strong> {zone.regions}
            </p>

            <div className="stats-stack">
              {zone.stats.map((stat) => (
                <div className="stat-box-soft" key={stat.label}>
                  <strong>{stat.label}</strong>
                  <span>{stat.value}</span>
                </div>
              ))}
            </div>

            <p className="article-text">
              <strong>Key Characteristics:</strong> {zone.text}
            </p>
          </div>
        ))}
      </section>

      {blog.koppenIntro?.length > 0 && (
        <section className="article-section">
          <h2 className="section-title">Köppen Climate Classification of India</h2>

          {blog.koppenIntro.map((item, index) => (
            <p key={index}>{item}</p>
          ))}

          <div className="table-wrapper">
            <table className="overview-table">
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Climate Type</th>
                </tr>
              </thead>
              <tbody>
                {blog.koppenTypes?.map((item, index) => (
                  <tr key={item.code}>
                    <td>
                      <div className="table-num">{index + 1}</div>
                    </td>
                    <td>
                      <strong>{item.code}</strong> — {item.label}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {blog.extraClimateNotes?.map((note, index) => (
            <div className="side-card" key={index}>
              <p>{note}</p>
            </div>
          ))}
        </section>
      )}

      <section className="takeaways-section">
        <h2 className="section-title">Key Takeaways</h2>
        {blog.takeaways.map((item, index) => (
          <div className="takeaway-item" key={index}>
            <div className="takeaway-icon">✓</div>
            <div className="takeaway-text">{item}</div>
          </div>
        ))}
      </section>
    </article>
  );
}

function SoilArticle({ blog }) {
  return (
    <article className="custom-article soil-theme">
      <BlogHero blog={blog} />

      <section className="article-section">
        <h2 className="section-title">Introduction</h2>
        {blog.intro.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </section>

      <section className="chart-section">
        <h2 className="section-title">Soil Distribution in India</h2>
        <div className="chart-container">
          <div className="fake-pie-chart" />
          <div className="chart-legend">
            {blog.chartLegend.map((item) => (
              <div className="legend-item" key={item.name}>
                <span className="legend-color" style={{ background: item.color }} />
                <span className="legend-text">{item.name}</span>
                <span className="legend-percent">{item.percent}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {blog.soils.map((soil) => (
        <section
          className="soil-card"
          key={soil.title}
          style={{
            "--soil-gradient": soil.gradient,
            "--soil-shadow": soil.shadow
          }}
        >
          <div className="soil-header">
            <div className="soil-icon-wrapper">
              <span className="soil-icon-dot" />
            </div>

            <div className="soil-title-group">
              <h3>{soil.title}</h3>
              <div className="soil-subtitle">
                <span className="coverage-badge">{soil.coverage}</span>
                <span>{soil.subtitle}</span>
              </div>
            </div>
          </div>

          <div className="info-grid">
            {soil.info.map((item) => (
              <div className="info-box" key={item.label}>
                <div className="info-label">{item.label}</div>
                <div className="info-value">{item.value}</div>
              </div>
            ))}
          </div>

          {soil.blocks.map((block) => (
            <div className="content-block" key={block.label}>
              <strong>{block.label}:</strong> {block.text}
            </div>
          ))}

          <div className="crops-box">
            <div className="crops-label">Suitable Crops</div>
            <div className="crops-list">
              {soil.crops.map((crop) => (
                <span className="crop-tag" key={crop}>
                  {crop}
                </span>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="article-section">
        <h2 className="section-title">Comparison Table</h2>
        <div className="table-wrapper">
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Soil</th>
                <th>Coverage</th>
                <th>Main Region</th>
                <th>Major Crops</th>
              </tr>
            </thead>
            <tbody>
              {blog.comparisonTable.map((row) => (
                <tr key={row[0]}>
                  <td>{row[0]}</td>
                  <td>{row[1]}</td>
                  <td>{row[2]}</td>
                  <td>{row[3]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="takeaways-section">
        <h2 className="section-title">Key Takeaways</h2>
        {blog.takeaways.map((item, index) => (
          <div className="takeaway-item" key={index}>
            <div className="takeaway-icon">✓</div>
            <div className="takeaway-text">{item}</div>
          </div>
        ))}
      </section>
    </article>
  );
}

function FRArticle({ blog }) {
  return (
    <article className="custom-article">
      <BlogHero blog={blog} />

      <section className="article-section">
        <h2 className="section-title">Introduction</h2>
        {blog.intro.map((p) => (
          <p key={p}>{p}</p>
        ))}

        <div className="key-fact-box">
          <p className="key-fact-label">Important Fact</p>
          <p>{blog.keyFact}</p>
        </div>
      </section>

      <section className="rights-wheel-section">
        <h2 className="section-title">Six Fundamental Rights</h2>
        <div className="rights-wheel-container">
          {blog.rightsCards.map((item, index) => (
            <div className="right-card" key={item.name}>
              <div className="right-icon">{index + 1}</div>
              <div className="right-name">{item.name}</div>
              <div className="right-articles">{item.articles}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="article-section">
        <h2 className="section-title">Overview Table</h2>
        <div className="table-wrapper">
          <table className="overview-table">
            <thead>
              <tr>
                <th>No.</th>
                <th>Right</th>
                <th>Articles</th>
              </tr>
            </thead>
            <tbody>
              {blog.overviewTable.map((row) => (
                <tr key={row[0]}>
                  <td>
                    <div className="table-num">{row[0]}</div>
                  </td>
                  <td>{row[1]}</td>
                  <td>{row[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="article-section">
        <h2 className="section-title">Important Articles and Concepts</h2>
        {blog.articleBlocks.map((item) => (
          <div className="article-card" key={item.title}>
            <h3 className="article-title">{item.title}</h3>
            <p className="article-text">{item.text}</p>
          </div>
        ))}
      </section>

      <section className="article-section">
        <div className="quote-box">
          <p className="quote-text">{blog.quote.text}</p>
          <p className="quote-author">{blog.quote.author}</p>
        </div>
      </section>

      <section className="article-section">
        <h2 className="section-title">Constitutional Writs</h2>
        <div className="writs-grid">
          {blog.writs.map((writ) => (
            <div className="writ-card" key={writ.name}>
              <div className="writ-name">{writ.name}</div>
              <div className="writ-meaning">{writ.meaning}</div>
              <p className="writ-desc">{writ.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="article-section">
        <div className="note-box">
          <p>{blog.note}</p>
        </div>
      </section>

      <section className="takeaways-section">
        <h2 className="section-title">Key Takeaways</h2>
        {blog.takeaways.map((item, index) => (
          <div className="takeaway-item" key={index}>
            <div className="takeaway-icon">✓</div>
            <div className="takeaway-text">{item}</div>
          </div>
        ))}
      </section>
    </article>
  );
}

function renderArticle(blog) {
  if (blog.type === "climate") return <ClimateArticle blog={blog} />;
  if (blog.type === "soil") return <SoilArticle blog={blog} />;
  if (blog.type === "fr") return <FRArticle blog={blog} />;
  return null;
}

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const blog = blogsData.find((item) => item.id === id) || blogsData[0];

  const currentIndex = blogsData.findIndex((item) => item.id === blog.id);
  const prevBlog = currentIndex > 0 ? blogsData[currentIndex - 1] : null;
  const nextBlog =
    currentIndex < blogsData.length - 1 ? blogsData[currentIndex + 1] : null;

  const latestPosts = useMemo(() => {
    return blogsData.filter((item) => item.id !== blog.id).slice(0, 4);
  }, [blog.id]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  return (
    <div className="blog-detail-page">
      <div className="blog-detail-container">
        <div className="blog-detail-main">
          {renderArticle(blog)}

          {blog.quiz?.length > 0 && (
            <PremiumQuiz quizMeta={blog.quizMeta} quiz={blog.quiz} />
          )}

          <section className="article-navigation">
            {prevBlog ? (
              <button
                type="button"
                className="article-nav-card article-nav-button"
                onClick={() => navigate(`/blogs/${prevBlog.id}`)}
              >
                <span>← Previous Article</span>
                <strong>{prevBlog.title}</strong>
              </button>
            ) : (
              <div />
            )}

            {nextBlog ? (
              <button
                type="button"
                className="article-nav-card article-nav-button"
                onClick={() => navigate(`/blogs/${nextBlog.id}`)}
              >
                <span>Next Article →</span>
                <strong>{nextBlog.title}</strong>
              </button>
            ) : (
              <div />
            )}
          </section>
        </div>

        <aside className="blog-detail-sidebar">
          <div className="sidebar-card">
            <h3>Latest Post</h3>
            <div className="latest-post-list">
              {latestPosts.map((post) => (
                <Link
                  to={`/blogs/${post.id}`}
                  className="latest-post-item"
                  key={post.id}
                >
                  <img src={post.thumbnail} alt={post.title} />
                  <div>
                    <p>{post.title}</p>
                    <span>{post.readTime}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="sidebar-card">
            <h3>Categories</h3>
            <div className="category-list">
              {["Geography", "Polity", "History", "Economy"].map((item, index) => (
                <span key={index} className="category-item">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="sidebar-card">
            <h3>Other Important Articles</h3>
            <ul className="sidebar-links">
              {latestPosts.map((post) => (
                <li key={post.id}>
                  <Link to={`/blogs/${post.id}`}>{post.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default BlogDetail;