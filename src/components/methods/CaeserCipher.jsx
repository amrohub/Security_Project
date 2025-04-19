import React, { useState, useEffect } from 'react';
import { 
  Shield,
  Moon,
  Sun,
  ClipboardCopy,
  Lock,
  Unlock
} from 'lucide-react';
import { Link } from 'react-router-dom';
import './BaseStyle.css';

export default function CaesarCipher() {
  const [text, setText] = useState('');
  const [shift, setShift] = useState(3);
  const [result, setResult] = useState('');
  const [mode, setMode] = useState('encrypt');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [copied, setCopied] = useState(false);

  const caesarShift = (char, shiftAmount) => {
    if (/[a-z]/.test(char)) {
      return String.fromCharCode((char.charCodeAt(0) - 97 + shiftAmount + 26) % 26 + 97);
    } else if (/[A-Z]/.test(char)) {
      return String.fromCharCode((char.charCodeAt(0) - 65 + shiftAmount + 26) % 26 + 65);
    } else {
      return char;
    }
  };

  const handleProcess = () => {
    const rawShift = parseInt(shift);
    const normalizedShift = ((rawShift % 26) + 26) % 26;
    const shiftAmount = mode === 'encrypt' ? normalizedShift : -normalizedShift;
    const processed = text
      .split('')
      .map(char => caesarShift(char, shiftAmount))
      .join('');
    setResult(processed);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('light-mode', !isDarkMode);
  };

  useEffect(() => {
    document.body.classList.toggle('light-mode', !isDarkMode);
  }, []);

  useEffect(() => {
    if (text.trim() !== '') {
      handleProcess();
    } else {
      setResult('');
    }
  }, [text, shift, mode]);

  const handleCopy = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="methods-container">
      <div className="matrix-bg"></div>

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

      <main className="methods-main">
        <h1 className="methods-title">Caesar Cipher</h1>

        <div className="methods-chapter">
          <h2 className="chapter-title">Input</h2>
          <div className="methods-list">
            <div className="method-item">
              <textarea
                placeholder="Enter text to encrypt or decrypt"
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={3}
              />
            </div>
          </div>
        </div>

        <div className="methods-chapter">
          <h2 className="chapter-title">Configuration</h2>
          <div className="methods-list">
            <div className="method-item">
              <label className="method-name">Shift Value</label>
              <input
                type="number"
                placeholder="Enter shift value (0-25)"
                value={shift}
                onChange={(e) => setShift(e.target.value)}
                min="0"
                max="25"
              />
            </div>

            <div className="method-item">
              <label className="method-name">Operation Mode</label>
              <div className="operation-buttons">
                <button
                  onClick={() => setMode('encrypt')}
                  className={`operation-button ${mode === 'encrypt' ? 'active' : ''}`}
                >
                  <Lock size={16} />
                  Encrypt
                </button>
                <button
                  onClick={() => setMode('decrypt')}
                  className={`operation-button ${mode === 'decrypt' ? 'active' : ''}`}
                >
                  <Unlock size={16} />
                  Decrypt
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="methods-chapter">
          <div className="chapter-title">
            {mode === 'encrypt' ? 'Encrypted' : 'Decrypted'} Result
            {result && <span className="new-tag">GENERATED</span>}
          </div>
          <div className="methods-list">
            <div className="method-item">
              <div className="result-box">
                {result ? (
                  <div className="generated-content">{result}</div>
                ) : (
                  <div className="result-placeholder">Results will appear here...</div>
                )}
              </div>
              {result && (
                <button
                  onClick={handleCopy}
                  className="copy-button"
                >
                  <ClipboardCopy size={16} />
                  {copied ? 'Copied to clipboard!' : 'Copy to clipboard'}
                </button>
              )}
            </div>
          </div>
        </div>
      </main>

      <footer className="methods-footer">
        <div className="copyright">© 2025 Caesar Cipher Tool</div>
      </footer>
    </div>
  );
}