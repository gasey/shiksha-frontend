import Hero from "./Hero";
import About from "./About";
import Stats from "./Stats";
import HowItWorks from "./HowItWorks";
import Navbar from './Navbar';
import LandingHeader from './LandingHeader';
import MainGrid from './MainGrid';
import LowerGrid from './LowerGrid';
import CoursePreview from './CoursePreview';
import Footer from './Footer';
import AboutShiksha from "./AboutShiksha";
import VideoShowcase from "./VideoShowcase";
import LearningPathways from "./LearningPathways";
import TeachersSlider from "../components/TeachersSlider";

const HomePage = () => {
  return (
    <div className="page-content">
      <Navbar />
   

      {/*NEW LANDING SECTIONS */}
      <Hero />
      <About />
      <Stats />
       <AboutShiksha />
      <HowItWorks />
      {/* EXISTING CONTENT */}
      <LearningPathways />
      <CoursePreview />
      <TeachersSlider />
      <Footer />
      
    </div>
  );
};

export default HomePage;
