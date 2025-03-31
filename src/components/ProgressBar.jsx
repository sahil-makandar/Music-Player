import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { usePlayerContext } from '../context/PlayerContext';
import styles from './ProgressBar.module.css';

const ProgressBar = () => {
  const { progress, seekTo, currentSong } = usePlayerContext();
  const [isDragging, setIsDragging] = useState(false);
  const [localProgress, setLocalProgress] = useState(progress);
  const progressBarRef = useRef(null);
  
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  const handleProgressClick = (e) => {
    const rect = progressBarRef.current.getBoundingClientRect();
    const percent = ((e.clientX - rect.left) / rect.width) * 100;
    seekTo(Math.max(0, Math.min(100, percent)));
  };
  
  const handleDragStart = () => {
    setIsDragging(true);
    setLocalProgress(progress);
  };
  
  const handleDrag = (e, info) => {
    if (progressBarRef.current) {
      const rect = progressBarRef.current.getBoundingClientRect();
      const percent = ((e.clientX - rect.left) / rect.width) * 100;
      setLocalProgress(Math.max(0, Math.min(100, percent)));
    }
  };
  
  const handleDragEnd = () => {
    seekTo(localProgress);
    setIsDragging(false);
  };
  
  const currentTimeInSeconds = (currentSong.duration * (isDragging ? localProgress : progress)) / 100;
  
  return (
    <div className={styles.progressContainer}>
      <span className={styles.timeDisplay}>
        {formatTime(currentTimeInSeconds)}
      </span>
      
      <div 
        className={styles.progressBarContainer} 
        onClick={handleProgressClick}
        ref={progressBarRef}
      >
        <div 
          className={styles.progressBackground}
        >
          <div 
            className={styles.progressFill}
            style={{ width: `${isDragging ? localProgress : progress}%` }}
          ></div>
          
          <motion.div 
            className={styles.progressHandle}
            style={{ left: `${isDragging ? localProgress : progress}%` }}
            drag="x"
            dragConstraints={progressBarRef}
            dragElastic={0}
            dragMomentum={false}
            onDragStart={handleDragStart}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
            whileHover={{ scale: 1.2 }}
            whileDrag={{ scale: 1.3 }}
          />
        </div>
      </div>
      
      <span className={styles.timeDisplay}>
        {formatTime(currentSong.duration)}
      </span>
    </div>
  );
};

export default ProgressBar;