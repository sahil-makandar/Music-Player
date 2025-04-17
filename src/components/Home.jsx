import { motion } from 'framer-motion';
import { FaPlay, FaRandom } from 'react-icons/fa';
import { usePlayerContext } from '../context/PlayerContext';
import styles from './Home.module.css';

const Home = ({ darkMode }) => {
  const { queue, playSong, toggleShuffle } = usePlayerContext();
  
  // Group songs by genre
  const songsByGenre = queue.reduce((acc, song) => {
    if (!acc[song.genre]) {
      acc[song.genre] = [];
    }
    acc[song.genre].push(song);
    return acc;
  }, {});
  
  // Get recently added songs (last 5)
  const recentlyAdded = [...queue].slice(-5).reverse();
  
  return (
    <div className={styles.homeContainer}>
      <section className={styles.featuredSection}>
        <h2 className={styles.sectionTitle}>Featured Songs</h2>
        <div className={styles.cardGrid}>
          {queue.slice(0, 4).map(song => (
            <div key={song.id} className={styles.songCard} onClick={() => playSong(song.id)}>
              <div className={styles.cardCover}>
                <img src={song.coverUrl} alt={song.title} />
                <div className={styles.playOverlay}>
                  <button className={styles.playButton}>
                    <FaPlay />
                  </button>
                </div>
              </div>
              <div className={styles.cardInfo}>
                <h3 className={styles.cardTitle}>{song.title}</h3>
                <p className={styles.cardArtist}>{song.artist}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      <section className={styles.recentlyAddedSection}>
        <h2 className={styles.sectionTitle}>Recently Added</h2>
        <div className={styles.cardGrid}>
          {recentlyAdded.map(song => (
            <div key={song.id} className={styles.songCard} onClick={() => playSong(song.id)}>
              <div className={styles.cardCover}>
                <img src={song.coverUrl} alt={song.title} />
                <div className={styles.playOverlay}>
                  <button className={styles.playButton}>
                    <FaPlay />
                  </button>
                </div>
              </div>
              <div className={styles.cardInfo}>
                <h3 className={styles.cardTitle}>{song.title}</h3>
                <p className={styles.cardArtist}>{song.artist}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {Object.entries(songsByGenre).map(([genre, songs]) => (
        <section key={genre} className={styles.genreSection}>
          <div className={styles.genreHeader}>
            <h2 className={styles.sectionTitle}>{genre}</h2>
            <button 
              className={styles.shuffleButton}
              onClick={toggleShuffle}
            >
              <FaRandom /> Shuffle
            </button>
          </div>
          <div className={styles.cardGrid}>
            {songs.map(song => (
              <div key={song.id} className={styles.songCard} onClick={() => playSong(song.id)}>
                <div className={styles.cardCover}>
                  <img src={song.coverUrl} alt={song.title} />
                  <div className={styles.playOverlay}>
                    <button className={styles.playButton}>
                      <FaPlay />
                    </button>
                  </div>
                </div>
                <div className={styles.cardInfo}>
                  <h3 className={styles.cardTitle}>{song.title}</h3>
                  <p className={styles.cardArtist}>{song.artist}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default Home;