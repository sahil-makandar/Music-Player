import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaHeart, FaRegHeart, FaEllipsisH } from 'react-icons/fa';
import { usePlayerContext } from '../context/PlayerContext';
import NowPlaying from './NowPlaying';
import ProgressBar from './ProgressBar';
import Controls from './Controls';
import Playlist from './Playlist';
import Lyrics from './Lyrics';
import Visualizer from './Visualizer';
import styles from './MusicPlayer.module.css';

const MusicPlayer = ({ darkMode }) => {
  const { currentSong, toggleFavorite } = usePlayerContext();
  const [activeTab, setActiveTab] = useState('queue');
  
  if (!currentSong) {
    return (
      <div className={styles.musicPlayerContainer}>
        <div className={styles.noSongMessage}>
          <h2>No song selected</h2>
          <p>Select a song from your library to start playing</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className={styles.musicPlayerContainer}>
      <div className={styles.playerHeader}>
        <div className={styles.songInfo}>
          <h3>{currentSong.title}</h3>
          <p>{currentSong.artist}</p>
        </div>
        <div className={styles.headerActions}>
          <button 
            className={styles.favoriteBtn}
            onClick={() => toggleFavorite(currentSong.id)}
            aria-label={currentSong.isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            {currentSong.isFavorite ? <FaHeart /> : <FaRegHeart />}
          </button>
          <button 
            className={styles.moreBtn}
            aria-label="More options"
          >
            <FaEllipsisH />
          </button>
        </div>
      </div>
      
      <div className={styles.playerContent}>
        <div className={styles.mainSection}>
          <NowPlaying />
          
          <div className={styles.controlsSection}>
            <Visualizer />
            <ProgressBar />
            <Controls />
          </div>
        </div>
        
        <div className={styles.sideSection}>
          <div className={styles.tabButtons}>
            <button 
              className={`${styles.tabButton} ${activeTab === 'queue' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('queue')}
            >
              Queue
            </button>
            <button 
              className={`${styles.tabButton} ${activeTab === 'lyrics' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('lyrics')}
            >
              Lyrics
            </button>
          </div>
          
          <div className={styles.tabContent}>
            {activeTab === 'queue' ? <Playlist /> : <Lyrics />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;