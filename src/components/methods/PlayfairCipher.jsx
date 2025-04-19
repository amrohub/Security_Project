import React, { useState, useEffect } from 'react';
import { 
  Shield,
  Moon,
  Sun,
  ClipboardCopy,
  Lock,
  Unlock,
  HelpCircle,
  RefreshCcw
} from 'lucide-react';
import { Link } from 'react-router-dom';
import './PlayfairCipher.css';

export default function PlayfairCipher() {
  const [plaintext, setPlaintext] = useState('');
  const [result, setResult] = useState('');
  const [mode, setMode] = useState('encrypt');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [copied, setCopied] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [keyword, setKeyword] = useState('CRYPTOGRAPHY');
  
  // J is traditionally merged with I in Playfair
  const alphabet = 'ABCDEFGHIKLMNOPQRSTUVWXYZ'; // No J
  const [matrix, setMatrix] = useState([]);
  
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('light-mode', !isDarkMode);
  };

  useEffect(() => {
    document.body.classList.toggle('light-mode', !isDarkMode);
  }, []);

  // Generate the Playfair matrix from the keyword
  const generateMatrix = (key) => {
    // Sanitize the keyword: uppercase, remove J, remove duplicates
    let sanitizedKey = key.toUpperCase().replace(/J/g, 'I').replace(/[^A-Z]/g, '');
    
    // Remove duplicate letters from the keyword
    let uniqueChars = '';
    for (let char of sanitizedKey) {
      if (!uniqueChars.includes(char)) {
        uniqueChars += char;
      }
    }
    
    // Create the complete key by appending remaining alphabet letters
    let completeKey = uniqueChars;
    for (let char of alphabet) {
      if (!completeKey.includes(char)) {
        completeKey += char;
      }
    }
    
    // Create a 5x5 matrix from the key
    let newMatrix = [];
    for (let i = 0; i < 5; i++) {
      newMatrix.push(completeKey.substring(i * 5, (i + 1) * 5).split(''));
    }
    
    return newMatrix;
  };

  // Find position of a letter in the matrix
  const findPosition = (matrix, letter) => {
    const sanitizedLetter = letter === 'J' ? 'I' : letter;
    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 5; col++) {
        if (matrix[row][col] === sanitizedLetter) {
          return { row, col };
        }
      }
    }
    return null;
  };
  
  // Prepare text for Playfair encryption
  const prepareText = (text) => {
    // Convert to uppercase, replace J with I, remove non-letter characters
    let prepared = text.toUpperCase().replace(/J/g, 'I').replace(/[^A-Z]/g, '');
    
    // Handle repeated letters by inserting 'X' between them
    let result = '';
    for (let i = 0; i < prepared.length; i += 2) {
      const current = prepared[i];
      const next = i + 1 < prepared.length ? prepared[i + 1] : null;
      
      result += current;
      
      if (next === null) {
        // Add an 'X' if there's an odd number of characters
        result += 'X';
      } else if (current === next) {
        // Insert 'X' between double letters
        result += 'X';
        i--; // Process the next letter again
      } else {
        result += next;
      }
    }
    
    return result;
  };

  // Encrypt using Playfair cipher
  const encrypt = (text) => {
    const prepared = prepareText(text);
    let encrypted = '';
    
    for (let i = 0; i < prepared.length; i += 2) {
      const char1 = prepared[i];
      const char2 = prepared[i + 1];
      
      const pos1 = findPosition(matrix, char1);
      const pos2 = findPosition(matrix, char2);
      
      let newChar1, newChar2;
      
      if (pos1.row === pos2.row) {
        // Same row - take letters to the right (wrapping around)
        newChar1 = matrix[pos1.row][(pos1.col + 1) % 5];
        newChar2 = matrix[pos2.row][(pos2.col + 1) % 5];
      } else if (pos1.col === pos2.col) {
        // Same column - take letters below (wrapping around)
        newChar1 = matrix[(pos1.row + 1) % 5][pos1.col];
        newChar2 = matrix[(pos2.row + 1) % 5][pos2.col];
      } else {
        // Form a rectangle - take letters at the opposite corners
        newChar1 = matrix[pos1.row][pos2.col];
        newChar2 = matrix[pos2.row][pos1.col];
      }
      
      encrypted += newChar1 + newChar2;
    }
    
    return encrypted;
  };

  // Decrypt using Playfair cipher
  const decrypt = (text) => {
    // Clean the input: uppercase and remove non-letters
    const cleaned = text.toUpperCase().replace(/[^A-Z]/g, '');
    
    // Ensure even number of characters
    const prepared = cleaned.length % 2 !== 0 ? cleaned + 'X' : cleaned;
    let decrypted = '';
    
    for (let i = 0; i < prepared.length; i += 2) {
      const char1 = prepared[i];
      const char2 = prepared[i + 1];
      
      const pos1 = findPosition(matrix, char1);
      const pos2 = findPosition(matrix, char2);
      
      let newChar1, newChar2;
      
      if (pos1.row === pos2.row) {
        // Same row - take letters to the left (wrapping around)
        newChar1 = matrix[pos1.row][(pos1.col - 1 + 5) % 5];
        newChar2 = matrix[pos2.row][(pos2.col - 1 + 5) % 5];
      } else if (pos1.col === pos2.col) {
        // Same column - take letters above (wrapping around)
        newChar1 = matrix[(pos1.row - 1 + 5) % 5][pos1.col];
        newChar2 = matrix[(pos2.row - 1 + 5) % 5][pos2.col];
      } else {
        // Form a rectangle - take letters at the opposite corners
        newChar1 = matrix[pos1.row][pos2.col];
        newChar2 = matrix[pos2.row][pos1.col];
      }
      
      decrypted += newChar1 + newChar2;
    }
    
    return decrypted;
  };

  const handleProcess = () => {
    if (!plaintext.trim()) {
      setResult('');
      return;
    }
    
    const processed = mode === 'encrypt' 
      ? encrypt(plaintext)
      : decrypt(plaintext);
    
    setResult(processed);
  };

  const handleKeywordChange = (e) => {
    const newKeyword = e.target.value;
    setKeyword(newKeyword);
    setMatrix(generateMatrix(newKeyword));
  };

  const generateRandomKeyword = () => {
    const words = ['CRYPTOGRAPHY', 'SECURITY', 'PLAYFAIR', 'ENCRYPTION', 'BLOCKCHAIN', 
                  'QUANTUM', 'MATRIX', 'KEYWORD', 'ALGORITHM', 'NETWORK', 'PROTOCOL'];
    const randomWord = words[Math.floor(Math.random() * words.length)];
    setKeyword(randomWord);
    setMatrix(generateMatrix(randomWord));
  };

  useEffect(() => {
    // Initialize matrix with default keyword
    setMatrix(generateMatrix(keyword));
  }, []);

  useEffect(() => {
    handleProcess();
  }, [plaintext, keyword, mode]);

  const handleCopy = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Display the matrix with letter positions
  const renderMatrix = () => {
    return (
      <div className="playfair-matrix">
        {matrix.map((row, rowIndex) => (
          <div key={rowIndex} className="matrix-row">
            {row.map((cell, colIndex) => (
              <div key={colIndex} className="matrix-cell">
                {cell}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
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
        <h1 className="methods-title">Playfair Cipher</h1>

        <div className="methods-chapter">
          <h2 className="chapter-title">
            About Playfair
            <button 
              className="help-button" 
              onClick={() => setShowHelp(!showHelp)}
              title="Learn about the Playfair Cipher"
            >
              <HelpCircle size={16} />
            </button>
          </h2>
          {showHelp && (
            <div className="help-panel">
              <p>The Playfair cipher is a manual symmetric encryption technique that uses a 5×5 grid of letters constructed from a keyword.</p>
              <p><strong>Key Rules:</strong></p>
              <ul>
                <li>Letters 'I' and 'J' are usually combined into a single cell.</li>
                <li>The cipher encrypts pairs of letters (digraphs).</li>
                <li>For pairs in the same row, take the letters to the right (wrapping around).</li>
                <li>For pairs in the same column, take the letters below (wrapping around).</li>
                <li>For pairs in different rows and columns, form a rectangle and take the letters on the same row but at the corners.</li>
              </ul>
              <p>Repeated letters in the input text are separated with a filler letter (usually 'X').</p>
            </div>
          )}
        </div>

        <div className="methods-chapter">
          <h2 className="chapter-title">Keyword</h2>
          <div className="methods-list">
            <div className="method-item">
              <div className="key-input-container">
                <input
                  type="text"
                  placeholder="Enter keyword to generate 5x5 matrix"
                  value={keyword}
                  onChange={handleKeywordChange}
                  className="key-input"
                  spellCheck="false"
                />
                <button 
                  className="random-key-btn"
                  onClick={generateRandomKeyword}
                  title="Generate random keyword"
                >
                  <RefreshCcw size={16} />
                </button>
              </div>
              
              <div className="matrix-container">
                <div className="matrix-title">5x5 Playfair Matrix (I and J are combined)</div>
                {renderMatrix()}
              </div>
            </div>
          </div>
        </div>

        <div className="methods-chapter">
          <h2 className="chapter-title">Operation Mode</h2>
          <div className="methods-list">
            <div className="method-item">
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
          <h2 className="chapter-title">Input</h2>
          <div className="methods-list">
            <div className="method-item">
              <textarea
                placeholder={mode === 'encrypt' 
                  ? "Enter text to encrypt (J will be replaced with I, and spaces/punctuation will be removed)"
                  : "Enter ciphertext to decrypt"}
                value={plaintext}
                onChange={(e) => setPlaintext(e.target.value)}
                rows={3}
              />
              
              {mode === 'encrypt' && plaintext.trim() !== '' && (
                <div className="prepared-text">
                  <div className="prepared-title">Prepared Text:</div>
                  <div className="prepared-content">{prepareText(plaintext)}</div>
                </div>
              )}
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
        <div className="copyright">© 2025 Playfair Cipher Tool</div>
      </footer>
    </div>
  );
}