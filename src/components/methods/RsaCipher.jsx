import React, { useState, useEffect } from 'react';
import { 
  Shield,
  Moon,
  Sun,
  ClipboardCopy,
  Lock,
  Unlock,
  KeyRound,
  FileText
} from 'lucide-react';
import { Link } from 'react-router-dom';
import './BaseStyle.css';
import * as math from 'mathjs';

export default function RSACipher() {
  const [text, setText] = useState('');
  const [result, setResult] = useState('');
  const [mode, setMode] = useState('encrypt');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [copied, setCopied] = useState(false);
  const [publicKey, setPublicKey] = useState({ n: 3233, e: 17 });
  const [privateKey, setPrivateKey] = useState({ n: 3233, d: 2753 });
  const [keySize, setKeySize] = useState('small');
  
  // Predefined keys for demo purposes
  const keySizes = {
    small: {
      public: { n: 3233, e: 17 },
      private: { n: 3233, d: 2753 }
    },
    medium: {
      public: { n: 33667, e: 7 },
      private: { n: 33667, d: 19183 }
    },
    large: {
      public: { n: 1073741789, e: 65537 },
      private: { n: 1073741789, d: 16947011 }
    }
  };

  // Function to calculate modular exponentiation (for RSA operations)
  const modPow = (base, exponent, modulus) => {
    if (modulus === 1) return 0;
    
    let result = 1;
    base = base % modulus;
    
    while (exponent > 0) {
      // If exponent is odd, multiply base with result
      if (exponent % 2 === 1) {
        result = (result * base) % modulus;
      }
      // Now exponent is even
      exponent = Math.floor(exponent / 2);
      base = (base * base) % modulus;
    }
    
    return result;
  };

  // RSA encryption function
  const encryptRSA = (plaintext) => {
    // Convert plaintext to numbers (ASCII values)
    const numbers = plaintext.split('').map(char => char.charCodeAt(0));
    
    // Encrypt each number
    const encrypted = numbers.map(num => {
      // Basic RSA encryption: c = m^e mod n
      return modPow(num, publicKey.e, publicKey.n);
    });
    
    return encrypted.join(' ');
  };

  // RSA decryption function
  const decryptRSA = (ciphertext) => {
    try {
      // Split the ciphertext into individual encrypted values
      const encryptedValues = ciphertext.split(' ').map(Number);
      
      // Decrypt each value
      const decrypted = encryptedValues.map(num => {
        // Basic RSA decryption: m = c^d mod n
        const decryptedNum = modPow(num, privateKey.d, privateKey.n);
        return String.fromCharCode(decryptedNum);
      });
      
      return decrypted.join('');
    } catch (error) {
      return 'Invalid ciphertext format. Please use space-separated numbers.';
    }
  };

  const handleProcess = () => {
    if (text.trim() === '') {
      setResult('');
      return;
    }
    
    if (mode === 'encrypt') {
      setResult(encryptRSA(text));
    } else {
      setResult(decryptRSA(text));
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('light-mode', !isDarkMode);
  };

  const handleChangeKeySize = (size) => {
    setKeySize(size);
    setPublicKey(keySizes[size].public);
    setPrivateKey(keySizes[size].private);
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
  }, [text, mode, publicKey, privateKey]);

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
        <h1 className="methods-title">RSA Cipher</h1>

        <div className="methods-chapter">
          <h2 className="chapter-title">Input</h2>
          <div className="methods-list">
            <div className="method-item">
              <textarea
                placeholder={mode === 'encrypt' 
                  ? "Enter text to encrypt" 
                  : "Enter space-separated numbers to decrypt"}
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
              <label className="method-name">Key Size</label>
              <div className="operation-buttons">
                <button
                  onClick={() => handleChangeKeySize('small')}
                  className={`operation-button ${keySize === 'small' ? 'active' : ''}`}
                >
                  Small
                </button>
                <button
                  onClick={() => handleChangeKeySize('medium')}
                  className={`operation-button ${keySize === 'medium' ? 'active' : ''}`}
                >
                  Medium
                </button>
                <button
                  onClick={() => handleChangeKeySize('large')}
                  className={`operation-button ${keySize === 'large' ? 'active' : ''}`}
                >
                  Large
                </button>
              </div>
            </div>

            <div className="method-item">
              <label className="method-name">Key Information</label>
              <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                <div style={{ flex: 1, padding: '10px', backgroundColor: 'var(--highlight)', borderRadius: '6px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px', color: 'var(--accent)' }}>
                    <KeyRound size={16} style={{ marginRight: '8px' }} />
                    Public Key
                  </div>
                  <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>n = {publicKey.n}</div>
                  <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>e = {publicKey.e}</div>
                </div>
                
                {mode === 'decrypt' && (
                  <div style={{ flex: 1, padding: '10px', backgroundColor: 'var(--highlight)', borderRadius: '6px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px', color: 'var(--danger)' }}>
                      <Lock size={16} style={{ marginRight: '8px' }} />
                      Private Key
                    </div>
                    <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>n = {privateKey.n}</div>
                    <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>d = {privateKey.d}</div>
                  </div>
                )}
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

        <div className="methods-chapter">
          <h2 className="chapter-title">About RSA Encryption</h2>
          <div className="methods-list">
            <div className="method-item">
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', color: 'var(--accent)' }}>
                <FileText size={16} style={{ marginRight: '8px' }} />
                How It Works
              </div>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                RSA is an asymmetric encryption algorithm that uses a pair of keys: a public key for encryption 
                and a private key for decryption. This implementation uses:
              </p>
              <ul style={{ fontSize: '14px', color: 'var(--text-secondary)', paddingLeft: '20px', margin: '10px 0' }}>
                <li>Encryption: c = m<sup>e</sup> mod n</li>
                <li>Decryption: m = c<sup>d</sup> mod n</li>
              </ul>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                Where m is the message, c is the ciphertext, e and n form the public key, 
                and d and n form the private key.
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="methods-footer">
        <div className="copyright">© 2025 RSA Cipher Tool</div>
      </footer>
    </div>
  );
}