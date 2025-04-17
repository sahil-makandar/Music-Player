import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaMusic, FaMoon, FaSun, FaPlay, FaPause, FaStepForward, FaStepBackward, FaVolumeUp } from 'react-icons/fa';
import { PlayerProvider, usePlayerContext } from './context/PlayerContext';
import MusicPlayer from './components/MusicPlayer';
import Navigation from './components/Navigation';
import Home from './components/Home';
import Settings from './components/Settings';
import './App.css';

function AppContent() {
  const [darkMode, setDarkMode] = useState(true);
  const [currentPage, setCurrentPage] = useState('home');
  const [showSettings, setShowSettings] = useState(false);
  const { currentSong, isPlaying, playPause, playNextSong, playPrevSong, progress } = usePlayerContext();
  
  useEffect(() => {
    // Apply theme to body element
    document.body.className = darkMode ? 'dark-theme' : 'light-theme';
  }, [darkMode]);
  
  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };
  
  const handleNavigation = (page) => {
    setCurrentPage(page);
    if (page === 'settings') {
      setShowSettings(true);
    } else {
      setShowSettings(false);
    }
  };
  
  const renderContent = () => {
    switch (currentPage) {
      case 'home':
        return <Home darkMode={darkMode} />;
      case 'player':
        return <MusicPlayer darkMode={darkMode} />;
      default:
        return <Home darkMode={darkMode} />;
    }
  };
  
  return (
    <div className={`app-container ${darkMode ? 'dark-theme' : 'light-theme'}`}>
      <div className="background-gradient"></div>
      
      <Navigation 
        darkMode={darkMode} 
        onNavigate={handleNavigation}
        currentPage={currentPage}
      />
      
      <div className="app-content">
        <div className="app-header">
          <div className="app-logo">
            <FaMusic /> Melodify
          </div>
          <div className="app-actions">
            <button 
              className="player-toggle"
              onClick={() => setCurrentPage(currentPage === 'player' ? 'home' : 'player')}
            >
              {currentPage === 'player' ? 'Go to Home' : 'Go to Player'}
            </button>
            <button 
              className="theme-toggle" 
              onClick={toggleTheme}
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? <FaSun /> : <FaMoon />}
            </button>
          </div>
        </div>
        
        <div className="main-content-area">
          {renderContent()}
        </div>
        
        {currentSong && (
          <div className="mini-player-bar">
            <div className="mini-player">
              <div className="mini-player-left">
                <div className="mini-player-cover">
                  <img src={currentSong.coverUrl} alt={currentSong.title} />
                </div>
                <div className="mini-player-info">
                  <h3>{currentSong.title}</h3>
                  <p>{currentSong.artist}</p>
                </div>
              </div>
              
              <div className="mini-player-progress">
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${progress}%` }}></div>
                </div>
              </div>
              
              <div className="mini-player-controls">
                <button onClick={playPrevSong}>
                  <FaStepBackward />
                </button>
                <button className="play-pause-btn" onClick={playPause}>
                  {isPlaying ? <FaPause /> : <FaPlay />}
                </button>
                <button onClick={playNextSong}>
                  <FaStepForward />
                </button>
                <button>
                  <FaVolumeUp />
                </button>
              </div>
            </div>
          </div>
        )}
        
        {showSettings && (
          <Settings darkMode={darkMode} onClose={() => setShowSettings(false)} />
        )}
      </div>
    </div>
  );
}

function App() {
  return (
    <PlayerProvider>
      <AppContent />
    </PlayerProvider>
  );
}

export default App;