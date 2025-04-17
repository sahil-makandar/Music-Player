import { useState, useRef } from 'react';
import { usePlayerContext } from '../context/PlayerContext';
import styles from './ProgressBar.module.css';

const ProgressBar = () => {
  const { progress, seekTo, audioRef } = usePlayerContext();
  const [isDragging, setIsDragging] = useState(false);
  const [dragProgress, setDragProgress] = useState(null);
  const progressBarRef = useRef(null);
  
  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  const handleProgressClick = (e) => {
    if (!progressBarRef.current) return;
    
    const rect = progressBarRef.current.getBoundingClientRect();
    const clickPosition = e.clientX - rect.left;
    const newProgress = (clickPosition / rect.width) * 100;
    
    seekTo(newProgress);
  };
  
  const handleDragStart = () => {
    setIsDragging(true);
  };
  
  const handleDragMove = (e) => {
    if (!isDragging || !progressBarRef.current) return;
    
    const rect = progressBarRef.current.getBoundingClientRect();
    const clickPosition = e.clientX - rect.left;
    const newProgress = Math.max(0, Math.min((clickPosition / rect.width) * 100, 100));
    
    setDragProgress(newProgress);
  };
  
  const handleDragEnd = () => {
    if (isDragging && dragProgress !== null) {
      seekTo(dragProgress);
    }
    
    setIsDragging(false);
    setDragProgress(null);
  };
  
  const currentProgress = isDragging && dragProgress !== null ? dragProgress : progress;
  const currentTime = audioRef.current ? formatTime(audioRef.current.currentTime) : "0:00";
  const totalTime = audioRef.current ? formatTime(audioRef.current.duration) : "0:00";
  
  return (
    <div className={styles.progressContainer}>
      <div className={styles.timeInfo}>
        <span>{currentTime}</span>
        <span>{totalTime}</span>
      </div>
      
      <div 
        className={styles.progressBar}
        ref={progressBarRef}
        onClick={handleProgressClick}
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
      >
        <div 
          className={styles.progressFill}
          style={{ width: `${currentProgress}%` }}
        ></div>
        <div 
          className={styles.progressHandle}
          style={{ left: `${currentProgress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;