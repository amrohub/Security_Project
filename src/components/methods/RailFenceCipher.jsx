import React, { useState, useEffect } from 'react';
import { 
  Shield,
  Moon,
  Sun,
  ClipboardCopy,
  Lock,
  Unlock,
  HelpCircle,
  Plus,
  Minus
} from 'lucide-react';
import { Link } from 'react-router-dom';
import './RailFenceCipher.css';

export default function RailFenceCipher() {
  const [text, setText] = useState('');
  const [result, setResult] = useState('');
  const [mode, setMode] = useState('encrypt');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [copied, setCopied] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showVisualizer, setShowVisualizer] = useState(false);
  
  // Rail fence parameters
  const [rails, setRails] = useState(3);
  const [offset, setOffset] = useState(0);
  
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('light-mode', !isDarkMode);
  };

  useEffect(() => {
    document.body.classList.toggle('light-mode', !isDarkMode);
  }, []);

  const incrementRails = () => {
    if (rails < 10) {
      setRails(rails + 1);
    }
  };

  const decrementRails = () => {
    if (rails > 2) {
      setRails(rails - 1);
    }
  };
  
  const incrementOffset = () => {
    setOffset((offset + 1) % rails);
  };

  const decrementOffset = () => {
    setOffset((offset - 1 + rails) % rails);
  };

  // Rail fence encryption algorithm
  const encryptRailFence = (text, numRails, initialOffset) => {
    if (numRails < 2) return text;
    
    const sanitizedText = text.replace(/\s/g, '');
    if (sanitizedText.length === 0) return '';
    
    // Create empty rails
    const rails = Array(numRails).fill().map(() => []);
    
    let railIndex = initialOffset % numRails;
    let direction = railIndex === numRails - 1 ? -1 : 1;
    
    // Place each character in the appropriate rail
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      
      // Skip spaces when calculating rail position, but preserve them in output
      if (char !== ' ') {
        rails[railIndex].push(char);
        
        // Change direction when we hit the top or bottom rail
        if (railIndex === 0) direction = 1;
        else if (railIndex === numRails - 1) direction = -1;
        
        // Move to next rail
        railIndex += direction;
      } else {
        // Add space to the current rail
        rails[railIndex].push(char);
      }
    }
    
    // Read off the rails
    return rails.flat().join('');
  };

  // Rail fence decryption algorithm
  const decryptRailFence = (text, numRails, initialOffset) => {
    if (numRails < 2 || text.length === 0) return text;
    
    // Create the rail fence pattern
    const pattern = [];
    let railIndex = initialOffset % numRails;
    let direction = railIndex === numRails - 1 ? -1 : 1;
    
    // Calculate positions in the fence
    for (let i = 0; i < text.length; i++) {
      pattern.push(railIndex);
      
      // Change direction when we hit the top or bottom rail
      if (railIndex === 0) direction = 1;
      else if (railIndex === numRails - 1) direction = -1;
      
      // Move to next rail
      railIndex += direction;
    }
    
    // Count how many letters go in each rail
    const railLengths = Array(numRails).fill(0);
    pattern.forEach(rail => railLengths[rail]++);
    
    // Split the encoded text by rails
    const rails = [];
    let textPos = 0;
    
    for (let i = 0; i < numRails; i++) {
      rails.push(text.substr(textPos, railLengths[i]));
      textPos += railLengths[i];
    }
    
    // Reconstruct the original message
    let result = '';
    for (let i = 0; i < text.length; i++) {
      const rail = pattern[i];
      result += rails[rail][0];
      rails[rail] = rails[rail].substr(1);
    }
    
    return result;
  };
  
  // Create a visualization of the rail fence pattern
  const createVisualization = (text, numRails, initialOffset) => {
    if (!text || numRails < 2) return [];
    
    const grid = Array(numRails).fill().map(() => Array(text.length).fill(' '));
    let row = initialOffset % numRails;
    let direction = row === numRails - 1 ? -1 : 1;
    
    for (let col = 0; col < text.length; col++) {
      grid[row][col] = text[col];
      
      // Change direction when we hit the top or bottom rail
      if (row === 0) direction = 1;
      else if (row === numRails - 1) direction = -1;
      
      // Move to next rail
      row += direction;
    }
    
    return grid;
  };

  const handleProcess = () => {
    const processed = mode === 'encrypt' 
      ? encryptRailFence(text, rails, offset)
      : decryptRailFence(text, rails, offset);
    setResult(processed);
  };

  useEffect(() => {
    if (text.trim() !== '') {
      handleProcess();
    } else {
      setResult('');
    }
  }, [text, rails, offset, mode]);

  const handleCopy = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Visualization grid for the current text
  const visualGrid = createVisualization(text, rails, offset);

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
        <h1 className="methods-title">Rail Fence Cipher</h1>

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
            Configuration
            <button 
              className="help-button" 
              onClick={() => setShowHelp(!showHelp)}
              title="Learn about the Rail Fence Cipher"
            >
              <HelpCircle size={16} />
            </button>
          </h2>
          {showHelp && (
            <div className="help-panel">
              <p>The Rail Fence Cipher is a transposition cipher that writes your message in a zigzag pattern across a number of rows (rails), then reads off each row to produce the ciphertext.</p>
              <p><strong>Rails:</strong> The number of rows to use (2-10). More rails generally means more security.</p>
              <p><strong>Offset:</strong> Which rail to start on (0 to rails-1). This adds an extra layer of complexity.</p>
              <p>Click the "Show Visualization" button to see how your text is arranged in the rails.</p>
            </div>
          )}
          <div className="methods-list">
            <div className="method-item">
              <div className="control-row">
                <span className="param-label">Rails:</span>
                <div className="param-controls">
                  <button 
                    className="param-button" 
                    onClick={decrementRails}
                    disabled={rails <= 2}
                  >
                    <Minus size={16} />
                  </button>
                  <span className="param-value">{rails}</span>
                  <button 
                    className="param-button" 
                    onClick={incrementRails}
                    disabled={rails >= 10}
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              <div className="control-row">
                <span className="param-label">Offset:</span>
                <div className="param-controls">
                  <button 
                    className="param-button" 
                    onClick={decrementOffset}
                    disabled={offset <= 0}
                  >
                    <Minus size={16} />
                  </button>
                  <span className="param-value">{offset}</span>
                  <button 
                    className="param-button" 
                    onClick={incrementOffset}
                    disabled={offset >= rails - 1}
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              <div className="visual-toggle">
                <button 
                  className="toggle-btn"
                  onClick={() => setShowVisualizer(!showVisualizer)}
                >
                  {showVisualizer ? 'Hide Visualization' : 'Show Visualization'}
                </button>
              </div>

              {showVisualizer && text && (
                <div className="rail-visualizer">
                  {visualGrid.map((row, rowIndex) => (
                    <div key={rowIndex} className="rail-row">
                      {row.map((cell, cellIndex) => (
                        <div 
                          key={cellIndex} 
                          className={`rail-cell ${cell !== ' ' ? 'filled' : ''}`}
                        >
                          {cell}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              )}
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
        <div className="copyright">© 2025 Rail Fence Cipher Tool</div>
      </footer>
    </div>
  );
}