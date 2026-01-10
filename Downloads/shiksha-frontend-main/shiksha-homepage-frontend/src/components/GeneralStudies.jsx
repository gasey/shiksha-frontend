import React, { useState, useEffect, useCallback } from 'react';
import '../css/GeneralStudies.css';
import { useLanguage } from '../contexts/LanguageContext';
import OpenAI from 'openai';

const sampleCurrentAffairs = {
  '2024-10-01': [
    {
      id: 'tribunal-reforms-2021-sc-judgement',
      category: 'Indian Polity',
      heading: 'Supreme Court on Tribunal Reforms Act, 2021',
      intro: 'The Supreme Court struck down multiple provisions of the Tribunal Reforms Act, 2021 for violating judicial independence and the separation of powers.',
      points: [
        'The Court held that Parliament cannot dilute basic features of the Constitution through ordinary law.',
        'Fixed tenure and appointment rules for tribunal members were found to undermine judicial autonomy.',
        'The ruling emphasized the need to maintain checks and balances in governance.'
      ]
    },
    {
      id: 'naturopathy-day-2024',
      category: 'Science and Technology',
      heading: '8th Naturopathy Day at Nisarg Gram, Pune',
      intro: 'Naturopathy Day 2024 highlighted natural lifestyle, Gandhian ideals and harmony with nature.',
      points: [
        'The event promoted preventive healthcare through naturopathy practices.',
        'It emphasized integrating traditional healing systems with modern health policy.',
        'Discussions focused on sustainable living and environmental consciousness.'
      ]
    },
    {
      id: 'india-us-defense-partnership',
      category: 'International Relations',
      heading: 'India-US Defense Partnership Strengthens',
      intro: 'Recent developments in India-US defense cooperation mark a significant milestone in bilateral relations.',
      points: [
        'Joint military exercises and technology sharing agreements were finalized.',
        'Focus on maritime security and counter-terrorism collaboration.',
        'Enhanced defense industrial cooperation for mutual benefit.'
      ]
    }
  ],
  '2024-10-02': [
    {
      id: 'renewable-energy-policy-2024',
      category: 'Environment & Ecology',
      heading: 'New Renewable Energy Policy Announced',
      intro: 'The government unveiled an ambitious renewable energy policy aiming for 500 GW capacity by 2030.',
      points: [
        'Policy includes incentives for solar and wind energy projects.',
        'Focus on reducing dependence on fossil fuels and carbon emissions.',
        'Investment targets set for green energy infrastructure development.'
      ]
    },
    {
      id: 'digital-india-mission-update',
      category: 'Science and Technology',
      heading: 'Digital India Mission Progress Report',
      intro: 'Significant progress made in expanding digital infrastructure across rural and urban areas.',
      points: [
        'Increased internet connectivity in remote regions.',
        'Digital literacy programs benefiting millions of citizens.',
        'E-governance initiatives streamlining public services.'
      ]
    }
  ],
  '2024-10-03': [
    {
      id: 'education-bill-parliament',
      category: 'Indian Polity',
      heading: 'Parliament Passes New Education Bill',
      intro: 'A comprehensive education bill was passed, focusing on improving quality and accessibility of education nationwide.',
      points: [
        'Emphasis on skill-based learning and vocational training.',
        'Increased funding for educational infrastructure in rural areas.',
        'Reforms aimed at reducing educational disparities across states.'
      ]
    },
    {
      id: 'agricultural-innovation',
      category: 'Economy',
      heading: 'Agricultural Innovation Initiatives',
      intro: 'New programs launched to boost agricultural productivity and farmer income.',
      points: [
        'Introduction of climate-resilient crop varieties.',
        'Digital platforms for direct farmer-to-consumer marketing.',
        'Support for organic farming and sustainable agricultural practices.'
      ]
    }
  ],
  '2024-10-04': [
    {
      id: 'tech-summit-bangalore',
      category: 'Science and Technology',
      heading: 'Major Technology Summit in Bangalore',
      intro: 'A major technology summit showcased innovations in AI, software development, and emerging technologies.',
      points: [
        'Discussions on artificial intelligence applications in various sectors.',
        'Startup ecosystem growth and investment opportunities highlighted.',
        'Focus on cybersecurity and digital transformation strategies.'
      ]
    }
  ],
  '2024-10-05': [
    {
      id: 'climate-change-conference',
      category: 'Environment & Ecology',
      heading: 'India Hosts Climate Change Conference',
      intro: 'India hosted an international conference on climate change, discussing global efforts to reduce emissions.',
      points: [
        'Emphasis on renewable energy transition and carbon neutrality goals.',
        'International cooperation for climate adaptation strategies.',
        'Discussions on sustainable development and green financing.'
      ]
    }
  ],
  '2024-10-06': [
    {
      id: 'healthcare-initiative',
      category: 'Social Issues',
      heading: 'National Healthcare Initiative Launched',
      intro: 'A new healthcare initiative was launched to provide better medical facilities in rural areas.',
      points: [
        'Expansion of primary healthcare centers in underserved regions.',
        'Telemedicine services to improve access to specialist care.',
        'Focus on preventive healthcare and health education programs.'
      ]
    }
  ],
  '2024-10-07': [
    {
      id: 'sports-achievements',
      category: 'Sports',
      heading: 'Indian Athletes Achieve New Records',
      intro: 'Indian athletes achieved new records in international sports competitions, bringing pride to the nation.',
      points: [
        'Medal wins in track and field events at international championships.',
        'Breakthrough performances in individual and team sports.',
        'Increased focus on sports infrastructure and training facilities.'
      ]
    }
  ],
  '2024-10-08': [
    {
      id: 'infrastructure-development',
      category: 'Economy',
      heading: 'Major Infrastructure Projects Inaugurated',
      intro: 'Major infrastructure projects were inaugurated, improving connectivity across states.',
      points: [
        'New highways and railway lines enhancing inter-state connectivity.',
        'Urban development projects improving quality of life.',
        'Investment in smart city initiatives and public transportation.'
      ]
    }
  ],
  '2024-10-09': [
    {
      id: 'cultural-festival',
      category: 'Culture & Heritage',
      heading: 'National Cultural Festival Celebrated',
      intro: 'A national cultural festival celebrated India\'s diverse heritage and traditions.',
      points: [
        'Showcasing traditional arts, music, and dance forms.',
        'Promotion of cultural diversity and inter-cultural dialogue.',
        'Events highlighting India\'s rich historical and artistic legacy.'
      ]
    }
  ],
  '2024-10-10': [
    {
      id: 'scientific-breakthrough',
      category: 'Science and Technology',
      heading: 'Indian Scientists Make Medical Breakthrough',
      intro: 'Indian scientists made a breakthrough in medical research, leading to new treatment options.',
      points: [
        'Development of innovative treatments for chronic diseases.',
        'Advances in pharmaceutical research and drug discovery.',
        'Collaboration between research institutions and industry partners.'
      ]
    }
  ],
  '2024-10-11': [
    {
      id: 'election-results',
      category: 'Indian Polity',
      heading: 'State Election Results Announced',
      intro: 'The results of the recent state elections were announced, bringing new governments to power.',
      points: [
        'Voter turnout and democratic participation highlighted.',
        'Policy priorities of newly elected governments discussed.',
        'Focus on governance reforms and development agendas.'
      ]
    }
  ],
  '2024-10-12': [
    {
      id: 'trade-agreement',
      category: 'Economy',
      heading: 'New Trade Agreement Signed',
      intro: 'India signed a new trade agreement with neighboring countries to boost economic cooperation.',
      points: [
        'Reduction in trade barriers and tariff concessions.',
        'Enhanced market access for goods and services.',
        'Opportunities for joint ventures and investment partnerships.'
      ]
    }
  ],
  '2024-10-13': [
    {
      id: 'festival-celebrations',
      category: 'Culture & Heritage',
      heading: 'Major Festivals Celebrated Nationwide',
      intro: 'Major festivals were celebrated across the country with traditional events and cultural programs.',
      points: [
        'Religious and cultural festivals promoting social harmony.',
        'Community participation in traditional ceremonies and rituals.',
        'Emphasis on preserving cultural traditions and heritage.'
      ]
    }
  ],
  '2024-10-14': [
    {
      id: 'technology-innovation',
      category: 'Science and Technology',
      heading: 'Technology Innovation Hub Inaugurated',
      intro: 'A new technology innovation hub was inaugurated in a major city to foster startups and innovation.',
      points: [
        'Support for technology startups and entrepreneurship.',
        'Research and development facilities for emerging technologies.',
        'Collaboration between academia, industry, and government.'
      ]
    }
  ],
  '2024-10-15': [
    {
      id: 'agricultural-reforms',
      category: 'Economy',
      heading: 'Agricultural Reforms Introduced',
      intro: 'New agricultural reforms were introduced to improve farmer welfare and crop yields.',
      points: [
        'Contract farming and direct marketing initiatives.',
        'Support for sustainable farming practices and crop diversification.',
        'Financial assistance and insurance schemes for farmers.'
      ]
    }
  ],
  '2024-10-16': [
    {
      id: 'international-summit',
      category: 'International Relations',
      heading: 'India Hosts International Summit',
      intro: 'India hosted an international summit on global security and cooperation.',
      points: [
        'Discussions on regional security and conflict resolution.',
        'Emphasis on multilateral cooperation and diplomacy.',
        'Focus on sustainable development and global partnerships.'
      ]
    }
  ],
  '2024-10-17': [
    {
      id: 'sports-event',
      category: 'Sports',
      heading: 'International Sports Event Concludes',
      intro: 'A major international sports event concluded with India achieving notable successes.',
      points: [
        'Athletic performances and medal achievements celebrated.',
        'Infrastructure development for sports facilities.',
        'Promotion of sports as a tool for national development.'
      ]
    }
  ],
  '2024-10-18': [
    {
      id: 'environmental-initiative',
      category: 'Environment & Ecology',
      heading: 'Nationwide Environmental Initiative Launched',
      intro: 'A nationwide environmental initiative was launched to combat pollution and promote sustainability.',
      points: [
        'Tree plantation drives and afforestation programs.',
        'Waste management and pollution control measures.',
        'Public awareness campaigns on environmental conservation.'
      ]
    }
  ],
  '2024-10-19': [
    {
      id: 'education-policy-update',
      category: 'Social Issues',
      heading: 'Education Policy Updates Announced',
      intro: 'Updates to the national education policy were announced to enhance learning outcomes.',
      points: [
        'Curriculum reforms and assessment methods revised.',
        'Focus on inclusive education and skill development.',
        'Integration of technology in teaching and learning processes.'
      ]
    }
  ],
  '2024-10-20': [
    {
      id: 'economic-indicators',
      category: 'Economy',
      heading: 'Positive Economic Indicators Reported',
      intro: 'Latest economic indicators showed positive growth in key sectors of the economy.',
      points: [
        'GDP growth rates and sectoral performance analysis.',
        'Employment generation and income distribution trends.',
        'Inflation control and monetary policy effectiveness.'
      ]
    }
  ]
};

const sampleDailyTopics = {
  '2024-10-01': [
    { title: 'Geography: Rivers of India', content: 'The major rivers of India include the Ganges, Yamuna, Brahmaputra, Indus, and Godavari. These rivers play crucial roles in agriculture, transportation, and the economy.' },
    { title: 'History: Ancient Civilizations', content: 'Ancient India had advanced civilizations like the Indus Valley Civilization (3300-1300 BCE) and the Vedic period that followed.' }
  ],
  '2024-10-02': [
    { title: 'Science: Renewable Energy', content: 'Renewable energy sources include solar, wind, hydro, and geothermal power. India aims to achieve 500 GW of renewable energy capacity by 2030.' }
  ],
  '2024-10-03': [
    { title: 'Polity: Indian Constitution', content: 'The Constitution of India was adopted on November 26, 1949, and came into effect on January 26, 1950. It is the longest written constitution in the world.' }
  ],
  '2024-10-04': [
    { title: 'Economics: GDP and Growth', content: 'India\'s GDP growth rate has been around 6-7% in recent years. The service sector contributes the largest share to India\'s GDP.' }
  ],
  '2024-10-05': [
    { title: 'Environment: Climate Change', content: 'Climate change poses significant challenges to India including rising sea levels, extreme weather events, and impacts on agriculture and water resources.' }
  ],
  '2024-10-06': [
    { title: 'Biology: Human Body Systems', content: 'The human body has several systems including circulatory, respiratory, digestive, and nervous systems that work together to maintain life.' }
  ],
  '2024-10-07': [
    { title: 'Mathematics: Algebra Basics', content: 'Algebra deals with symbols and the rules for manipulating those symbols. It is essential for solving equations and understanding patterns.' }
  ],
  '2024-10-08': [
    { title: 'Literature: Indian Epics', content: 'The Ramayana and Mahabharata are two major Sanskrit epics of ancient India that contain philosophical and moral teachings.' }
  ],
  '2024-10-09': [
    { title: 'Physics: Laws of Motion', content: 'Newton\'s three laws of motion describe the relationship between the motion of an object and the forces acting on it.' }
  ],
  '2024-10-10': [
    { title: 'Chemistry: Periodic Table', content: 'The periodic table organizes elements by atomic number and groups them by similar chemical properties.' }
  ]
};

// OpenAI instance is created inside the callOpenAI function to avoid top-level execution issues
const GeneralStudies = () => {
  const { language } = useLanguage();
  const [selectedSection, setSelectedSection] = useState('current-affairs');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [currentAffairs, setCurrentAffairs] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [aiSummary, setAiSummary] = useState('');
  const [aiMCQs, setAiMCQs] = useState([]);
  const [aiExplanation, setAiExplanation] = useState('');
  const [explanationTopic, setExplanationTopic] = useState('');
  const [triviaQuestions, setTriviaQuestions] = useState([]);
  const [aiLoading, setAiLoading] = useState(false);
  const [triviaLoading, setTriviaLoading] = useState(false);
  const [aiError, setAiError] = useState(null);
  const [triviaError, setTriviaError] = useState(null);
  const [showAiAnswers, setShowAiAnswers] = useState({});
  const [showTriviaAnswers, setShowTriviaAnswers] = useState({});

  const handleSectionChange = (section) => {
    setSelectedSection(section);
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleQuizOptionClick = (questionIndex, optionIndex) => {
    setQuizAnswers(prev => ({
      ...prev,
      [questionIndex]: optionIndex
    }));
  };

  const fetchCurrentAffairs = useCallback(async (date) => {
    const cacheKey = `${date}-${language}`;
    if (currentAffairs[cacheKey]) return; // Already fetched

    setLoading(true);
    setError(null);

    // Simulate API delay
    setTimeout(() => {
      let articles;

      if (sampleCurrentAffairs[date]) {
        // Use sample data if available for the date
        articles = sampleCurrentAffairs[date].map(item => ({
          title: item.heading,
          content: item.intro + ' ' + item.points.join(' ')
        }));
      } else {
        // Generate dynamic sample data based on date if no sample available
        const dateObj = new Date(date);
        const dayOfMonth = dateObj.getDate();
        const month = dateObj.getMonth() + 1;
        const year = dateObj.getFullYear();

        articles = [
          {
            title: `Global News Update - ${month}/${dayOfMonth}/${year}`,
            content: `Latest developments in international affairs as of ${date}. Key events include diplomatic meetings and economic discussions.`
          },
          {
            title: `Technology Breakthrough - ${month}/${dayOfMonth}/${year}`,
            content: `New innovations in AI and technology announced today. Experts predict significant impact on various industries.`
          },
          {
            title: `Economic Indicators - ${month}/${dayOfMonth}/${year}`,
            content: `Market analysis shows positive trends with GDP growth projections. Trade agreements continue to shape global economy.`
          },
          {
            title: `Environmental Initiatives - ${month}/${dayOfMonth}/${year}`,
            content: `New policies and projects aimed at sustainability and climate change mitigation. International cooperation key to success.`
          },
          {
            title: `Cultural Events - ${month}/${dayOfMonth}/${year}`,
            content: `Festivals and cultural celebrations highlight diverse traditions. Art and music events draw global attention.`
          }
        ];
      }

      setCurrentAffairs(prev => ({
        ...prev,
        [cacheKey]: articles
      }));
      setLoading(false);
    }, 500); // Simulate loading time
  }, [language, currentAffairs]);

  useEffect(() => {
    if (selectedSection === 'current-affairs') {
      fetchCurrentAffairs(selectedDate);
    }
  }, [selectedDate, selectedSection, language, fetchCurrentAffairs]);


  const allQuizQuestions = [
    {
      question: 'What is the capital of India?',
      options: ['Mumbai', 'Delhi', 'Kolkata', 'Chennai'],
      correct: 1
    },
    {
      question: 'Which river is known as the Ganges?',
      options: ['Yamuna', 'Brahmaputra', 'Ganges', 'Indus'],
      correct: 2
    },
    {
      question: 'Who was the first Prime Minister of India?',
      options: ['Sardar Patel', 'Jawaharlal Nehru', 'Mahatma Gandhi', 'Rajguru'],
      correct: 1
    },
    {
      question: 'What is the largest planet in our solar system?',
      options: ['Earth', 'Mars', 'Jupiter', 'Saturn'],
      correct: 2
    },
    {
      question: 'Which element has the chemical symbol O?',
      options: ['Gold', 'Oxygen', 'Silver', 'Iron'],
      correct: 1
    },
    {
      question: 'In which year did India gain independence?',
      options: ['1945', '1947', '1950', '1952'],
      correct: 1
    },
    {
      question: 'What is the currency of India?',
      options: ['Rupee', 'Dollar', 'Euro', 'Yen'],
      correct: 0
    },
    {
      question: 'Which ocean is the largest?',
      options: ['Atlantic', 'Indian', 'Arctic', 'Pacific'],
      correct: 3
    },
    {
      question: 'Who wrote the play "Romeo and Juliet"?',
      options: ['Charles Dickens', 'William Shakespeare', 'Jane Austen', 'Mark Twain'],
      correct: 1
    },
    {
      question: 'What is the square root of 144?',
      options: ['10', '12', '14', '16'],
      correct: 1
    }
  ];

  const getQuizQuestions = () => {
    const dateNum = new Date(selectedDate).getTime();
    const startIndex = (dateNum % allQuizQuestions.length) % (allQuizQuestions.length - 2);
    return allQuizQuestions.slice(startIndex, startIndex + 3);
  };

  const callOpenAI = async (prompt) => {
    // Check if API key is available
    if (!import.meta.env.VITE_OPENAI_API_KEY) {
      console.warn('OpenAI API key not found, falling back to mock responses');
      return getMockResponse(prompt);
    }

    const openai = new OpenAI({
      apiKey: import.meta.env.VITE_OPENAI_API_KEY,
      dangerouslyAllowBrowser: true // Note: For production, use a backend proxy
    });

    try {
      const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 1000,
        temperature: 0.7,
      });

      return completion.choices[0].message.content.trim();
    } catch (error) {
      console.error('OpenAI API error:', error);

      // If quota exceeded or other API errors, fall back to mock responses
      if (error.message.includes('429') || error.message.includes('quota') || error.message.includes('billing')) {
        console.warn('OpenAI quota exceeded, falling back to mock responses');
        return getMockResponse(prompt);
      }

      throw new Error('Failed to get response from OpenAI: ' + error.message);
    }
  };

  const getMockResponse = (prompt) => {
    if (prompt.includes('Summarize')) {
      return 'This is a sample summary of the General Studies content. It covers key topics such as history, geography, and current affairs relevant to India.';
    } else if (prompt.includes('multiple choice questions')) {
      return `Question: What is the capital of India?
A) Mumbai
B) Delhi
C) Kolkata
D) Chennai
Correct: B
---
Question: Which river is known as the Ganges?
A) Yamuna
B) Brahmaputra
C) Ganges
D) Indus
Correct: C
---
Question: Who was the first Prime Minister of India?
A) Sardar Patel
B) Jawaharlal Nehru
C) Mahatma Gandhi
D) Rajguru
Correct: B
---
Question: What is the largest planet in our solar system?
A) Earth
B) Mars
C) Jupiter
D) Saturn
Correct: C
---
Question: Which element has the chemical symbol O?
A) Gold
B) Oxygen
C) Silver
D) Iron
Correct: B`;
    } else if (prompt.includes('detailed explanation')) {
      return 'This is a detailed explanation of the topic. It provides comprehensive information covering definitions, historical context, examples, and key facts related to the subject in General Studies.';
    } else {
      return 'This is a sample response from the AI assistant.';
    }
  };

  const generateSummary = async () => {
    const content = getContent().map(item => `${item.title}: ${item.content}`).join('\n');
    if (!content) return;

    setAiLoading(true);
    setAiError(null);
    setAiMCQs([]);
    setAiExplanation('');
    setTriviaQuestions([]);
    setShowAiAnswers({});
    setShowTriviaAnswers({});
    try {
      const prompt = `Summarize the following General Studies content in a concise manner:\n\n${content}`;
      const summary = await callOpenAI(prompt);
      setAiSummary(summary);
    } catch (err) {
      setAiError(err.message);
    } finally {
      setAiLoading(false);
    }
  };

  const generateMCQs = async () => {
    const content = getContent().map(item => `${item.title}: ${item.content}`).join('\n');
    if (!content) return;

    setAiLoading(true);
    setAiError(null);
    setAiSummary('');
    setAiExplanation('');
    setTriviaQuestions([]);
    setShowAiAnswers({});
    setShowTriviaAnswers({});
    try {
      const prompt = `Generate 5 multiple choice questions based on the following General Studies content. For each question, provide the question, 4 options (A, B, C, D), and indicate the correct answer. Format each question as:\n\nQuestion: [question text]\nA) [option1]\nB) [option2]\nC) [option3]\nD) [option4]\nCorrect: [letter]\n\nSeparate questions with ---`;
      const response = await callOpenAI(prompt);
      const questions = response.split('---').filter(q => q.trim()).map(q => {
        const lines = q.trim().split('\n');
        const question = lines[0].replace('Question: ', '');
        const options = lines.slice(1, 5).map(opt => opt.substring(3));
        const correctLetter = lines[5].replace('Correct: ', '');
        const correctIndex = ['A', 'B', 'C', 'D'].indexOf(correctLetter);
        return { question, options, correct: correctIndex };
      });
      setAiMCQs(questions);
    } catch (err) {
      setAiError('Failed to generate MCQs: ' + err.message);
    } finally {
      setAiLoading(false);
    }
  };

  const generateExplanation = async (topic) => {
    setAiLoading(true);
    setAiError(null);
    setAiSummary('');
    setAiMCQs([]);
    setTriviaQuestions([]);
    setShowAiAnswers({});
    setShowTriviaAnswers({});
    try {
      const prompt = `Provide a detailed explanation of the following topic in General Studies: ${topic}`;
      const explanation = await callOpenAI(prompt);
      setAiExplanation(explanation);
    } catch (err) {
      setAiError(err.message);
    } finally {
      setAiLoading(false);
    }
  };

  const fetchTriviaQuestions = async () => {
    setTriviaLoading(true);
    setTriviaError(null);
    setAiSummary('');
    setAiMCQs([]);
    setAiExplanation('');
    setShowAiAnswers({});
    setShowTriviaAnswers({});
    try {
      const response = await fetch('https://opentdb.com/api.php?amount=10&category=9&type=multiple');
      if (!response.ok) {
        throw new Error('Failed to fetch trivia questions');
      }
      const data = await response.json();
      const questions = data.results.map(q => ({
        question: q.question,
        options: [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5),
        correct: [...q.incorrect_answers, q.correct_answer].indexOf(q.correct_answer),
      }));
      setTriviaQuestions(questions);
    } catch (err) {
      setTriviaError(err.message);
    } finally {
      setTriviaLoading(false);
    }
  };

  const quizQuestions = getQuizQuestions();

  const getContent = () => {
    if (selectedSection === 'current-affairs') {
      const cacheKey = `${selectedDate}-${language}`;
      return currentAffairs[cacheKey] || [{ title: 'No content available for this date', content: 'Loading current affairs...' }];
    } else {
      return sampleDailyTopics[selectedDate] || [{ title: 'No content available for this date', content: 'Please select another date.' }];
    }
  };

  return (
    <div className="general-studies-page">
      {/* Header */}
      <header className="general-studies-header">
        <div className="general-studies-container">
          <h1>General Studies</h1>

          <div className="section-tabs">
            <button
              className={selectedSection === 'current-affairs' ? 'active' : ''}
              onClick={() => handleSectionChange('current-affairs')}
            >
              Current Affairs
            </button>
            <button
              className={selectedSection === 'daily-topic' ? 'active' : ''}
              onClick={() => handleSectionChange('daily-topic')}
            >
              Daily Topic
            </button>
          </div>

          <div className="date-picker">
            <label htmlFor="date-select">Select Date:</label>
            <input
              type="date"
              id="date-select"
              value={selectedDate}
              onChange={handleDateChange}
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="general-studies-container">
        <div className="general-studies-grid">
          {/* Main Article */}
          <main>
            <div className="content-section">
              <h2>{selectedSection === 'current-affairs' ? `Current Affairs for ${selectedDate}` : `Daily Topic for ${selectedDate}`}</h2>
              {loading && selectedSection === 'current-affairs' && (
                <div className="loading">Loading current affairs...</div>
              )}
              {error && selectedSection === 'current-affairs' && (
                <div className="error">{error}</div>
              )}
              {getContent().map((item, index) => (
                <div key={index} className="content-item">
                  <h3>{item.title}</h3>
                  <p>{item.content}</p>
                </div>
              ))}
            </div>
          </main>

          {/* Right Column */}
          <div className="right-column">
            {selectedSection === 'current-affairs' && (
              <aside>
                <div className="ai-sidebar">
                  <h3>AI Tools</h3>
                  <div className="ai-buttons">
                    <button onClick={generateSummary} disabled={aiLoading}>
                      {aiLoading ? 'Generating...' : 'Generate Summary'}
                    </button>
                    <button onClick={generateMCQs} disabled={aiLoading}>
                      {aiLoading ? 'Generating...' : 'Generate MCQs'}
                    </button>
                    <div className="explanation-input">
                      <input
                        type="text"
                        placeholder="Enter topic for explanation"
                        value={explanationTopic}
                        onChange={(e) => setExplanationTopic(e.target.value)}
                      />
                      <button onClick={() => generateExplanation(explanationTopic)} disabled={aiLoading || !explanationTopic}>
                        {aiLoading ? 'Generating...' : 'Generate Explanation'}
                      </button>
                    </div>
                    <button onClick={fetchTriviaQuestions} disabled={triviaLoading}>
                      {triviaLoading ? 'Fetching...' : 'Fetch Trivia Quiz'}
                    </button>
                  </div>
                  {aiError && <div className="error">{aiError}</div>}
                  {triviaError && <div className="error">{triviaError}</div>}
                  {aiSummary && (
                    <div className="ai-result">
                      <h4>AI Summary</h4>
                      <p>{aiSummary}</p>
                    </div>
                  )}
                  {aiMCQs.length > 0 && (
                    <div className="ai-result">
                      <h4>AI Generated MCQs</h4>
                      {aiMCQs.map((q, index) => (
                        <div key={index} className="quiz-question">
                          <h5>{q.question}</h5>
                          <div className="quiz-options">
                            {q.options.map((option, oIndex) => (
                              <button
                                key={oIndex}
                                className={`quiz-option ${
                                  showAiAnswers[index]
                                    ? oIndex === q.correct
                                      ? 'correct'
                                      : ''
                                    : ''
                                }`}
                                onClick={() => setShowAiAnswers(prev => ({ ...prev, [index]: true }))}
                                disabled={showAiAnswers[index]}
                              >
                                {option}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  {aiExplanation && (
                    <div className="ai-result">
                      <h4>AI Explanation</h4>
                      <p>{aiExplanation}</p>
                    </div>
                  )}
                  {triviaQuestions.length > 0 && (
                    <div className="trivia-quiz">
                      <h4>Trivia Quiz</h4>
                      {triviaQuestions.map((q, index) => (
                        <div key={index} className="quiz-question">
                          <h5 dangerouslySetInnerHTML={{ __html: q.question }} />
                          <div className="quiz-options">
                            {q.options.map((option, oIndex) => (
                              <button
                                key={oIndex}
                                className={`quiz-option ${
                                  showTriviaAnswers[index]
                                    ? oIndex === q.correct
                                      ? 'correct'
                                      : ''
                                    : ''
                                }`}
                                onClick={() => setShowTriviaAnswers(prev => ({ ...prev, [index]: true }))}
                                disabled={showTriviaAnswers[index]}
                                dangerouslySetInnerHTML={{ __html: option }}
                              />
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </aside>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralStudies;
