import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield,
  Moon,
  Sun,
} from 'lucide-react';
import './MethodsPage.css';

function MethodsPage() {
  const [year] = useState(2025);
  const [username] = useState("Amro");
  const [isDarkMode, setIsDarkMode] = useState(true);
  
  // Toggle theme mode and update document class
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('light-mode', !isDarkMode);
  };
  
  // Set initial theme on component mount
  useEffect(() => {
    document.body.classList.toggle('light-mode', !isDarkMode);
  }, []);
  
  return (
    <div className="methods-container">
      {/* Matrix-like background */}
      <div className="matrix-bg"></div>
      
      {/* Header Logo */}
      <div className="methods-logo-area">
        <div className="methods-logo">
          <Link to="/">
            <div className="security-logo">
            <Shield size={24} />
            <span>CS-MTI</span>
            </div>
          </Link>
        </div>
        
        <div className="methods-header-controls">
          <button className="methods-icon-btn active" onClick={toggleTheme}>
            {isDarkMode ? <Moon size={18} /> : <Sun size={18} />}
          </button>
        </div>
      </div>
      
      {/* Main content */}
      <main className="methods-main">
        <h1 className="methods-title">Ciphers</h1>
        
        <div className="methods-chapter">
          <h2 className="chapter-title">Chapter 2</h2>
          <div className="methods-list">

            <Link to="/caesar">
              <div className="method-item">
                <span className="method-name">Caesar Cipher</span>
              </div>  
            </Link>

            <Link to="/mono">
            <div className="method-item">
              <span className="method-name">Monoalphabetic Cipher</span>
            </div>
            </Link>

            <Link to="/rail">
            <div className="method-item">
              <span className="method-name">Rail-fence Cipher</span>
            </div>
            </Link>

            <Link to="/play">
            <div className="method-item">
              <span className="method-name">Playfair Cipher</span>
            </div>
            </Link>

            <Link to="/row">
            <div className="method-item">
              <span className="method-name">Row-Transposition Cipher</span>
            </div>
            </Link>

            <Link to="/poly">
            <div className="method-item">
              <span className="method-name">Polyalphabetic (Vigenère) Cipher</span>
            </div>
            </Link>

          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="methods-footer">
        <div className="copyright">
          © {year} {username}.
        </div>
      </footer>
    </div>
  );
}

export default MethodsPage;