import { useRef, useEffect } from 'react';
import { usePlayerContext } from '../context/PlayerContext';
import styles from './Visualizer.module.css';

const Visualizer = () => {
  const { isPlaying } = usePlayerContext();
  
  return (
    <div className={styles.visualizerContainer}>
      <div className={styles.bouncingBars}>
        {Array.from({ length: 40 }).map((_, index) => (
          <div 
            key={index} 
            className={`${styles.bar} ${isPlaying ? styles.playing : ''}`}
            style={{ 
              animationDelay: `${index * 0.05}s`,
              left: `${index * 2.5}%`,
              height: `${20 + Math.random() * 60}px`
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Visualizer;