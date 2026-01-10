import { Routes, Route } from 'react-router-dom'

import Navbar from './Navbar'
import LandingHeader from './LandingHeader'
import MainGrid from './MainGrid'
import LowerGrid from './LowerGrid'
import Feedback from './Feedback'
import Footer from './Footer'

import About from './About'
import About2 from './About2'
import Vision from './Vision'
import Mission from './Mission'
import Values from './Values'
import WhySiksha from './WhySiksha'

import '../css/App.css'

import Contact from './Contact'
import ExploreServices from './ExploreServices'
import CurrentAffairs from './CurrentAffairs'
import Upcoming from './Upcoming'
import Courses from './Courses'
import TermsCondition from './TermsCondition'

import Login from '../auth/Login'
import Signup from '../auth/Signup'

import Insight from './Insight'
import Training from './Training'
import GeneralStudies from './GeneralStudies'
import Faq from './Faq'
import Counselling from './Counselling'

import Placements from './Placements'   // ✅ ADDED

import ThreadListPage from '../forum/ThreadListPage'
import ThreadDetailPage from '../forum/ThreadDetailPage'

function App() {
  return (
    <div className="app">
      <Routes>

        {/* ===== FORUM ===== */}
        <Route
          path="/forum"
          element={
            <div className="page-content">
              <Navbar />
              <ThreadListPage />
              <Footer />
            </div>
          }
        />

        <Route
          path="/forum/:threadId"
          element={
            <div className="page-content">
              <Navbar />
              <ThreadDetailPage />
              <Footer />
            </div>
          }
        />

        {/* ===== HOME ===== */}
        <Route
          path="/"
          element={
            <div className="page-content overflow-x-hidden">
              <Navbar />
              <div className="home-scale-wrapper mx-auto max-w-[1400px]">
                <LandingHeader />
                <MainGrid />
                <LowerGrid />
                <ExploreServices />
                <Feedback />
              </div>
              <Footer />
            </div>
          }
        />

        {/* ===== STATIC PAGES ===== */}
        <Route
          path="/about"
          element={
            <div className="page-content">
              <Navbar />
              <About2 />
              <About />
              <Footer />
            </div>
          }
        />

        <Route
          path="/vision"
          element={
            <div className="page-content">
              <Navbar />
              <Vision />
              <Footer />
            </div>
          }
        />

        <Route
          path="/mission"
          element={
            <div className="page-content">
              <Navbar />
              <Mission />
              <Footer />
            </div>
          }
        />

        <Route
          path="/values"
          element={
            <div className="page-content">
              <Navbar />
              <Values />
              <Footer />
            </div>
          }
        />

        <Route
          path="/why-shiksha"
          element={
            <div className="page-content">
              <Navbar />
              <WhySiksha />
              <Footer />
            </div>
          }
        />

        <Route
          path="/contact"
          element={
            <div className="page-content">
              <Navbar />
              <Contact />
              <Footer />
            </div>
          }
        />

        {/* ===== AUTH ===== */}
        <Route
          path="/login"
          element={
            <div className="page-content">
              <Navbar />
              <Login />
              <Footer />
            </div>
          }
        />

        <Route
          path="/signup"
          element={
            <div className="page-content">
              <Navbar />
              <Signup />
              <Footer />
            </div>
          }
        />

        {/* ===== CONTENT ===== */}
        <Route
          path="/current-affairs"
          element={
            <div className="page-content">
              <Navbar />
              <CurrentAffairs />
              <Footer />
            </div>
          }
        />

        <Route
          path="/courses"
          element={
            <div className="page-content">
              <Navbar />
              <Courses />
              <Footer />
            </div>
          }
        />

        {/* ✅ PLACEMENTS (ADDED) */}
        <Route
          path="/placements"
          element={
            <div className="page-content">
              <Navbar />
              <Placements />
              <Footer />
            </div>
          }
        />

        <Route path="/upcoming" element={<Upcoming />} />

        <Route
          path="/terms"
          element={
            <div className="page-content">
              <Navbar />
              <TermsCondition />
              <Footer />
            </div>
          }
        />

        <Route
          path="/faq"
          element={
            <div className="page-content">
              <Navbar />
              <Faq />
              <Footer />
            </div>
          }
        />

        <Route
          path="/insight"
          element={
            <div className="page-content">
              <Navbar />
              <Insight />
              <Footer />
            </div>
          }
        />

        <Route path="/training" element={<Training />} />

        <Route
          path="/general-studies"
          element={
            <div className="page-content">
              <Navbar />
              <GeneralStudies />
              <Footer />
            </div>
          }
        />

        <Route
          path="/counselling"
          element={
            <div className="page-content">
              <Navbar />
              <Counselling />
              <Footer />
            </div>
          }
        />

      </Routes>
    </div>
  )
}

export default App
