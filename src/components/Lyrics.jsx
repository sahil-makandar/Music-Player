import { useState, useEffect } from 'react';
import { usePlayerContext } from '../context/PlayerContext';
import styles from './Lyrics.module.css';

const Lyrics = () => {
  const { currentSong } = usePlayerContext();
  const [lyrics, setLyrics] = useState([]);
  
  useEffect(() => {
    // Simulate fetching lyrics
    if (currentSong) {
      // For demo purposes, generate some dummy lyrics
      const dummyLyrics = Array(20).fill(null).map((_, i) => 
        `Line ${i+1}: ${currentSong.title} lyrics would appear here...`
      );
      setLyrics(dummyLyrics);
    }
  }, [currentSong]);
  
  if (!currentSong) {
    return <div className={styles.lyricsContainer}>No song selected</div>;
  }
  
  return (
    <div className={styles.lyricsContainer}>
      <h3 className={styles.lyricsTitle}>{currentSong.title} - Lyrics</h3>
      <div className={styles.lyricsContent}>
        {lyrics.length > 0 ? (
          lyrics.map((line, index) => (
            <p key={index} className={styles.lyricsLine}>{line}</p>
          ))
        ) : (
          <p className={styles.noLyrics}>Lyrics not available for this song.</p>
        )}
      </div>
    </div>
  );
};

export default Lyrics;