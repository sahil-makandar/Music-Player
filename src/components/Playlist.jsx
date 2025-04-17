import { motion, AnimatePresence } from 'framer-motion';
import { FaPlay, FaPause, FaHeart, FaRegHeart } from 'react-icons/fa';
import { usePlayerContext } from '../context/PlayerContext';
import styles from './Playlist.module.css';

const Playlist = () => {
  const { queue, currentSong, playSong, isPlaying, toggleFavorite } = usePlayerContext();
  
  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  return (
    <div className={styles.playlistContainer}>
      <h2 className={styles.playlistTitle}>Queue ({queue.length})</h2>
      
      <div className={styles.playlistItems}>
        <AnimatePresence>
          {queue.map((song, index) => (
            <motion.div 
              key={song.id}
              className={`${styles.playlistItem} ${currentSong && currentSong.id === song.id ? styles.active : ''}`}
              onClick={() => playSong(song.id)}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
              whileHover={{ scale: 1.02, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
            >
              <div className={styles.songIndex}>
                {currentSong && currentSong.id === song.id ? (
                  <div className={styles.playingIcon}>
                    {isPlaying ? (
                      <div className={styles.soundBars}>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    ) : (
                      <FaPause />
                    )}
                  </div>
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
              
              <div className={styles.songCover}>
                <img src={song.coverUrl} alt={song.title} />
                {currentSong && currentSong.id === song.id && isPlaying && (
                  <div className={styles.playingOverlay}>
                    <div className={styles.pulse}></div>
                  </div>
                )}
              </div>
              
              <div className={styles.songInfo}>
                <h3 className={styles.songTitle}>{song.title}</h3>
                <p className={styles.songArtist}>{song.artist}</p>
              </div>
              
              <div className={styles.songActions}>
                <button 
                  className={styles.favoriteBtn}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(song.id);
                  }}
                >
                  {song.isFavorite ? <FaHeart /> : <FaRegHeart />}
                </button>
                <span className={styles.songDuration}>{formatTime(song.duration)}</span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Playlist;