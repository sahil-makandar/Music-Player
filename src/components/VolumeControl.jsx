import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaVolumeUp, FaVolumeDown, FaVolumeMute } from 'react-icons/fa';
import { usePlayerContext } from '../context/PlayerContext';
import styles from './VolumeControl.module.css';

const VolumeControl = () => {
  const { volume, changeVolume } = usePlayerContext();
  const [prevVolume, setPrevVolume] = useState(volume);
  
  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    changeVolume(newVolume);
  };
  
  const toggleMute = () => {
    if (volume > 0) {
      setPrevVolume(volume);
      changeVolume(0);
    } else {
      changeVolume(prevVolume);
    }
  };
  
  const getVolumeIcon = () => {
    if (volume === 0) return <FaVolumeMute />;
    if (volume < 0.5) return <FaVolumeDown />;
    return <FaVolumeUp />;
  };
  
  return (
    <div className={styles.volumeContainer}>
      <motion.button 
        className={styles.volumeButton}
        onClick={toggleMute}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {getVolumeIcon()}
      </motion.button>
      
      <div className={styles.volumeSliderContainer}>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className={styles.volumeSlider}
        />
        <div 
          className={styles.volumeFill}
          style={{ width: `${volume * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

export default VolumeControl;