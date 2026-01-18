
import MusicPlayer from './components/MusicPlayer';

function App() {
  // Keyboard shortcuts are always visible
  const showHints = true;


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
          href="https://linktr.ee/codewithtusharbhardwaj" 
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
