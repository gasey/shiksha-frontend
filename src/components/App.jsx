import { Routes, Route } from 'react-router-dom';

import Dashboard from './Dashboard';
import ProtectedRoute from '../routes/ProtectedRoute';
import HomePage from './HomePage';

import Navbar from './Navbar';
import LandingHeader from './LandingHeader';
import MainGrid from './MainGrid';
import LowerGrid from './LowerGrid';
import Feedback from './Feedback';
import Footer from './Footer';

import About from './About';
import About2 from './About2';
import Vision from './Vision';
import Mission from './Mission';
import Values from './Values';
import WhySiksha from './WhySiksha';

import '../css/App.css';

import Contact from './Contact';
import ExploreServices from './ExploreServices';
import CurrentAffairs from './CurrentAffairs';
import Upcoming from './Upcoming';
import Courses from './Courses';
import TermsCondition from './TermsCondition';

import Login from '../auth/Login';
import Signup from '../auth/Signup';

import Insight from './Insight';
import Training from './Training';
import GeneralStudies from './GeneralStudies';
import Faq from './Faq';
import Counselling from './Counselling';

import Placements from './Placements';
import Payment from "./Payment";

import ThreadListPage from '../forum/ThreadListPage';
import ThreadDetailPage from '../forum/ThreadDetailPage';
import CreateThreadPage from '../forum/CreateThreadPage';
import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

function Page({ children }) {
  return (
    <div className="page-content">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}

function App() {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) return null; // or spinner
  return (
    <div className="app">
      <Routes>

        {/* ===== HOME ===== */}
       {/* ===== ROOT DOMAIN CONTROL ===== */}
<Route path="/" element={<HomePage />} />

        {/* ===== DASHBOARD (PROTECTED) ===== */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Page>
                <Dashboard />
              </Page>
            </ProtectedRoute>
          }
        />

        {/* ===== AUTH ===== */}
        <Route path="/login" element={<Page><Login /></Page>} />
        <Route path="/signup" element={<Page><Signup /></Page>} />

        {/* ===== STATIC ===== */}
        <Route path="/about" element={<Page><About2 /><About /></Page>} />
        <Route path="/vision" element={<Page><Vision /></Page>} />
        <Route path="/mission" element={<Page><Mission /></Page>} />
        <Route path="/values" element={<Page><Values /></Page>} />
        <Route path="/why-shiksha" element={<Page><WhySiksha /></Page>} />
        <Route path="/contact" element={<Page><Contact /></Page>} />
        <Route path="/terms" element={<Page><TermsCondition /></Page>} />
        <Route path="/faq" element={<Page><Faq /></Page>} />
        <Route path="/feedback" element={<Page><Feedback /></Page>} />

        {/* ===== CONTENT ===== */}
        <Route path="/courses" element={<Page><Courses /></Page>} />
        <Route path="/placements" element={<Page><Placements /></Page>} />
        <Route path="/general-studies" element={<Page><GeneralStudies /></Page>} />
        <Route path="/counselling" element={<Page><Counselling /></Page>} />
        <Route path="/insight" element={<Page><Insight /></Page>} />
        <Route path="/current-affairs" element={<Page><CurrentAffairs /></Page>} />

        <Route path="/training" element={<Training />} />
        <Route path="/upcoming" element={<Upcoming />} />
        <Route path="/payment" element={<Page><Payment /></Page>} />

        {/* ===== FORUM ===== */}
        <Route path="/forum" element={<Page><ThreadListPage /></Page>} />
        <Route path="/forum/create" element={<Page><CreateThreadPage /></Page>} />
        <Route path="/forum/:threadId" element={<Page><ThreadDetailPage /></Page>} />

      </Routes>
    </div>
  );
}

export default App;
