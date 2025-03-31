import { PlayerProvider } from './context/PlayerContext';
import MusicPlayer from './components/MusicPlayer';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <div className="background-gradient"></div>
      <PlayerProvider>
        <MusicPlayer />
      </PlayerProvider>
    </div>
  );
}

export default App;
