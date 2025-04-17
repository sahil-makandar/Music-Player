import { motion } from 'framer-motion';
import { 
  FaPlay, FaPause, FaStepForward, FaStepBackward, 
  FaRandom, FaRedo, FaVolumeUp, FaVolumeMute, FaCog
} from 'react-icons/fa';
import { useState } from 'react';
import { usePlayerContext } from '../context/PlayerContext';
import styles from './Controls.module.css';

const Controls = () => {
  const { 
    isPlaying, 
    playPause, 
    playNextSong, 
    playPrevSong, 
    isShuffleOn,
    toggleShuffle,
    isRepeatOn,
    toggleRepeat,
    volume,
    adjustVolume
  } = usePlayerContext();
  
  const [showSettings, setShowSettings] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [prevVolume, setPrevVolume] = useState(volume);
  
  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    adjustVolume(newVolume);
    if (newVolume === 0) {
      setIsMuted(true);
    } else {
      setIsMuted(false);
    }
  };
  
  const toggleMute = () => {
    if (isMuted) {
      adjustVolume(prevVolume);
      setIsMuted(false);
    } else {
      setPrevVolume(volume);
      adjustVolume(0);
      setIsMuted(true);
    }
  };
  
  return (
    <div className={styles.controlsContainer}>
      <div className={styles.mainControls}>
        <motion.button 
          className={`${styles.controlButton} ${isShuffleOn ? styles.active : ''}`}
          onClick={toggleShuffle}
          aria-label="Toggle shuffle"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaRandom />
        </motion.button>
        
        <motion.button 
          className={styles.controlButton}
          onClick={playPrevSong}
          aria-label="Previous song"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaStepBackward />
        </motion.button>
        
        <motion.button 
          className={styles.playButton}
          onClick={playPause}
          aria-label={isPlaying ? "Pause" : "Play"}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isPlaying ? <FaPause /> : <FaPlay />}
        </motion.button>
        
        <motion.button 
          className={styles.controlButton}
          onClick={playNextSong}
          aria-label="Next song"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaStepForward />
        </motion.button>
        
        <motion.button 
          className={`${styles.controlButton} ${isRepeatOn ? styles.active : ''}`}
          onClick={toggleRepeat}
          aria-label="Toggle repeat"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaRedo />
        </motion.button>
      </div>
      
      <div className={styles.volumeControls}>
        <motion.button 
          className={styles.volumeButton}
          onClick={toggleMute}
          aria-label={isMuted ? "Unmute" : "Mute"}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {isMuted || volume === 0 ? <FaVolumeMute /> : <FaVolumeUp />}
        </motion.button>
        
        <input 
          type="range" 
          min="0" 
          max="1" 
          step="0.01" 
          value={volume}
          onChange={handleVolumeChange}
          className={styles.volumeSlider}
          aria-label="Volume"
        />
        
        <motion.button 
          className={styles.settingsButton}
          onClick={() => setShowSettings(!showSettings)}
          aria-label="Settings"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaCog />
        </motion.button>
      </div>
    </div>
  );
};

export default Controls;