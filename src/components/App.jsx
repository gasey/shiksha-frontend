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
import Login from '../auth/Login'
import Signup from '../auth/Signup'
import Courses from './Courses'
import TermsCondition from './TermsCondition'
import Insight from './Insight'

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={
          <div className="page-content">
            <Navbar />
            <LandingHeader />
            <MainGrid />
            <LowerGrid />
            <ExploreServices />
            <Feedback/>
            <Footer />
          </div>
        } />
        <Route path="/about" element={
          <div className="page-content">
            <Navbar />
            <About2 />
            <About />
            <Footer />
          </div>
        } />
        <Route path="/vision" element={
          <div className="page-content">
            <Navbar />
            <Vision />
            <Footer />
          </div>
        } />
        <Route path="/mission" element={
          <div className="page-content">
            <Navbar />
            <Mission />
            <Footer />
          </div>
        } />
        <Route path="/values" element={
          <div className="page-content">
            <Navbar />
            <Values />
            <Footer />
          </div>
        } />
        <Route path="/why-shiksha" element={
          <div className="page-content">
            <Navbar />
            <WhySiksha />
            <Footer />
          </div>
        } />
        <Route path="/contact" element={
          <div className="page-content">
            <Navbar />
            <Contact />
            <Footer />
          </div>
        } />

        <Route path="/login" element={
          <div className="page-content">
            <Navbar />
            <Login />
            <Footer />
          </div>
        } />
        <Route path="/signup" element={
          <div className="page-content">
            <Navbar />
            <Signup />
            <Footer />
          </div>
        } />
        <Route path="/current-affairs" element={
          <div className="page-content">
            <Navbar />
            <CurrentAffairs />
            <Footer />
          </div>
        } />
        <Route path="/current-affairs" element={
          <div className="page-content">
            <Navbar />
            <CurrentAffairs />
            <Footer />
          </div>
        } />
        
        <Route path="/courses" element={
    <div className="page-content">
      <Navbar />
      <Courses />
      <Footer />
    </div>
  } />

      <Route path="/upcoming" element={<Upcoming />} />

      <Route path="/terms" element={
          <div className="page-content">
            <Navbar />
            <TermsCondition />
            <Footer />
          </div>
        } />

      <Route path="/insight" element={
          <div className="page-content">
            <Navbar />
            <Insight />
            <Footer />
          </div>
        } />

      </Routes>
    </div>
  )
}

export default App
