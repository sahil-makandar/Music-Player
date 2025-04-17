import { motion } from 'framer-motion';
import { FaHome, FaMusic, FaSearch, FaHeart, FaCog } from 'react-icons/fa';
import styles from './Navigation.module.css';

const Navigation = ({ darkMode, onNavigate, currentPage }) => {
  const navItems = [
    { id: 'home', icon: <FaHome />, label: 'Home' },
    { id: 'player', icon: <FaMusic />, label: 'Player' },
    { id: 'search', icon: <FaSearch />, label: 'Search' },
    { id: 'favorites', icon: <FaHeart />, label: 'Favorites' },
    { id: 'settings', icon: <FaCog />, label: 'Settings' }
  ];
  
  return (
    <motion.div 
      className={`${styles.navContainer} ${darkMode ? '' : styles.lightMode}`}
      initial={{ x: -80 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.navLogo}>
        <FaMusic />
      </div>
      
      <div className={styles.navItems}>
        {navItems.map(item => (
          <motion.a
            key={item.id}
            className={`${styles.navItem} ${currentPage === item.id ? styles.active : ''}`}
            onClick={() => onNavigate(item.id)}
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className={styles.navIcon}>{item.icon}</span>
            <span className={styles.navText}>{item.label}</span>
          </motion.a>
        ))}
      </div>
    </motion.div>
  );
};

export default Navigation;