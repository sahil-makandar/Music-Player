import { motion } from 'framer-motion';
import { usePlayerContext } from '../context/PlayerContext';
import styles from './NowPlaying.module.css';

const NowPlaying = () => {
  const { currentSong, isPlaying } = usePlayerContext();
  
  if (!currentSong) return null;
  
  return (
    <div className={styles.nowPlayingContainer}>
      <motion.div 
        className={styles.albumCover}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ 
          scale: 1, 
          opacity: 1,
          rotate: isPlaying ? 360 : 0 
        }}
        transition={{ 
          duration: isPlaying ? 20 : 0.5,
          rotate: {
            repeat: Infinity,
            ease: "linear",
            duration: 20
          },
          opacity: { duration: 0.5 },
          scale: { duration: 0.5 }
        }}
      >
        <img src={currentSong.coverUrl} alt={currentSong.title} />
        <div className={styles.vinylEffect}></div>
        
        <div className={styles.playingIndicator}>
          {isPlaying && (
            <>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </>
          )}
        </div>
      </motion.div>
      
      <div className={styles.songDetails}>
        <h2 className={styles.songTitle}>{currentSong.title}</h2>
        <p className={styles.songArtist}>{currentSong.artist}</p>
        <p className={styles.songAlbum}>{currentSong.album}</p>
      </div>
    </div>
  );
};

export default NowPlaying;