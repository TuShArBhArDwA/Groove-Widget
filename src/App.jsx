import { useState, useEffect } from 'react';
import MusicPlayer from './components/MusicPlayer';

function App() {
  const [showHints, setShowHints] = useState(false);

  // Show keyboard hints on first hover
  useEffect(() => {
    const handleMouseMove = () => {
      setShowHints(true);
      // Hide after a few seconds
      setTimeout(() => setShowHints(false), 5000);
    };
    
    window.addEventListener('mousemove', handleMouseMove, { once: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Show hints on any key press
  useEffect(() => {
    const handleKeyDown = () => {
      setShowHints(true);
      setTimeout(() => setShowHints(false), 3000);
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      {/* Background animation */}
      <div className="app-bg" aria-hidden="true" />
      
      {/* Page header */}
      <header className="page-header">
        <h1 className="page-title">Groove Widget</h1>
        <p className="page-subtitle">A reimagined music player experience</p>
      </header>

      {/* Main content */}
      <main>
        <MusicPlayer />
      </main>

      {/* Keyboard shortcuts hints */}
      <div className={`keyboard-hints ${showHints ? 'visible' : ''}`}>
        <div className="keyboard-hint">
          <span className="keyboard-key">Space</span>
          <span>Play/Pause</span>
        </div>
        <div className="keyboard-hint">
          <span className="keyboard-key">←</span>
          <span className="keyboard-key">→</span>
          <span>Seek</span>
        </div>
        <div className="keyboard-hint">
          <span className="keyboard-key">L</span>
          <span>Lyrics</span>
        </div>
        <div className="keyboard-hint">
          <span className="keyboard-key">Q</span>
          <span>Queue</span>
        </div>
        <div className="keyboard-hint">
          <span className="keyboard-key">M</span>
          <span>Mute</span>
        </div>
      </div>

      {/* Footer */}
      <footer className="app-footer">
        made with 💙 by{' '}
        <a 
          href="https://www.linkedin.com/in/bhardwajtushar2004/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="footer-link"
        >
          Tushar Bhardwaj
        </a>
      </footer>
    </>
  );
}

export default App;
