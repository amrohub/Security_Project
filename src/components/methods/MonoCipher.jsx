import React, { useState, useEffect } from 'react';
import { 
  Shield,
  Moon,
  Sun,
  ClipboardCopy,
  Lock,
  Unlock,
  RefreshCcw,
  HelpCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import './MonoCipher.css';

export default function MonoalphabeticCipher() {
  const [text, setText] = useState('');
  const [result, setResult] = useState('');
  const [mode, setMode] = useState('encrypt');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [copied, setCopied] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  
  // Substitution alphabet (key)
  const [substitutionKey, setSubstitutionKey] = useState(
    'QWERTYUIOPASDFGHJKLZXCVBNM'
  );
  const plainAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  const validateKey = (key) => {
    // Remove non-letter characters and convert to uppercase
    const cleanKey = key.toUpperCase().replace(/[^A-Z]/g, '');
    
    // Check if all letters are unique
    const uniqueLetters = new Set(cleanKey.split(''));
    
    if (uniqueLetters.size !== cleanKey.length) {
      return false;
    }
    
    // Check if key has 26 letters
    return cleanKey.length === 26;
  };

  const generateRandomKey = () => {
    const alphabet = plainAlphabet.split('');
    // Fisher-Yates shuffle algorithm
    for (let i = alphabet.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [alphabet[i], alphabet[j]] = [alphabet[j], alphabet[i]];
    }
    setSubstitutionKey(alphabet.join(''));
  };

  const handleKeyChange = (e) => {
    const newKey = e.target.value.toUpperCase().replace(/[^A-Z]/g, '');
    setSubstitutionKey(newKey.slice(0, 26));
  };

  const monoalphabeticCipher = (input, encrypt) => {
    if (!validateKey(substitutionKey)) {
      return "Error: Key must contain all 26 letters of the alphabet with no duplicates";
    }
    
    return input.split('').map(char => {
      // Preserve case, spaces, punctuation, etc.
      const isUpperCase = char === char.toUpperCase();
      const plainChar = char.toUpperCase();
      
      let resultChar = char;
      const indexInPlain = plainAlphabet.indexOf(plainChar);
      
      if (indexInPlain !== -1) {
        // Found a letter to substitute
        if (encrypt) {
          // Encrypt: replace plain with cipher
          resultChar = substitutionKey[indexInPlain];
        } else {
          // Decrypt: replace cipher with plain
          const indexInCipher = substitutionKey.indexOf(plainChar);
          if (indexInCipher !== -1) {
            resultChar = plainAlphabet[indexInCipher];
          }
        }
        
        // Restore original case
        return isUpperCase ? resultChar : resultChar.toLowerCase();
      }
      
      // Return non-alphabetic characters unchanged
      return char;
    }).join('');
  };

  const handleProcess = () => {
    const processed = monoalphabeticCipher(text, mode === 'encrypt');
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
  }, [text, substitutionKey, mode]);

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
        <h1 className="methods-title">Monoalphabetic Cipher</h1>

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
          <h2 className="chapter-title">
            Substitution Key
            <button 
              className="help-button" 
              onClick={() => setShowHelp(!showHelp)}
              title="Learn about the substitution key"
            >
              <HelpCircle size={16} />
            </button>
          </h2>
          {showHelp && (
            <div className="help-panel">
              <p>A monoalphabetic cipher replaces each letter with another letter consistently throughout the message.</p>
              <p>The substitution key must contain all 26 letters of the alphabet with no duplicates.</p>
              <p>Example: In the key "QWERTYUIOPASDFGHJKLZXCVBNM", 'A' is replaced with 'Q', 'B' with 'W', etc.</p>
            </div>
          )}
          <div className="methods-list">
            <div className="method-item">
              <div className="key-display">
                <div className="key-row">
                  <span className="key-label">Plain:</span>
                  <div className="key-letters">
                    {plainAlphabet.split('').map((letter, index) => (
                      <span key={index} className="key-letter">{letter}</span>
                    ))}
                  </div>
                </div>
                <div className="key-row">
                  <span className="key-label">Cipher:</span>
                  <div className="key-letters">
                    {substitutionKey.split('').map((letter, index) => (
                      <span key={index} className="key-letter">{letter}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="key-input-container">
                <input
                  type="text"
                  placeholder="Enter substitution key (26 unique letters)"
                  value={substitutionKey}
                  onChange={handleKeyChange}
                  className={`key-input ${!validateKey(substitutionKey) ? 'key-invalid' : ''}`}
                  spellCheck="false"
                  maxLength={26}
                />
                <button 
                  className="random-key-btn"
                  onClick={generateRandomKey}
                  title="Generate random key"
                >
                  <RefreshCcw size={16} />
                </button>
              </div>
              {!validateKey(substitutionKey) && (
                <div className="key-error">
                  Key must contain all 26 letters of the alphabet with no duplicates
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="methods-chapter">
          <h2 className="chapter-title">Configuration</h2>
          <div className="methods-list">
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
        <div className="copyright">© 2025 Monoalphabetic Cipher Tool</div>
      </footer>
    </div>
  );
}