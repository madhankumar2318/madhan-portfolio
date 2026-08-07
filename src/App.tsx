import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Experience } from './components/Experience';
import { Education } from './components/Education';
import { Certifications } from './components/Certifications';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';
import { GeometryBackground } from './components/GeometryBackground';

export function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className="app-root" style={{ position: 'relative' }}>

      {/* Global 3D Floating Glass Geometry — fixed behind the entire site */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      >
        <GeometryBackground />
      </div>

      {/* All content sits above the fixed canvas */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Navbar
          theme={theme}
          toggleTheme={toggleTheme}
          onOpenResume={() => setIsResumeOpen(true)}
        />

        <main>
          <Hero onOpenResume={() => setIsResumeOpen(true)} />
          <Projects />
          <Skills />
          <Experience />
          <Education />
          <Certifications />
          <Contact />
        </main>

        <Footer />

        <ResumeModal
          isOpen={isResumeOpen}
          onClose={() => setIsResumeOpen(false)}
        />
      </div>
    </div>
  );
}

export default App;
