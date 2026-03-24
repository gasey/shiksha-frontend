import Navbar from './Navbar';
import LandingHeader from './LandingHeader';
import MainGrid from './MainGrid';
import LowerGrid from './LowerGrid';
import CoursePreview from './CoursePreview';
import Footer from './Footer';

const HomePage = () => {
  return (
    <div className="page-content">
      <Navbar />
      <LandingHeader />
      <MainGrid />
      <LowerGrid />
      <CoursePreview />
      <Footer />
    </div>
  );
};

export default HomePage;
