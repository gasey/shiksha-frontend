import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../css/LandingHeader.css';

const searchableRoutes = {
  home: '/',
  homepage: '/',
  main: '/',

  about: '/about',
  vision: '/vision',
  mission: '/mission',
  values: '/values',
  'why shiksha': '/why-shiksha',
  'why-shiksha': '/why-shiksha',

  contact: '/contact',
  terms: '/terms',
  faq: '/faq',
  feedback: '/feedback',

  course: '/courses',
  courses: '/courses',

  placement: '/placements',
  placements: '/placements',

  'general studies': '/general-studies',
  'general-studies': '/general-studies',
  gs: '/general-studies',

  counselling: '/counselling',
  counseling: '/counselling',

  insight: '/insight',
  'current affairs': '/current-affairs',
  'current-affairs': '/current-affairs',

  training: '/training',
  upcoming: '/upcoming',
  payment: '/payment',

  forum: '/forum',
  discussion: '/forum',
  thread: '/forum',

  login: '/login',
  signup: '/signup',
  register: '/signup',

  dashboard: '/dashboard',
};

const LandingHeader = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();

    const value = searchTerm.trim().toLowerCase();

    if (!value) return;

    const exactMatch = searchableRoutes[value];

    if (exactMatch) {
      navigate(exactMatch);
      setSearchTerm('');
      return;
    }

    const matchedKey = Object.keys(searchableRoutes).find(
      (key) => key.includes(value) || value.includes(key)
    );

    navigate(matchedKey ? searchableRoutes[matchedKey] : '/');
    setSearchTerm('');
  };

  return (
    <div className="landing-header">
      <form className="search-section" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search courses, teachers, topics..."
          className="search-bar"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>

      <Link to="/courses" className="demo-btn">demo</Link>
    </div>
  );
};

export default LandingHeader;