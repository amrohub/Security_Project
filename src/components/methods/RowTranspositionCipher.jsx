import React, { useState, useEffect } from 'react';
import { 
  Shield,
  Moon,
  Sun,
  ClipboardCopy,
  Grid,
  Table
} from 'lucide-react';
import { Link } from 'react-router-dom';
import './BaseStyle.css';

export default function RowTranspositionCipher() {
  const [text, setText] = useState('');
  const [key, setKey] = useState('3142');
  const [result, setResult] = useState('');
  const [mode, setMode] = useState('encrypt');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [copied, setCopied] = useState(false);

  const encrypt = (text, key) => {
    // Remove spaces from text for consistency
    const cleanText = text.replace(/\s/g, '');
    if (!cleanText || !key) return '';
    
    // Convert key to array of integers and validate
    const keyArray = key.split('').map(Number);
    
    // Check if the key contains valid positions
    const isValidKey = keyArray.every((num) => !isNaN(num) && num > 0 && num <= keyArray.length);
    const hasAllPositions = new Set(keyArray).size === keyArray.length;
    
    if (!isValidKey || !hasAllPositions) {
      return 'Error: Key must contain unique numbers from 1 to key length';
    }
    
    // Convert key to 0-indexed for array operations
    const zeroIndexedKey = keyArray.map(num => num - 1);
    
    // Calculate dimensions
    const keyLength = keyArray.length;
    const numRows = Math.ceil(cleanText.length / keyLength);
    
    // Create the grid
    const grid = [];
    for (let i = 0; i < numRows; i++) {
      const row = [];
      for (let j = 0; j < keyLength; j++) {
        const index = i * keyLength + j;
        row.push(index < cleanText.length ? cleanText[index] : '');
      }
      grid.push(row);
    }
    
    // Read the columns in the order defined by the numeric key
    let encryptedText = '';
    for (let i = 0; i < keyLength; i++) {
      const columnIndex = zeroIndexedKey.indexOf(i);
      for (let j = 0; j < numRows; j++) {
        if (grid[j][columnIndex]) {
          encryptedText += grid[j][columnIndex];
        }
      }
    }
    
    return encryptedText;
  };

  const decrypt = (encryptedText, key) => {
    if (!encryptedText || !key) return '';
    
    // Convert key to array of integers and validate
    const keyArray = key.split('').map(Number);
    
    // Check if the key contains valid positions
    const isValidKey = keyArray.every((num) => !isNaN(num) && num > 0 && num <= keyArray.length);
    const hasAllPositions = new Set(keyArray).size === keyArray.length;
    
    if (!isValidKey || !hasAllPositions) {
      return 'Error: Key must contain unique numbers from 1 to key length';
    }
    
    // Convert key to 0-indexed for array operations
    const zeroIndexedKey = keyArray.map(num => num - 1);
    
    // Calculate dimensions of the grid
    const keyLength = keyArray.length;
    const numRows = Math.ceil(encryptedText.length / keyLength);
    const totalCells = numRows * keyLength;
    
    // Calculate the number of filled cells in the last row
    const filledCells = encryptedText.length % keyLength;
    const lastRowCells = filledCells === 0 ? keyLength : filledCells;
    
    // Calculate the column lengths
    const columnLengths = Array(keyLength).fill(numRows);
    if (encryptedText.length < totalCells) {
      for (let i = lastRowCells; i < keyLength; i++) {
        const columnIndex = zeroIndexedKey.indexOf(i);
        if (columnIndex !== -1) {
          columnLengths[columnIndex]--;
        }
      }
    }
    
    // Create the grid for decryption
    const grid = Array(numRows).fill().map(() => Array(keyLength).fill(''));
    let textIndex = 0;
    
    // Fill the grid column by column according to the key
    for (let i = 0; i < keyLength; i++) {
      const columnIndex = zeroIndexedKey.indexOf(i);
      for (let j = 0; j < columnLengths[columnIndex]; j++) {
        if (textIndex < encryptedText.length) {
          grid[j][columnIndex] = encryptedText[textIndex++];
        }
      }
    }
    
    // Read the decrypted text row by row
    let decryptedText = '';
    for (let i = 0; i < numRows; i++) {
      for (let j = 0; j < keyLength; j++) {
        if (grid[i][j]) {
          decryptedText += grid[i][j];
        }
      }
    }
    
    return decryptedText;
  };

  const handleProcess = () => {
    if (mode === 'encrypt') {
      setResult(encrypt(text, key));
    } else {
      setResult(decrypt(text, key));
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('light-mode', !isDarkMode);
  };

  useEffect(() => {
    document.body.classList.toggle('light-mode', !isDarkMode);
  }, []);

  useEffect(() => {
    if (text.trim() !== '' && key.trim() !== '') {
      handleProcess();
    } else {
      setResult('');
    }
  }, [text, key, mode]);

  const handleCopy = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const validateKey = (value) => {
    // Only allow numbers in the key
    const cleaned = value.replace(/[^0-9]/g, '');
    
    // Ensure all digits are between 1 and the key length
    // We don't strictly enforce this during typing to allow for flexibility
    return cleaned;
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
        <h1 className="methods-title">Row Transposition Cipher</h1>

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
              <label className="method-name">Numeric Key</label>
              <input
                type="text"
                placeholder="Enter key (e.g., 3142)"
                value={key}
                onChange={(e) => setKey(validateKey(e.target.value))}
              />
              <div className="key-hint">
                Enter a sequence of unique numbers from 1 to key length
              </div>
            </div>

            <div className="method-item">
              <label className="method-name">Operation Mode</label>
              <div className="operation-buttons">
                <button
                  onClick={() => setMode('encrypt')}
                  className={`operation-button ${mode === 'encrypt' ? 'active' : ''}`}
                >
                  <Grid size={16} />
                  Encrypt
                </button>
                <button
                  onClick={() => setMode('decrypt')}
                  className={`operation-button ${mode === 'decrypt' ? 'active' : ''}`}
                >
                  <Table size={16} />
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
        <div className="copyright">© 2025 Row Transposition Cipher Tool</div>
      </footer>
    </div>
  );
}