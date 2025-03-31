import { motion, AnimatePresence } from 'framer-motion';
import { usePlayerContext } from '../context/PlayerContext';
import styles from './Playlist.module.css';

const Playlist = () => {
  const { queue, currentSong, playSong, isPlaying } = usePlayerContext();
  
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  return (
    <div className={styles.playlistContainer}>
      <h2 className={styles.playlistTitle}>Queue</h2>
      
      <div className={styles.songsList}>
        <AnimatePresence>
          {queue.map((song) => (
            <motion.div 
              key={song.id}
              className={`${styles.songItem} ${currentSong.id === song.id ? styles.activeSong : ''}`}
              onClick={() => playSong(song.id)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              whileHover={{ scale: 1.02, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
              transition={{ duration: 0.2 }}
            >
              <div className={styles.songItemLeft}>
                <div className={styles.songThumbnail}>
                  <img src={song.coverUrl} alt={song.title} />
                  {currentSong.id === song.id && isPlaying && (
                    <div className={styles.playingIndicator}>
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  )}
                </div>
                <div className={styles.songDetails}>
                  <h3 className={styles.songTitle}>{song.title}</h3>
                  <p className={styles.songArtist}>{song.artist}</p>
                </div>
              </div>
              <div className={styles.songDuration}>
                {formatTime(song.duration)}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Playlist;