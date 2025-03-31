import { motion } from 'framer-motion';
import { usePlayerContext } from '../context/PlayerContext';
import { FaPlay, FaPause, FaStepForward, FaStepBackward, FaRandom, FaRedo } from 'react-icons/fa';
import styles from './Controls.module.css';

const Controls = () => {
  const { 
    isPlaying, 
    playPause, 
    playNextSong, 
    playPrevSong, 
    isShuffled,
    toggleShuffle,
    repeatMode,
    toggleRepeat
  } = usePlayerContext();

  const buttonVariants = {
    hover: { scale: 1.1 },
    tap: { scale: 0.95 }
  };

  return (
    <div className={styles.controlsContainer}>
      <motion.button 
        className={`${styles.controlButton} ${isShuffled ? styles.active : ''}`}
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        onClick={toggleShuffle}
      >
        <FaRandom />
      </motion.button>
      
      <motion.button 
        className={styles.controlButton}
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        onClick={playPrevSong}
      >
        <FaStepBackward />
      </motion.button>
      
      <motion.button 
        className={`${styles.controlButton} ${styles.playPauseButton}`}
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        onClick={playPause}
      >
        {isPlaying ? <FaPause /> : <FaPlay />}
      </motion.button>
      
      <motion.button 
        className={styles.controlButton}
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        onClick={playNextSong}
      >
        <FaStepForward />
      </motion.button>
      
      <motion.button 
        className={`${styles.controlButton} ${repeatMode !== 'none' ? styles.active : ''}`}
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        onClick={toggleRepeat}
      >
        <FaRedo />
        {repeatMode === 'one' && <span className={styles.repeatOne}>1</span>}
      </motion.button>
    </div>
  );
};

export default Controls;