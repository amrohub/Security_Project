import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, 
  BarChart2, 
  Moon, 
  Sun,
  Lock, 
  Code,
  Terminal 
} from 'lucide-react';
import './SecurityLandingPage.css';

function SecurityLandingPage() {
  const [year] = useState(2025);
  const [username] = useState("Amro");
  const [textEffect, setTextEffect] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(true);
  
  // Simulate terminal typing effect
  useEffect(() => {
    const text = "Computer Security";
    let i = 0;
    const typingEffect = setInterval(() => {
      if (i <= text.length) {
        setTextEffect(text.substring(0, i));
        i++;
      } else {
        clearInterval(typingEffect);
      }
    }, 100);
    
    return () => clearInterval(typingEffect);
  }, []);
  
  // Toggle theme mode and update document class
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    // Add or remove dark-mode class from the body to apply the theme
    document.body.classList.toggle('light-mode', !isDarkMode);
  };
  
  // Set initial theme on component mount
  useEffect(() => {
    document.body.classList.toggle('light-mode', !isDarkMode);
  }, []);
  
  return (
    <div className="security-container">
      {/* Matrix-like background */}
      <div className="matrix-bg"></div>
      
      {/* Header */}
      <header className="security-header">
        <div className="security-logo">
          <Shield size={24} />
          <span>CS-MTI</span>
        </div>
        <div className="security-nav">
          <Link to="/ciphers">
            <button className="security-icon-btn">
              <BarChart2 size={18} />
            </button>
          </Link>
          <button className="security-icon-btn active" onClick={toggleTheme}>
            {isDarkMode ? <Moon size={18} /> : <Sun size={18} />}
          </button>
        </div>
      </header>
      
      {/* Main content */}
      <main className="security-main">
        <div className="security-circle">
          <Lock size={32} className="lock-icon" />
        </div>
        
        <div className="terminal-window">
          <div className="terminal-header">
            <div className="terminal-buttons">
              <span className="terminal-btn close"></span>
              <span className="terminal-btn minimize"></span>
              <span className="terminal-btn maximize"></span>
            </div>
            <div className="terminal-title">terminal@computer-security</div>
          </div>
          <div className="terminal-content">
            <div className="terminal-line">
              <span className="terminal-prompt">root@secure:~$</span> ./display_project.sh
            </div>
            <div className="terminal-line">
              Loading project data...<span className="terminal-cursor">█</span>
            </div>
            <div className="terminal-line">
              <span className="typing-text">{textEffect}</span><span className="terminal-cursor blink">█</span>
            </div>
            <div className="terminal-line">
              <span className="success-text">Mini Project</span>
            </div>
          </div>
        </div>
        
        <Link to="/ciphers" className="security-button">
          <Code size={16} className="button-icon" />
          <span>Jump to Ciphers</span>
          <Terminal size={16} className="button-icon" />
        </Link>
        
        <div className="security-stats">
          <div className="stat-item">
            <div className="stat-label">CIPHER SECURITY</div>
            <div className="stat-bar">
              <div className="stat-fill" style={{width: '87%'}}></div>
            </div>
            <div className="stat-value">87%</div>
          </div>
          <div className="stat-item">
            <div className="stat-label">DATA INTEGRITY</div>
            <div className="stat-bar">
              <div className="stat-fill" style={{width: '95%'}}></div>
            </div>
            <div className="stat-value">95%</div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="security-footer">
        <div className="copyright">
          © {year} <span className="username">{username}.</span>
        </div>

        <div className="social-links">
          <a href="#" className="social-link">
            <svg className="social-icon" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
          </a>
          <a href="#" className="social-link">
            <svg className="social-icon" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
          <a href="#" className="social-link">
            <svg className="social-icon" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
        </div>
      </footer>
    </div>
  );
}

export default SecurityLandingPage;