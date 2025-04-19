import React, { useState, useEffect } from 'react';
import { 
  Shield,
  Moon,
  Sun,
  ClipboardCopy,
  Lock,
  Unlock,
  Key
} from 'lucide-react';
import { Link } from 'react-router-dom';
import './BaseStyle.css'; // Reusing the same CSS file

export default function VigenereCipher() {
  const [text, setText] = useState('');
  const [keyword, setKeyword] = useState('KEY');
  const [result, setResult] = useState('');
  const [mode, setMode] = useState('encrypt');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [copied, setCopied] = useState(false);

  // Convert character to shift value (A=0, B=1, etc.)
  const charToShift = (char) => {
    return char.toUpperCase().charCodeAt(0) - 65;
  };

  // Apply Vigenère cipher operation
  const vigenereProcess = (plainText, key, encrypt) => {
    if (!plainText || !key || key.trim() === '') {
      return '';
    }

    // Filter key to only use letters and convert to uppercase
    const processedKey = key.replace(/[^a-zA-Z]/g, '').toUpperCase();
    if (processedKey.length === 0) {
      return plainText; // Return original text if key is invalid
    }

    return plainText.split('').map((char, index) => {
      // Only process alphabetic characters
      if (/[a-zA-Z]/.test(char)) {
        const isUpperCase = /[A-Z]/.test(char);
        const baseCharCode = isUpperCase ? 65 : 97;
        const charPosition = char.toUpperCase().charCodeAt(0) - 65;
        
        // Get corresponding key character (cycling through key)
        const keyIndex = index % processedKey.length;
        const keyShift = charToShift(processedKey[keyIndex]);
        
        // Apply encryption or decryption
        let newPosition;
        if (encrypt) {
          // Encryption: c = (p + k) mod 26
          newPosition = (charPosition + keyShift) % 26;
        } else {
          // Decryption: p = (c - k + 26) mod 26
          newPosition = (charPosition - keyShift + 26) % 26;
        }
        
        // Convert back to character
        return String.fromCharCode(newPosition + baseCharCode);
      } else {
        // Non-alphabetic characters remain unchanged
        return char;
      }
    }).join('');
  };

  const handleProcess = () => {
    const processed = vigenereProcess(text, keyword, mode === 'encrypt');
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
    if (text.trim() !== '' && keyword.trim() !== '') {
      handleProcess();
    } else {
      setResult('');
    }
  }, [text, keyword, mode]);

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
        <h1 className="methods-title">Vigenère Cipher</h1>

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
              <label className="method-name">Keyword</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Key size={16} color="var(--accent)" />
                <input
                  type="text"
                  placeholder="Enter keyword (letters only)"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                />
              </div>
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
        <div className="copyright">© 2025 Vigenère Cipher Tool</div>
      </footer>
    </div>
  );
}