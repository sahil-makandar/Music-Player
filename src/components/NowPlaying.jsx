import { motion } from 'framer-motion';
import { usePlayerContext } from '../context/PlayerContext';
import styles from './NowPlaying.module.css';

const NowPlaying = () => {
  const { currentSong } = usePlayerContext();

  return (
    <div className={styles.nowPlayingContainer}>
      <motion.div 
        className={styles.albumCover}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.05 }}
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={0.1}
      >
        <img 
          src={currentSong.coverUrl} 
          alt={`${currentSong.album} cover`} 
        />
      </motion.div>
      
      <motion.div 
        className={styles.songInfo}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        <h2 className={styles.songTitle}>{currentSong.title}</h2>
        <h3 className={styles.artistName}>{currentSong.artist}</h3>
        <p className={styles.albumName}>{currentSong.album}</p>
      </motion.div>
    </div>
  );
};

export default NowPlaying;