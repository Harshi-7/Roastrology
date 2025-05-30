// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AskPerplexityWithResume from './pages/AskPerplexityWithResume';  
import MemeGenerator from './pages/MemeGenerator';        
import Horoscope from './pages/Horoscope';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/ask-with-resume" element={<AskPerplexityWithResume />} />
        <Route path="/meme-generator" element={<MemeGenerator />} />
        <Route path="/resume-horoscope" element={<Horoscope/>} />

        
      </Routes>
    </Router>
  );
}

export default App;