import { useEffect } from "react"; // NEW
import { Routes, Route, Navigate } from 'react-router-dom'; // UPDATED

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
import VerifyEmail from '../auth/VerifyEmail';
import EmailVerified from '../auth/EmailVerified';

import Insight from './Insight';
import Training from './Training';
import GeneralStudies from './GeneralStudies';
import Faq from './Faq';
import Counselling from './Counselling';

import Placements from './Placements';
import Payment from "./Payment";
import FormFillup from './FormFillup';

import RequireProfileComplete from '../routes/RequireProfileComplete';

import ThreadListPage from '../forum/ThreadListPage';
import ThreadDetailPage from '../forum/ThreadDetailPage';
import CreateThreadPage from '../forum/CreateThreadPage';
import NotificationsPage from '../forum/NotificationsPage';
import { useAuth } from "../contexts/AuthContext";

function Page({ children }) {
  return (
    <div className="page-content">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}

// NEW: app domain root ko control karega
function AppEntry({ isAuthenticated }) {
  const host = window.location.hostname;
  const isAppDomain = host === "app.shikshacom.com";

  useEffect(() => {
    if (isAppDomain && !isAuthenticated) {
      window.location.href = "https://www.shikshacom.com/login";
    }
  }, [isAppDomain, isAuthenticated]);

  if (isAppDomain) {
    if (!isAuthenticated) return null;
    return <Navigate to="/dashboard" replace />;
  }

  return <HomePage />;
}

function App() {
  const { isAuthenticated, loading } = useAuth(); // UPDATED: user removed because not used

  if (loading) return null; // KEEP AS IT IS

  return (
    <div className="app">
      <Routes>

        {/* UPDATED: direct app.shikshacom.com open hone par auth check */}
        <Route path="/" element={<AppEntry isAuthenticated={isAuthenticated} />} />

        {/* ===== DASHBOARD (PROTECTED) ===== */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <RequireProfileComplete>
                <Page>
                  <Dashboard />
                </Page>
              </RequireProfileComplete>
            </ProtectedRoute>
          }
        />

        {/* ===== FORM FILLUP (PROTECTED) ===== */}
        <Route
          path="/form-fillup"
          element={
            <ProtectedRoute>
              <Page>
                <FormFillup />
              </Page>
            </ProtectedRoute>
          }
        />

        {/* ===== AUTH ===== */}
        <Route path="/login" element={<Page><Login /></Page>} />
        <Route path="/signup" element={<Page><Signup /></Page>} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/email-verified" element={<EmailVerified />} />

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
        <Route path="/forum/notifications" element={<Page><NotificationsPage /></Page>} />
        <Route path="/forum/:threadId" element={<Page><ThreadDetailPage /></Page>} />

      </Routes>
    </div>
  );
}

export default App;