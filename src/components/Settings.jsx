import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaTimes, FaVolumeUp, FaMusic, FaDownload, FaUpload, FaUserCog } from 'react-icons/fa';
import { usePlayerContext } from '../context/PlayerContext';
import styles from './Settings.module.css';

const Settings = ({ onClose, darkMode }) => {
  const { equalizer, adjustEqualizer, playbackRate, changePlaybackRate } = usePlayerContext();
  const [activeTab, setActiveTab] = useState('audio');
  
  const speedOptions = [0.5, 0.75, 1.0, 1.25, 1.5, 2.0];
  
  return (
    <motion.div 
      className={`${styles.settingsOverlay} ${darkMode ? styles.darkMode : styles.lightMode}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className={styles.settingsPanel}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <div className={styles.settingsHeader}>
          <h2>Settings</h2>
          <button 
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close settings"
          >
            <FaTimes />
          </button>
        </div>
        
        <div className={styles.settingsTabs}>
          <button 
            className={`${styles.tabButton} ${activeTab === 'audio' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('audio')}
          >
            <FaVolumeUp /> Audio
          </button>
          <button 
            className={`${styles.tabButton} ${activeTab === 'library' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('library')}
          >
            <FaMusic /> Library
          </button>
          <button 
            className={`${styles.tabButton} ${activeTab === 'account' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('account')}
          >
            <FaUserCog /> Account
          </button>
        </div>
        
        <div className={styles.settingsContent}>
          {activeTab === 'audio' && (
            <div className={styles.audioSettings}>
              <div className={styles.settingsGroup}>
                <h3>Playback Speed</h3>
                <div className={styles.speedOptions}>
                  {speedOptions.map(speed => (
                    <button 
                      key={speed}
                      className={`${styles.speedButton} ${playbackRate === speed ? styles.activeSpeed : ''}`}
                      onClick={() => changePlaybackRate(speed)}
                    >
                      {speed}x
                    </button>
                  ))}
                </div>
              </div>
              
              <div className={styles.settingsGroup}>
                <h3>Equalizer</h3>
                <div className={styles.equalizerControls}>
                  <div className={styles.eqControl}>
                    <label>Bass</label>
                    <input 
                      type="range" 
                      min="-10" 
                      max="10" 
                      value={equalizer.bass} 
                      onChange={(e) => adjustEqualizer('bass', parseInt(e.target.value))}
                      className={styles.eqSlider}
                    />
                    <span>{equalizer.bass}</span>
                  </div>
                  
                  <div className={styles.eqControl}>
                    <label>Mid</label>
                    <input 
                      type="range" 
                      min="-10" 
                      max="10" 
                      value={equalizer.mid} 
                      onChange={(e) => adjustEqualizer('mid', parseInt(e.target.value))}
                      className={styles.eqSlider}
                    />
                    <span>{equalizer.mid}</span>
                  </div>
                  
                  <div className={styles.eqControl}>
                    <label>Treble</label>
                    <input 
                      type="range" 
                      min="-10" 
                      max="10" 
                      value={equalizer.treble} 
                      onChange={(e) => adjustEqualizer('treble', parseInt(e.target.value))}
                      className={styles.eqSlider}
                    />
                    <span>{equalizer.treble}</span>
                  </div>
                </div>
              </div>
              
              <div className={styles.settingsGroup}>
                <h3>Audio Quality</h3>
                <div className={styles.qualityOptions}>
                  <button className={`${styles.qualityButton} ${styles.activeQuality}`}>
                    High (320kbps)
                  </button>
                  <button className={styles.qualityButton}>
                    Medium (192kbps)
                  </button>
                  <button className={styles.qualityButton}>
                    Low (128kbps)
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'library' && (
            <div className={styles.librarySettings}>
              <div className={styles.settingsGroup}>
                <h3>Music Library</h3>
                <p>Manage your music collection and playlists</p>
                
                <div className={styles.libraryActions}>
                  <button className={styles.actionButton}>
                    <FaUpload /> Import Music
                  </button>
                  <button className={styles.actionButton}>
                    <FaDownload /> Export Playlists
                  </button>
                </div>
              </div>
              
              <div className={styles.settingsGroup}>
                <h3>Storage</h3>
                <div className={styles.storageInfo}>
                  <div className={styles.storageBar}>
                    <div 
                      className={styles.storageUsed}
                      style={{ width: '35%' }}
                    ></div>
                  </div>
                  <p>2.3 GB used of 10 GB</p>
                </div>
                <button className={styles.clearButton}>
                  Clear Cache
                </button>
              </div>
            </div>
          )}
          
          {activeTab === 'account' && (
            <div className={styles.accountSettings}>
              <div className={styles.settingsGroup}>
                <h3>User Profile</h3>
                <div className={styles.profilePreview}>
                  <div className={styles.profileImage}>
                    <FaUserCog size={40} />
                  </div>
                  <div className={styles.profileDetails}>
                    <p className={styles.userName}>Guest User</p>
                    <button className={styles.loginButton}>Sign In</button>
                  </div>
                </div>
              </div>
              
              <div className={styles.settingsGroup}>
                <h3>Preferences</h3>
                <div className={styles.preferencesOptions}>
                  <div className={styles.preferenceOption}>
                    <label htmlFor="autoplay">Autoplay</label>
                    <input type="checkbox" id="autoplay" />
                  </div>
                  <div className={styles.preferenceOption}>
                    <label htmlFor="notifications">Notifications</label>
                    <input type="checkbox" id="notifications" />
                  </div>
                  <div className={styles.preferenceOption}>
                    <label htmlFor="dataSaver">Data Saver</label>
                    <input type="checkbox" id="dataSaver" />
                  </div>
                </div>
              </div>
              
              <div className={styles.settingsGroup}>
                <h3>About</h3>
                <p className={styles.versionInfo}>Melodify v1.0.0</p>
                <div className={styles.aboutLinks}>
                  <a href="#" className={styles.aboutLink}>Privacy Policy</a>
                  <a href="#" className={styles.aboutLink}>Terms of Service</a>
                  <a href="#" className={styles.aboutLink}>Contact Support</a>
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Settings;