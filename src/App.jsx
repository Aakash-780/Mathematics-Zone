import { useRef, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Quizzes from './components/Quizzes';
import YoutubeChannel from './components/YoutubeChannel';
import InstagramFeed from './components/InstagramFeed';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import MathParticles from './components/MathParticles';
import About from './components/About';
import Preloader from './components/Preloader';
import Courses from './components/Courses';
import Achievements from './components/Achievements';
import Contact from './components/Contact';

gsap.registerPlugin(ScrollTrigger);

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const [loading, setLoading] = useState(() => {
    // Skip preloader on mobile devices (width <= 768px)
    return typeof window !== 'undefined' ? window.innerWidth > 768 : true;
  });
  const appRef = useRef(null);

  useEffect(() => {
    if (!loading) {
      // Reveal animation for the whole app once loading is done
      gsap.fromTo(appRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.2, ease: 'power3.out' }
      );
    }
  }, [loading]);

  return (
    <>
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      <Router>
        <ScrollToTop />
        <div className="app-container" ref={appRef} style={{ position: 'relative', zIndex: 1, opacity: loading ? 0 : 1 }}>
          <CustomCursor />
          <MathParticles />
          <Navbar />
          <main style={{ position: 'relative', zIndex: 2 }}>
            <Routes>
              <Route path="/" element={
                <>
                  <Hero />
                  <Achievements />
                  <YoutubeChannel />
                  <InstagramFeed />
                </>
              } />
              <Route path="/quizzes" element={<Quizzes />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </>
  );
}

export default App;
