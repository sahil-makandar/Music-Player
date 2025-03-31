import { motion } from 'framer-motion';
import NowPlaying from './NowPlaying';
import Controls from './Controls';
import ProgressBar from './ProgressBar';
import Playlist from './Playlist';
import VolumeControl from './VolumeControl';
import styles from './MusicPlayer.module.css';

const MusicPlayer = () => {
  return (
    <motion.div 
      className={styles.musicPlayerContainer}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className={styles.playerSection}>
        <NowPlaying />
        <div className={styles.controlsSection}>
          <ProgressBar />
          <Controls />
          <VolumeControl />
        </div>
      </div>
      <div className={styles.playlistSection}>
        <Playlist />
      </div>
    </motion.div>
  );
};

export default MusicPlayer;