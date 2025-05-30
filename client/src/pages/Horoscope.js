import React, { useState } from 'react';
import mammoth from 'mammoth';

const PERPLEXITY_API_URL = 'https://api.perplexity.ai/chat/completions';
const API_KEY = process.env.REACT_APP_API_KEY;
console.log(API_KEY)

const Horoscope = () => {
  const [resumeText, setResumeText] = useState('');
  const [horoscope, setHoroscope] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fileName, setFileName] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  // Generate stars background
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
    setHoroscope('');
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
    setHoroscope('');
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

  const generateSavageHoroscope = async () => {
    if (!resumeText) {
      setError('Please upload your resume first.');
      return;
    }
    setLoading(true);
    setError('');
    setHoroscope('');

    const prompt = `Generate a savage horoscope based on this resume. 
    Be brutally honest and highlight any weaknesses or limitations. 
    Respond only with the horoscope, without any introductory phrases or context. 
    Resume content: ${resumeText.substring(0, 3000)}`;

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
              content: 'You are a brutally honest horoscope generator.',
            },
            { role: 'user', content: prompt },
          ],
          max_tokens: 100, // Limit response to about 4 sentences
          temperature: 0.8,
        }),
      });

      const data = await res.json();
      const rawText = data.choices?.[0]?.message?.content || 'Failed to generate horoscope';
      setHoroscope(cleanText(rawText));
    } catch (err) {
      setError('Error generating horoscope: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const cleanText = (text) => {
    return text.replace(/[*#]/g, '').replace(/\s+/g, ' ').trim();
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
        }
        
        .submit-btn:disabled {
          background: #1f7a6d;
          color: rgba(10, 25, 47, 0.5);
          cursor: not-allowed;
          box-shadow: none;
        }
        
        .horoscope-result {
          margin-top: 30px;
          background: rgba(10, 25, 47, 0.7);
          border-radius: 15px;
          padding: 20px;
          font-size: 1rem;
          color: #ccd6f6;
          white-space: pre-wrap;
          box-shadow: 0 0 20px rgba(100, 255, 218, 0.2);
          line-height: 1.6;
          text-align: left;
          border: 1px solid rgba(100, 200, 255, 0.1);
        }
      `}</style>

      <div className="stars">
        {generateStars()}
      </div>

      <div className="upload-page">
        <div className="upload-container">
          <h1>🔮 SAVAGE HOROSCOPE GENERATOR 🔮</h1>
          <p className="subtitle">Upload your resume for a brutally honest horoscope</p>

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
              onClick={generateSavageHoroscope}
              disabled={loading}
              className="submit-btn"
            >
              {loading ? 'ANALYZING WEAKNESSES...' : 'GET HOROSCOPE'}
            </button>
          )}

          {horoscope && (
            <div className="horoscope-result">
              {horoscope}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Horoscope;
