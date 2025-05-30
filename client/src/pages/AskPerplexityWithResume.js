
import React, { useState, useEffect, useRef } from 'react';
import mammoth from 'mammoth';
import { useNavigate } from 'react-router-dom';

const PERPLEXITY_API_URL = 'https://api.perplexity.ai/chat/completions';
const API_KEY = process.env.REACT_APP_API_KEY;
console.log(API_KEY)

const AskPerplexityWithResume = () => {
  const [resumeText, setResumeText] = useState('');
  const [roastRaw, setRoastRaw] = useState('');
  const [displayRoast, setDisplayRoast] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fileName, setFileName] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const navigate = useNavigate();
  const roastRef = useRef(null);

  // Generate 50 stars with deterministic positions
  const generateStars = () => {
    const stars = [];
    const columns = 10;
    const rows = 5;
    
    for (let i = 0; i < 50; i++) {
      const col = i % columns;
      const row = Math.floor(i / columns);
      const left = (100 / (columns + 1)) * (col + 1) + (Math.sin(i) * 2);
      const top = (100 / (rows + 1)) * (row + 1) + (Math.cos(i * 0.7) * 2);
      const size = 1 + (i % 3) * 0.5;
      const delay = (i % 6) * 0.3;
      const duration = 3 + (i % 4);
      
      stars.push(
        <div 
          key={`star-${i}`}
          className="star"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            left: `${left}%`,
            top: `${top}%`,
            animationDelay: `${delay}s`,
            animationDuration: `${duration}s`
          }}
        />
      );
    }
    return stars;
  };

  // Typewriter effect for roast output
  useEffect(() => {
    if (!roastRaw) {
      setDisplayRoast('');
      return;
    }

    let i = 0;
    setDisplayRoast('');
    const interval = setInterval(() => {
      setDisplayRoast((prev) => prev + roastRaw.charAt(i));
      i++;
      if (i >= roastRaw.length) clearInterval(interval);
    }, 20);

    return () => clearInterval(interval);
  }, [roastRaw]);

     const cleanText = (text) => {
     return text
       .replace(/[*#]/g, '') // Remove asterisks and hashes
       .replace(/\s+/g, ' ') // Replace multiple spaces with a single space
       .replace(/\[\d+\]/g, '') // Remove numbers in brackets like [1][2]
       .trim(); // Trim leading and trailing spaces
   };
   

  const readDocxFile = async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const { value } = await mammoth.extractRawText({ arrayBuffer });
    if (!value.trim()) throw new Error('DOCX appears to be empty');
    return value;
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (!file) return;
    if (file.name.split('.').pop().toLowerCase() !== 'docx') {
      setError('Only DOCX files supported.');
      return;
    }
    setError('');
    setRoastRaw('');
    setResumeText('');
    setFileName('');

    try {
      const text = await readDocxFile(file);
      setResumeText(text);
      setFileName(file.name);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleFileChange = async (e) => {
    setError('');
    setRoastRaw('');
    setResumeText('');
    const file = e.target.files[0];
    if (!file) return;
    if (file.name.split('.').pop().toLowerCase() !== 'docx') {
      setError('Only DOCX files supported.');
      return;
    }
    try {
      const text = await readDocxFile(file);
      setResumeText(text);
      setFileName(file.name);
    } catch (err) {
      setError(err.message);
    }
  };

  const roastResume = async () => {
    if (!resumeText) {
      setError('Please upload your resume first.');
      return;
    }
    setLoading(true);
    setError('');
    setRoastRaw('');
    setDisplayRoast('');

    const prompt = `You are the most brutally honest, savage resume roaster imaginable. 
Roast this resume mercilessly pointing out every flaw, weakness, and ridiculous element. 
Be extremely harsh, sarcastic, and funny. Highlight:
- Terrible formatting choices
- Useless buzzwords
- Overinflated achievements
- Missing crucial information
- Anything else laughable

Resume content: ${resumeText.substring(0, 3000)}

Respond in this exact format:
🔥 SAVAGE ROAST 🔥
[Brutally honest roast in bullet points, each savage and hilarious]
💀 FINAL VERDICT 💀
[Most brutal one-line conclusion]`;

    try {
      const res = await fetch(PERPLEXITY_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          model: 'sonar',
          messages: [
            {
              role: 'system',
              content:
                'You are Resume Roaster 9000 - brutally honest AI with savage humor.',
            },
            { role: 'user', content: prompt },
          ],
          max_tokens: 500,
          temperature: 0.9,
          top_p: 0.95,
        }),
      });

      const data = await res.json();
      const rawText = data.choices?.[0]?.message?.content || 'Failed to generate roast';
      setRoastRaw(cleanText(rawText));
    } catch (err) {
      setError('Error roasting resume: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const generateMemeFromRoast = () => {
    if (!roastRaw) return;
    navigate('/meme-generator', { state: { roast: roastRaw } });
  };

  return (
    <>
      <style>{`
        @keyframes twinkle {
          0% { opacity: 0.2; }
          50% { opacity: 1; }
          100% { opacity: 0.2; }
        }
        
        .stars {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(ellipse at bottom, #1B2735 0%, #090A0F 100%);
          overflow: hidden;
          z-index: -1;
        }
        
        .star {
          position: absolute;
          background: white;
          border-radius: 50%;
          animation: twinkle 5s infinite;
        }
        
        body, .upload-page {
          margin: 0; 
          padding: 0; 
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #fff;
        }
        
        .upload-container {
          background: rgba(10, 25, 47, 0.85);
          border-radius: 20px;
          padding: 30px 40px;
          width: 100%;
          max-width: 480px;
          box-shadow: 0 0 30px rgba(0, 150, 255, 0.3);
          text-align: center;
          border: 1px solid rgba(100, 200, 255, 0.1);
          backdrop-filter: blur(5px);
        }
        
        h1 {
          font-size: 1.6rem;
          margin-bottom: 10px;
          text-shadow: 0 0 8px rgba(100, 200, 255, 0.5);
          color: #64ffda;
        }
        
        p.subtitle {
          margin-bottom: 30px;
          font-weight: 600;
          letter-spacing: 0.05em;
          color: #ccd6f6;
        }
        
        .drop-zone {
          border: 3px dashed #64ffda;
          padding: 40px;
          border-radius: 15px;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          user-select: none;
          background: rgba(100, 255, 218, 0.05);
        }
        
        .drop-zone:hover {
          background-color: rgba(100, 255, 218, 0.1);
          box-shadow: 0 0 15px rgba(100, 255, 218, 0.3);
        }
        
        .drop-zone.dragging {
          background-color: rgba(100, 255, 218, 0.15);
          box-shadow: 0 0 25px rgba(100, 255, 218, 0.4);
          border-color: #64ffda;
        }
        
        .upload-icon {
          font-size: 3.6rem;
          margin-bottom: 15px;
          animation: pulseIcon 2s ease infinite;
          color: #64ffda;
        }
        
        @keyframes pulseIcon {
          0%, 100% { transform: scale(1); color: #64ffda; }
          50% { transform: scale(1.2); color: #00ffc8; }
        }
        
        .drop-zone p {
          margin: 0;
          font-weight: 600;
          font-size: 1.1rem;
          color: #a8b2d1;
        }
        
        .drop-zone .small {
          font-size: 0.85rem;
          color: #64ffda;
          margin-top: 6px;
          font-weight: 400;
        }
        
        .file-preview {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 15px;
          font-weight: 700;
          font-size: 1.1rem;
          color: #a8b2d1;
          animation: slideInFile 0.6s ease forwards;
        }
        
        @keyframes slideInFile {
          from { opacity: 0; transform: translateX(-20px);}
          to { opacity: 1; transform: translateX(0);}
        }
        
        .file-icon {
          font-size: 2.2rem;
          color: #64ffda;
        }
        
        .error-message {
          margin-top: 15px;
          background: rgba(255, 42, 42, 0.2);
          padding: 12px;
          border-radius: 10px;
          font-weight: 700;
          border: 1px solid rgba(255, 42, 42, 0.5);
          user-select: none;
          animation: shake 0.3s ease;
          color: #ff6e6e;
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-8px); }
          40%, 80% { transform: translateX(8px); }
        }
        
        .submit-btn {
          margin-top: 25px;
          padding: 15px 35px;
          font-size: 1.3rem;
          border: none;
          border-radius: 50px;
          font-weight: 900;
          color: #0a192f;
          background: linear-gradient(45deg, #64ffda, #00ffc8);
          cursor: pointer;
          box-shadow: 0 0 15px rgba(100, 255, 218, 0.3);
          transition: all 0.3s ease;
          user-select: none;
          position: relative;
          overflow: hidden;
        }
        
        .submit-btn:disabled {
          background: #1f7a6d;
          color: rgba(10, 25, 47, 0.5);
          cursor: not-allowed;
          box-shadow: none;
        }
        
        .submit-btn:hover:not(:disabled) {
          box-shadow: 0 0 30px rgba(100, 255, 218, 0.5);
          transform: scale(1.05);
        }
        
        .submit-btn::after {
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0; left: 0;
          background: linear-gradient(270deg, transparent, rgba(255,255,255,0.3), transparent);
          transform: translateX(-100%);
          transition: transform 0.5s ease;
          pointer-events: none;
        }
        
        .submit-btn:hover::after:not(:disabled) {
          transform: translateX(100%);
        }
        
        .loading-text {
          font-weight: 900;
          letter-spacing: 0.12em;
          color: #0a192f;
        }
        
        .dots::after {
          content: '';
          animation: dots 1.5s steps(3) infinite;
          display: inline-block;
          width: 1em;
          text-align: left;
        }
        
        @keyframes dots {
          0%, 20% { content: ''; }
          40% { content: '.'; }
          60% { content: '..'; }
          80%, 100% { content: '...'; }
        }

        .roast-result {
          margin-top: 30px;
          background: rgba(10, 25, 47, 0.7);
          border-radius: 15px;
          padding: 20px 25px;
          max-height: 320px;
          overflow-y: auto;
          font-family: 'Courier New', Courier, monospace;
          font-size: 1rem;
          color: #ccd6f6;
          white-space: pre-wrap;
          box-shadow: 0 0 20px rgba(100, 255, 218, 0.2);
          user-select: text;
          line-height: 1.5;
          border: 1px solid rgba(100, 200, 255, 0.1);
        }
        
        .roast-result::-webkit-scrollbar {
          width: 8px;
        }
        
        .roast-result::-webkit-scrollbar-track {
          background: rgba(10, 25, 47, 0.3);
          border-radius: 10px;
        }
        
        .roast-result::-webkit-scrollbar-thumb {
          background: #64ffda;
          border-radius: 10px;
        }
        
        .roast-result::-webkit-scrollbar-thumb:hover {
          background: #00ffc8;
        }
        
        .meme-btn {
          margin-top: 20px;
          padding: 12px 25px;
          font-size: 1rem;
          border: none;
          border-radius: 50px;
          font-weight: 700;
          color: #0a192f;
          background: linear-gradient(45deg, #ff64b4, #ff00aa);
          cursor: pointer;
          box-shadow: 0 0 15px rgba(255, 100, 180, 0.3);
          transition: all 0.3s ease;
          user-select: none;
        }
        
        .meme-btn:hover {
          box-shadow: 0 0 25px rgba(255, 100, 180, 0.5);
          transform: scale(1.05);
        }
      `}</style>

      <div className="stars">
        {generateStars()}
      </div>

      <div className="upload-page">
        <div className="upload-container">
          <h1>🔥 RESUME DESTROYER 9000 🔥</h1>
          <p className="subtitle">Upload your resume for a brutally honest roast</p>

          <div
            className={`drop-zone ${isDragging ? 'dragging' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => document.getElementById('docx-upload').click()}
            aria-label="Drop your DOCX resume here or click to upload"
          >
            <input
              type="file"
              id="docx-upload"
              accept=".docx"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
            {fileName ? (
              <div className="file-preview">
                <span role="img" aria-label="document" className="file-icon">
                  📄
                </span>
                <span className="file-name">{fileName}</span>
              </div>
            ) : (
              <>
                <div className="upload-icon">⬆️</div>
                <p>Drag & drop your DOCX resume here</p>
                <p className="small">or click to browse</p>
              </>
            )}
          </div>

          {error && <div className="error-message">⚠️ {error}</div>}

          {resumeText && (
            <button
              onClick={roastResume}
              disabled={loading}
              className="submit-btn"
              aria-live="polite"
              aria-busy={loading}
            >
              {loading ? (
                <span className="loading-text">
                  PREPARING BRUTAL ROAST<span className="dots" />
                </span>
              ) : (
                'DESTROY MY RESUME'
              )}
            </button>
          )}

          {displayRoast && (
            <>
              <pre
                className="roast-result"
                ref={roastRef}
                aria-live="polite"
                aria-atomic="true"
              >
                {displayRoast}
              </pre>
              <button 
                onClick={generateMemeFromRoast}
                className="meme-btn"
              >
                🎭 GENERATE MEME FROM THIS ROAST
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default AskPerplexityWithResume;