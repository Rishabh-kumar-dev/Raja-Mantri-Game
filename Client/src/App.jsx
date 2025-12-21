import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { EnterPlayer } from './pages/EnterPlayer';
import { Lobby } from './pages/Lobby';
import { GameScreen } from './pages/GameScreen';
import Scores from './pages/Scores';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<EnterPlayer />} />
          <Route path="/lobby" element={<Lobby />} />
          <Route path="/game-screen" element={<GameScreen />} />
          <Route path="/scores" element={<Scores />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
