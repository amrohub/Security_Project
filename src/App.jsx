// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SecurityLandingPage from './components/pages/SecurityLandingPage';
import MethodsPage from './components/pages/MethodsPage';
import CaesarCipher from './components/methods/CaeserCipher';
import MonoalphabeticCipher from './components/methods/MonoCipher';
import RailFenceCipher from './components/methods/RailFenceCipher';
import PlayfairCipher from './components/methods/PlayfairCipher';
import RowTranspositionCipher from './components/methods/RowTranspositionCipher';
import VigenereCipher from './components/methods/VigenereCipher';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SecurityLandingPage />} />
        <Route path="/ciphers" element={<MethodsPage />} />
        <Route path="/caesar" element={<CaesarCipher />} />
        <Route path="/mono" element={<MonoalphabeticCipher />} />
        <Route path="/rail" element={<RailFenceCipher />} />
        <Route path="/play" element={<PlayfairCipher />} />
        <Route path="/row" element={<RowTranspositionCipher />} />
        <Route path="/poly" element={<VigenereCipher />} />

      </Routes>
    </Router>
  );
}

export default App;