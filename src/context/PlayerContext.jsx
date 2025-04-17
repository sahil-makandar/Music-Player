import { createContext, useContext, useState, useRef, useEffect } from 'react';
import sampleSongs from '../data/sampleSongs';

// Create duplicates of sample songs to make the UI look fuller
const createDuplicateSongs = (songs) => {
  const duplicates = [...songs];
  
  // Album cover variations for duplicates
  const alternativeCoverUrls = [
    "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bXVzaWN8ZW58MHx8MHx8fDA%3D&w=1000&q=80",
    "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bXVzaWN8ZW58MHx8MHx8fDA%3D&w=1000&q=80",
    "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bXVzaWN8ZW58MHx8MHx8fDA%3D&w=1000&q=80",
    "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG11c2ljfGVufDB8fDB8fHww&w=1000&q=80",
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG11c2ljfGVufDB8fDB8fHww&w=1000&q=80",
    "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fG11c2ljfGVufDB8fDB8fHww&w=1000&q=80"
  ];
  
  // Remix types for variations
  const remixTypes = [
    "Remix", "Club Mix", "Acoustic Version", "Live", "Extended Mix", 
    "Radio Edit", "Instrumental", "Unplugged", "Orchestra Version", "Piano Cover"
  ];
  
  // Create duplicates with new IDs, titles and cover images
  songs.forEach((song, index) => {
    // Add 3-5 variations for each song
    const variationCount = 3 + Math.floor(Math.random() * 3);
    
    for (let i = 0; i < variationCount; i++) {
      const remixType = remixTypes[Math.floor(Math.random() * remixTypes.length)];
      const coverUrl = alternativeCoverUrls[Math.floor(Math.random() * alternativeCoverUrls.length)];
      
      duplicates.push({
        ...song,
        id: song.id * 100 + i, // Create unique ID
        title: `${song.title} (${remixType})`,
        coverUrl: coverUrl,
        isFavorite: Math.random() > 0.7 // Randomly set some as favorites
      });
    }
  });
  
  return duplicates;
};

const PlayerContext = createContext();

export const usePlayerContext = () => useContext(PlayerContext);

export const PlayerProvider = ({ children }) => {
  const [queue, setQueue] = useState(createDuplicateSongs(sampleSongs));
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isShuffleOn, setIsShuffleOn] = useState(false);
  const [isRepeatOn, setIsRepeatOn] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  
  const audioRef = useRef(new Audio());
  const intervalRef = useRef(null);
  
  // Initialize with first song
  useEffect(() => {
    if (queue.length > 0 && !currentSong) {
      setCurrentSong(queue[0]);
    }
  }, [queue, currentSong]);
  
  // Handle audio source changes
  useEffect(() => {
    if (currentSong) {
      audioRef.current.src = currentSong.audioUrl;
      audioRef.current.volume = volume;
      
      if (isPlaying) {
        const playPromise = audioRef.current.play();
        
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.error("Error playing audio:", error);
            // Auto-play was prevented, set isPlaying to false
            setIsPlaying(false);
          });
        }
      }
    }
    
    return () => {
      audioRef.current.pause();
    };
  }, [currentSong]);
  
  // Handle play/pause
  useEffect(() => {
    if (isPlaying) {
      const playPromise = audioRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.error("Error playing audio:", error);
          // Auto-play was prevented, set isPlaying to false
          setIsPlaying(false);
        });
      }
      
      startProgressInterval();
    } else {
      audioRef.current.pause();
      clearProgressInterval();
    }
  }, [isPlaying]);
  
  // Handle volume changes
  useEffect(() => {
    audioRef.current.volume = isMuted ? 0 : volume;
  }, [volume, isMuted]);
  
  // Handle song end
  useEffect(() => {
    const handleSongEnd = () => {
      if (isRepeatOn) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(err => console.error("Error playing audio:", err));
      } else {
        playNextSong();
      }
    };
    
    audioRef.current.addEventListener('ended', handleSongEnd);
    
    return () => {
      audioRef.current.removeEventListener('ended', handleSongEnd);
    };
  }, [isRepeatOn, currentSong, queue]);
  
  const startProgressInterval = () => {
    clearProgressInterval();
    intervalRef.current = setInterval(() => {
      if (audioRef.current.duration) {
        const currentProgress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
        setProgress(currentProgress);
      }
    }, 1000);
  };
  
  const clearProgressInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };
  
  const playPause = () => {
    setIsPlaying(!isPlaying);
  };
  
  const playSong = (songId) => {
    const song = queue.find(s => s.id === songId);
    if (song) {
      if (currentSong && currentSong.id === songId) {
        playPause();
      } else {
        setCurrentSong(song);
        setIsPlaying(true);
      }
    }
  };
  
  const playNextSong = () => {
    if (!currentSong || queue.length <= 1) return;
    
    let nextIndex;
    if (isShuffleOn) {
      // Get random song that's not the current one
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * queue.length);
      } while (queue.length > 1 && queue[randomIndex].id === currentSong.id);
      nextIndex = randomIndex;
    } else {
      // Get next song in queue
      const currentIndex = queue.findIndex(song => song.id === currentSong.id);
      nextIndex = (currentIndex + 1) % queue.length;
    }
    
    setCurrentSong(queue[nextIndex]);
    setIsPlaying(true);
  };
  
  const playPrevSong = () => {
    if (!currentSong || queue.length <= 1) return;
    
    if (audioRef.current.currentTime > 3) {
      // If more than 3 seconds into song, restart it
      audioRef.current.currentTime = 0;
    } else {
      // Otherwise go to previous song
      const currentIndex = queue.findIndex(song => song.id === currentSong.id);
      const prevIndex = (currentIndex - 1 + queue.length) % queue.length;
      setCurrentSong(queue[prevIndex]);
    }
    
    setIsPlaying(true);
  };
  
  const seekTo = (percent) => {
    if (audioRef.current.duration) {
      audioRef.current.currentTime = (percent / 100) * audioRef.current.duration;
      setProgress(percent);
    }
  };
  
  const adjustVolume = (newVolume) => {
    setVolume(newVolume);
  };
  
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };
  
  const toggleShuffle = () => {
    setIsShuffleOn(!isShuffleOn);
  };
  
  const toggleRepeat = () => {
    setIsRepeatOn(!isRepeatOn);
  };
  
  const toggleFavorite = (songId) => {
    setQueue(prevQueue => 
      prevQueue.map(song => 
        song.id === songId ? { ...song, isFavorite: !song.isFavorite } : song
      )
    );
    
    if (currentSong && currentSong.id === songId) {
      setCurrentSong(prevSong => ({ ...prevSong, isFavorite: !prevSong.isFavorite }));
    }
  };
  
  const value = {
    queue,
    currentSong,
    isPlaying,
    progress,
    volume,
    isShuffleOn,
    isRepeatOn,
    isMuted,
    audioRef,
    playPause,
    playSong,
    playNextSong,
    playPrevSong,
    seekTo,
    adjustVolume,
    toggleMute,
    toggleShuffle,
    toggleRepeat,
    toggleFavorite
  };
  
  return (
    <PlayerContext.Provider value={value}>
      {children}
    </PlayerContext.Provider>
  );
};