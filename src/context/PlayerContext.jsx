import { createContext, useState, useContext, useEffect, useRef } from 'react';
import { songs } from '../data/songs';

const PlayerContext = createContext();

export const usePlayerContext = () => useContext(PlayerContext);

export const PlayerProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isShuffled, setIsShuffled] = useState(false);
  const [repeatMode, setRepeatMode] = useState('none'); // 'none', 'all', 'one'
  const [queue, setQueue] = useState(songs);
  
  const audioRef = useRef(null);
  
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
    }
    
    audioRef.current.src = currentSong.audioUrl;
    audioRef.current.volume = volume;
    
    if (isPlaying) {
      audioRef.current.play().catch(err => console.error("Playback failed:", err));
    }
    
    return () => {
      audioRef.current.pause();
    };
  }, [currentSong]);
  
  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play().catch(err => console.error("Playback failed:", err));
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);
  
  useEffect(() => {
    audioRef.current.volume = volume;
  }, [volume]);
  
  useEffect(() => {
    const updateProgress = () => {
      const duration = audioRef.current.duration;
      const currentTime = audioRef.current.currentTime;
      if (duration) {
        setProgress((currentTime / duration) * 100);
      }
    };
    
    const handleSongEnd = () => {
      if (repeatMode === 'one') {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      } else {
        playNextSong();
      }
    };
    
    audioRef.current.addEventListener('timeupdate', updateProgress);
    audioRef.current.addEventListener('ended', handleSongEnd);
    
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('timeupdate', updateProgress);
        audioRef.current.removeEventListener('ended', handleSongEnd);
      }
    };
  }, [repeatMode]);
  
  const playPause = () => {
    setIsPlaying(!isPlaying);
  };
  
  const playNextSong = () => {
    const currentIndex = queue.findIndex(song => song.id === currentSong.id);
    const nextIndex = (currentIndex + 1) % queue.length;
    setCurrentSong(queue[nextIndex]);
    setIsPlaying(true);
  };
  
  const playPrevSong = () => {
    const currentIndex = queue.findIndex(song => song.id === currentSong.id);
    const prevIndex = (currentIndex - 1 + queue.length) % queue.length;
    setCurrentSong(queue[prevIndex]);
    setIsPlaying(true);
  };
  
  const seekTo = (percent) => {
    const duration = audioRef.current.duration;
    audioRef.current.currentTime = (percent / 100) * duration;
    setProgress(percent);
  };
  
  const toggleShuffle = () => {
    if (!isShuffled) {
      // Save current song
      const currentSongId = currentSong.id;
      
      // Shuffle the queue
      const shuffledQueue = [...songs].sort(() => Math.random() - 0.5);
      
      // Make sure current song is still accessible
      const currentSongIndex = shuffledQueue.findIndex(song => song.id === currentSongId);
      if (currentSongIndex !== -1) {
        // Swap the current song to the beginning
        [shuffledQueue[0], shuffledQueue[currentSongIndex]] = 
        [shuffledQueue[currentSongIndex], shuffledQueue[0]];
      }
      
      setQueue(shuffledQueue);
    } else {
      // Restore original order
      setQueue([...songs]);
    }
    setIsShuffled(!isShuffled);
  };
  
  const toggleRepeat = () => {
    const modes = ['none', 'all', 'one'];
    const currentIndex = modes.indexOf(repeatMode);
    const nextIndex = (currentIndex + 1) % modes.length;
    setRepeatMode(modes[nextIndex]);
  };
  
  const changeVolume = (newVolume) => {
    setVolume(newVolume);
  };
  
  const playSong = (songId) => {
    const song = songs.find(s => s.id === songId);
    if (song) {
      setCurrentSong(song);
      setIsPlaying(true);
    }
  };
  
  const value = {
    currentSong,
    isPlaying,
    progress,
    volume,
    isShuffled,
    repeatMode,
    queue,
    playPause,
    playNextSong,
    playPrevSong,
    seekTo,
    toggleShuffle,
    toggleRepeat,
    changeVolume,
    playSong
  };
  
  return (
    <PlayerContext.Provider value={value}>
      {children}
    </PlayerContext.Provider>
  );
};