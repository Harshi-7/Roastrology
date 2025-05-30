import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const MemeGenerator = () => {
  const location = useLocation();
  const roastFromResume = location.state?.roast || '';
  
  // Meme templates with multiple fallback URLs for each
  const memeTemplates = [
    {
      id: 1,
      urls: [
        'https://i.imgflip.com/4/1bij.jpg',
        'https://i.imgflip.com/1bij.jpg',
        'https://imgflip.com/i/1bij'
      ],
      labels: ['overqualified', 'experience', 'senior', 'expert', 'too much'],
      textPositions: {
        top: { x: 10, y: 20, width: 480, height: 100 },
        bottom: { x: 10, y: 300, width: 480, height: 100 }
      }
    },
    {
      id: 2,
      urls: [
        'https://i.imgflip.com/4/1bgw.jpg',
        'https://i.imgflip.com/1bgw.jpg',
        'https://imgflip.com/i/1bgw'
      ],
      labels: ['change jobs', 'new opportunity', 'career change', 'quitting', 'why'],
      textPositions: {
        top: { x: 10, y: 20, width: 480, height: 100 }
      }
    },
    {
      id: 3,
      urls: [
        'https://i.imgflip.com/4/1bhf.jpg',
        'https://i.imgflip.com/1bhf.jpg',
        'https://imgflip.com/i/1bhf'
      ],
      labels: ['skills', 'programming', 'tech', 'coding', 'developer'],
      textPositions: {
        top: { x: 10, y: 20, width: 480, height: 100 },
        bottom: { x: 10, y: 200, width: 480, height: 100 }
      }
    },
    {
      id: 4,
      urls: [
        'https://i.imgflip.com/4/1bh8.jpg',
        'https://i.imgflip.com/1bh8.jpg',
        'https://imgflip.com/i/1bh8'
      ],
      labels: ['entry level', 'no experience', 'junior', 'first job', 'student'],
      textPositions: {
        top: { x: 10, y: 20, width: 480, height: 100 }
      }
    },
    {
      id: 5,
      urls: [
        'https://i.imgflip.com/4/1bh3.jpg',
        'https://i.imgflip.com/1bh3.jpg',
        'https://imgflip.com/i/1bh3'
      ],
      labels: ['uncertain', 'not sure', 'maybe', 'doubt', 'suspect'],
      textPositions: {
        top: { x: 10, y: 20, width: 480, height: 100 },
        bottom: { x: 10, y: 200, width: 480, height: 100 }
      }
    },
    {
      id: 6,
      urls: [
        'https://i.imgflip.com/4/1bhw.jpg',
        'https://i.imgflip.com/1bhw.jpg',
        'https://imgflip.com/i/1bhw'
      ],
      labels: ['rejected', 'no', 'bad', 'negative', 'angry'],
      textPositions: {
        top: { x: 10, y: 20, width: 480, height: 100 }
      }
    },
    {
      id: 7,
      urls: [
        'https://i.imgflip.com/4/1bip.jpg',
        'https://i.imgflip.com/1bip.jpg',
        'https://imgflip.com/i/1bip'
      ],
      labels: ['problem', 'issue', 'complaint', 'rich', 'privilege'],
      textPositions: {
        top: { x: 10, y: 20, width: 480, height: 100 }
      }
    },
    {
      id: 8,
      urls: [
        'https://i.imgflip.com/4/1biv.jpg',
        'https://i.imgflip.com/1biv.jpg',
        'https://imgflip.com/i/1biv'
      ],
      labels: ['success', 'win', 'achievement', 'happy', 'positive'],
      textPositions: {
        top: { x: 10, y: 20, width: 480, height: 100 }
      }
    },
    {
      id: 9,
      urls: [
        'https://i.imgflip.com/4/1bmk.jpg',
        'https://i.imgflip.com/1bmk.jpg',
        'https://imgflip.com/i/1bmk'
      ],
      labels: ['question', 'deep', 'thought', 'philosophy', 'wonder'],
      textPositions: {
        top: { x: 10, y: 20, width: 480, height: 100 }
      }
    },
    {
      id: 10,
      urls: [
        'https://i.imgflip.com/4/1bg5.jpg',
        'https://i.imgflip.com/1bg5.jpg',
        'https://imgflip.com/i/1bg5'
      ],
      labels: ['frustration', 'why', 'angry', 'mad', 'annoyed'],
      textPositions: {
        top: { x: 10, y: 20, width: 480, height: 100 }
      }
    },
    {
      id: 11,
      urls: [
        'https://i.imgflip.com/4/1bq0.jpg',
        'https://i.imgflip.com/1bq0.jpg',
        'https://imgflip.com/i/1bq0'
      ],
      labels: ['unprofessional', 'bad', 'wrong', 'rude', 'scumbag'],
      textPositions: {
        top: { x: 10, y: 20, width: 480, height: 100 }
      }
    },
    {
      id: 12,
      urls: [
        'https://i.imgflip.com/4/1bhm.jpg',
        'https://i.imgflip.com/1bhm.jpg',
        'https://imgflip.com/i/1bhm'
      ],
      labels: ['skeptical', 'doubt', 'really', 'seriously', 'question'],
      textPositions: {
        top: { x: 10, y: 20, width: 480, height: 100 }
      }
    },
    {
      id: 13,
      urls: [
        'https://i.imgflip.com/4/1bkt.jpg',
        'https://i.imgflip.com/1bkt.jpg',
        'https://imgflip.com/i/1bkt'
      ],
      labels: ['condescending', 'smart', 'know it all', 'arrogant', 'superior'],
      textPositions: {
        top: { x: 10, y: 20, width: 480, height: 100 }
      }
    },
    {
      id: 14,
      urls: [
        'https://i.imgflip.com/4/1bkx.jpg',
        'https://i.imgflip.com/1bkx.jpg',
        'https://imgflip.com/i/1bkx'
      ],
      labels: ['business', 'professional', 'corporate', 'meeting', 'office'],
      textPositions: {
        top: { x: 10, y: 20, width: 480, height: 100 }
      }
    },
    {
      id: 15,
      urls: [
        'https://i.imgflip.com/4/1b42.jpg',
        'https://i.imgflip.com/1b42.jpg',
        'https://imgflip.com/i/1b42'
      ],
      labels: ['waiting', 'long time', 'patient', 'still', 'years'],
      textPositions: {
        top: { x: 10, y: 20, width: 480, height: 100 }
      }
    },
    {
      id: 16,
      urls: [
        'https://i.imgflip.com/4/1bh5.jpg',
        'https://i.imgflip.com/1bh5.jpg',
        'https://imgflip.com/i/1bh5'
      ],
      labels: ['unlucky', 'fail', 'bad luck', 'misfortune', 'problem'],
      textPositions: {
        top: { x: 10, y: 20, width: 480, height: 100 }
      }
    },
    {
      id: 17,
      urls: [
        'https://i.imgflip.com/4/1bim.jpg',
        'https://i.imgflip.com/1bim.jpg',
        'https://imgflip.com/i/1bim'
      ],
      labels: ['social', 'friendly', 'likeable', 'popular', 'charisma'],
      textPositions: {
        top: { x: 10, y: 20, width: 480, height: 100 }
      }
    },
    {
      id: 18,
      urls: [
        'https://i.imgflip.com/4/1bgt.jpg',
        'https://i.imgflip.com/1bgt.jpg',
        'https://imgflip.com/i/1bgt'
      ],
      labels: ['expert', 'professional', 'best', 'greatest', 'amazing'],
      textPositions: {
        top: { x: 10, y: 20, width: 480, height: 100 }
      }
    },
    {
      id: 19,
      urls: [
        'https://i.imgflip.com/4/1bh1.jpg',
        'https://i.imgflip.com/1bh1.jpg',
        'https://imgflip.com/i/1bh1'
      ],
      labels: ['student', 'college', 'university', 'graduate', 'degree'],
      textPositions: {
        top: { x: 10, y: 20, width: 480, height: 100 }
      }
    },
    {
      id: 20,
      urls: [
        'https://i.imgflip.com/4/1bhd.jpg',
        'https://i.imgflip.com/1bhd.jpg',
        'https://imgflip.com/i/1bhd'
      ],
      labels: ['facepalm', 'mistake', 'error', 'stupid', 'dumb'],
      textPositions: {
        top: { x: 10, y: 20, width: 480, height: 100 }
      }
    },
    {
      id: 21,
      urls: [
        'https://i.imgflip.com/4/1bip.jpg',
        'https://i.imgflip.com/1bip.jpg',
        'https://imgflip.com/i/1bip'
      ],
      labels: ['problem', 'issue', 'complaint', 'rich', 'privilege'],
      textPositions: {
        top: { x: 10, y: 20, width: 480, height: 100 }
      }
    },
    {
      id: 22,
      urls: [
        'https://i.imgflip.com/4/1boh.jpg',
        'https://i.imgflip.com/1boh.jpg',
        'https://imgflip.com/i/1boh'
      ],
      labels: ['giving', 'sharing', 'everyone', 'all', 'equal'],
      textPositions: {
        top: { x: 10, y: 20, width: 480, height: 100 }
      }
    },
    {
      id: 23,
      urls: [
        'https://i.imgflip.com/4/1bqf.jpg',
        'https://i.imgflip.com/1bqf.jpg',
        'https://imgflip.com/i/1bqf'
      ],
      labels: ['smart', 'wise', 'advice', 'tip', 'knowledge'],
      textPositions: {
        top: { x: 10, y: 20, width: 480, height: 100 }
      }
    },
    {
      id: 24,
      urls: [
        'https://i.imgflip.com/4/1bot.jpg',
        'https://i.imgflip.com/1bot.jpg',
        'https://imgflip.com/i/1bot'
      ],
      labels: ['executive', 'decision', 'power', 'boss', 'leader'],
      textPositions: {
        top: { x: 10, y: 20, width: 480, height: 100 }
      }
    },
    {
      id: 25,
      urls: [
        'https://i.imgflip.com/4/1bqk.jpg',
        'https://i.imgflip.com/1bqk.jpg',
        'https://imgflip.com/i/1bqk'
      ],
      labels: ['distracted', 'new', 'shiny', 'temptation', 'looking'],
      textPositions: {
        top: { x: 10, y: 20, width: 480, height: 100 },
        bottom: { x: 10, y: 200, width: 480, height: 100 }
      }
    },
    {
      id: 26,
      urls: [
        'https://i.imgflip.com/4/1bq7.jpg',
        'https://i.imgflip.com/1bq7.jpg',
        'https://imgflip.com/i/1bq7'
      ],
      labels: ['preference', 'choice', 'like', 'dislike', 'rather'],
      textPositions: {
        top: { x: 10, y: 20, width: 480, height: 100 },
        bottom: { x: 10, y: 200, width: 480, height: 100 }
      }
    },
    {
      id: 27,
      urls: [
        'https://i.imgflip.com/4/1bq9.jpg',
        'https://i.imgflip.com/1bq9.jpg',
        'https://imgflip.com/i/1bq9'
      ],
      labels: ['decision', 'choice', 'dilemma', 'pick', 'select'],
      textPositions: {
        top: { x: 10, y: 20, width: 480, height: 100 }
      }
    },
    {
      id: 28,
      urls: [
        'https://i.imgflip.com/4/1bq2.jpg',
        'https://i.imgflip.com/1bq2.jpg',
        'https://imgflip.com/i/1bq2'
      ],
      labels: ['debate', 'argument', 'opinion', 'view', 'perspective'],
      textPositions: {
        top: { x: 10, y: 20, width: 480, height: 100 }
      }
    },
    {
      id: 29,
      urls: [
        'https://i.imgflip.com/4/1bq4.jpg',
        'https://i.imgflip.com/1bq4.jpg',
        'https://imgflip.com/i/1bq4'
      ],
      labels: ['escape', 'leave', 'run', 'avoid', 'distance'],
      textPositions: {
        top: { x: 10, y: 20, width: 480, height: 100 }
      }
    },
    {
      id: 30,
      urls: [
        'https://i.imgflip.com/4/1bq6.jpg',
        'https://i.imgflip.com/1bq6.jpg',
        'https://imgflip.com/i/1bq6'
      ],
      labels: ['confused', 'mistake', 'wrong', 'misunderstanding', 'error'],
      textPositions: {
        top: { x: 10, y: 20, width: 480, height: 100 }
      }
    }
  ];

  const [selectedMeme, setSelectedMeme] = useState(null);
  const [memeTexts, setMemeTexts] = useState({ top: '', bottom: '' });
  const [generatedMemeUrl, setGeneratedMemeUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentUrlIndex, setCurrentUrlIndex] = useState(0);

  // Try to load an image with multiple fallback URLs
  const tryLoadImage = async (urls, index = 0) => {
    if (index >= urls.length) {
      throw new Error('All image URLs failed to load');
    }

    try {
      const img = new Image();
      await new Promise((resolve, reject) => {
        img.onload = () => resolve(urls[index]);
        img.onerror = () => reject(new Error(`Failed to load image: ${urls[index]}`));
        img.src = urls[index];
      });
      return urls[index];
    } catch (err) {
      console.error(`Failed to load image (attempt ${index + 1}):`, err);
      return tryLoadImage(urls, index + 1);
    }
  };

  // Extract the most savage line from the roast
  const extractSavageLine = (roast) => {
    if (!roast) return '';
    
    const lines = roast.split('\n');
    const finalVerdictIndex = lines.findIndex(line => line.includes('FINAL VERDICT'));
    
    if (finalVerdictIndex !== -1 && lines[finalVerdictIndex + 1]) {
      return lines[finalVerdictIndex + 1].trim();
    }
    
    const bulletPoints = lines.filter(line => line.trim().startsWith('-') || line.trim().startsWith('•'));
    if (bulletPoints.length > 0) {
      return bulletPoints.reduce((shortest, current) => 
        current.length < shortest.length ? current : shortest
      ).trim();
    }
    
    return lines[0] || 'Your resume has been destroyed 🔥';
  };

  // Get a random template that has working images
  const getWorkingTemplate = async (templates) => {
    if (templates.length === 0) {
      // Ultimate fallback template
      return {
        id: 999,
        urls: ['https://i.imgflip.com/4/1bij.jpg'],
        labels: ['default'],
        textPositions: {
          top: { x: 10, y: 20, width: 480, height: 100 },
          bottom: { x: 10, y: 300, width: 480, height: 100 }
        }
      };
    }

    const randomIndex = Math.floor(Math.random() * templates.length);
    const template = templates[randomIndex];
    
    try {
      const workingUrl = await tryLoadImage(template.urls);
      return { ...template, urls: [workingUrl, ...template.urls.filter(url => url !== workingUrl)] };
    } catch (err) {
      console.error(`All URLs failed for template ${template.id}`);
      // Remove the failed template and try again
      const remainingTemplates = templates.filter((_, idx) => idx !== randomIndex);
      return getWorkingTemplate(remainingTemplates);
    }
  };

  // Auto-generate meme when roast content is received
  useEffect(() => {
    if (roastFromResume) {
      const generateMeme = async () => {
        setLoading(true);
        setError(null);
        
        try {
          // Select a random savage-themed meme template
          const savageTemplates = memeTemplates.filter(template => 
            template.labels.some(label => 
              ['savage', 'brutal', 'roast', 'harsh', 'funny', 'angry'].includes(label)
            ) || [1, 6, 13, 20].includes(template.id)
          );
          
          const workingTemplate = await getWorkingTemplate(savageTemplates);
          setSelectedMeme(workingTemplate);
          
          // Set meme texts
          const savageLine = extractSavageLine(roastFromResume);
          setMemeTexts({
            top: 'Your Resume:',
            bottom: savageLine.length > 80 ? savageLine.substring(0, 80) + '...' : savageLine
          });
          
          setGeneratedMemeUrl(workingTemplate.urls[0]);
          setCurrentUrlIndex(0);
        } catch (err) {
          console.error('Error generating meme:', err);
          setError('Failed to generate meme. Please try again.');
        } finally {
          setLoading(false);
        }
      };

      generateMeme();
    }
  }, [roastFromResume]);

  const handleGenerateMeme = async () => {
    setLoading(true);
    setError(null);
    
    try {
      if (selectedMeme) {
        const workingUrl = await tryLoadImage(selectedMeme.urls);
        setGeneratedMemeUrl(workingUrl);
        setCurrentUrlIndex(selectedMeme.urls.indexOf(workingUrl));
      }
    } catch (err) {
      console.error('Error loading meme:', err);
      setError('Failed to load meme image. Please try a different template.');
    } finally {
      setLoading(false);
    }
  };

  const handleNewTemplate = async () => {
    setLoading(true);
    setError(null);
    setGeneratedMemeUrl('');
    
    try {
      // Get all templates except the current one
      const otherTemplates = memeTemplates.filter(t => 
        !selectedMeme || t.id !== selectedMeme.id
      );
      
      const newTemplate = await getWorkingTemplate(otherTemplates);
      setSelectedMeme(newTemplate);
      setCurrentUrlIndex(0);
    } catch (err) {
      console.error('Error loading new template:', err);
      setError('Failed to load new template. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const tryNextUrl = async () => {
    if (!selectedMeme || currentUrlIndex >= selectedMeme.urls.length - 1) {
      setError('No more image URLs to try for this template');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const nextUrlIndex = currentUrlIndex + 1;
      const nextUrl = selectedMeme.urls[nextUrlIndex];
      await tryLoadImage([nextUrl]);
      setGeneratedMemeUrl(nextUrl);
      setCurrentUrlIndex(nextUrlIndex);
    } catch (err) {
      console.error('Error loading next URL:', err);
      setError('Failed to load alternative image URL');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="meme-generator">
      <style jsx>{`
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
        
        .meme-generator {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          color: #fff;
          position: relative;
          z-index: 1;
        }
        
        h1 {
          color: #64ffda;
          margin-bottom: 30px;
          text-shadow: 0 0 8px rgba(100, 200, 255, 0.5);
          font-size: 1.8rem;
        }
        
        .meme-display {
          margin: 20px 0;
          padding: 30px;
          background: rgba(10, 25, 47, 0.85);
          border-radius: 15px;
          box-shadow: 0 0 30px rgba(0, 150, 255, 0.3);
          min-height: 400px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 100%;
          max-width: 600px;
          border: 1px solid rgba(100, 200, 255, 0.1);
          backdrop-filter: blur(5px);
        }
        
        .meme-display img {
          max-width: 100%;
          max-height: 400px;
          border-radius: 8px;
          object-fit: contain;
          box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
        }
        
        .meme-text-overlay {
          position: relative;
          margin-top: 15px;
          text-align: center;
          width: 100%;
        }
        
        .meme-text-overlay .top-text,
        .meme-text-overlay .bottom-text {
          font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
          font-size: 24px;
          color: white;
          text-shadow: 2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000;
          margin: 10px 0;
          padding: 5px;
        }
        
        .action-buttons {
          margin-top: 25px;
          display: flex;
          justify-content: center;
          gap: 15px;
          flex-wrap: wrap;
        }
        
        button {
          padding: 12px 25px;
          border: none;
          border-radius: 50px;
          cursor: pointer;
          font-weight: bold;
          transition: all 0.3s;
          min-width: 180px;
          font-size: 1rem;
          position: relative;
          overflow: hidden;
        }
        
        button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        
        .generate-btn {
          background: linear-gradient(45deg, #64ffda, #00ffc8);
          color: #0a192f;
          box-shadow: 0 0 15px rgba(100, 255, 218, 0.3);
        }
        
        .generate-btn:hover:not(:disabled) {
          box-shadow: 0 0 30px rgba(100, 255, 218, 0.5);
          transform: scale(1.05);
        }
        
        .new-meme-btn {
          background: linear-gradient(45deg, #0a192f, #172a45);
          color: #64ffda;
          border: 1px solid #64ffda;
        }
        
        .new-meme-btn:hover:not(:disabled) {
          background: rgba(100, 255, 218, 0.1);
          box-shadow: 0 0 15px rgba(100, 255, 218, 0.3);
        }
        
        .retry-btn {
          background: rgba(255, 42, 42, 0.2);
          color: #ff6e6e;
          border: 1px solid rgba(255, 42, 42, 0.5);
        }
        
        .retry-btn:hover:not(:disabled) {
          background: rgba(255, 42, 42, 0.3);
        }
        
        .back-btn {
          background: linear-gradient(45deg, #0a192f, #172a45);
          color: #64ffda;
          text-decoration: none;
          padding: 12px 25px;
          border-radius: 50px;
          display: inline-block;
          margin-top: 25px;
          font-weight: bold;
          border: 1px solid #64ffda;
          transition: all 0.3s;
        }
        
        .back-btn:hover {
          background: rgba(100, 255, 218, 0.1);
          box-shadow: 0 0 15px rgba(100, 255, 218, 0.3);
        }
        
        .loading {
          font-size: 18px;
          color: #64ffda;
          margin: 20px 0;
          font-weight: bold;
        }
        
        .error-message {
          color: #ff6e6e;
          font-weight: bold;
          margin: 20px 0;
          padding: 15px;
          background: rgba(255, 42, 42, 0.2);
          border-radius: 10px;
          border: 1px solid rgba(255, 42, 42, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 15px;
          flex-wrap: wrap;
        }
        
        .image-placeholder {
          width: 100%;
          height: 400px;
          display: flex;
          justify-content: center;
          align-items: center;
          background: rgba(100, 255, 218, 0.05);
          border-radius: 8px;
          color: #a8b2d1;
          font-size: 1.1rem;
          border: 2px dashed #64ffda;
        }
        
        .url-info {
          font-size: 12px;
          color: #ccd6f6;
          margin-top: 10px;
        }
        
        .no-roast {
          text-align: center;
          padding: 30px;
          background: rgba(10, 25, 47, 0.85);
          border-radius: 15px;
          box-shadow: 0 0 30px rgba(0, 150, 255, 0.3);
          border: 1px solid rgba(100, 200, 255, 0.1);
        }
        
        .no-roast p {
          color: #ccd6f6;
          margin-bottom: 20px;
        }
      `}</style>

      <div className="stars">
        {[...Array(100)].map((_, i) => (
          <div 
            key={i} 
            className="star" 
            style={{
              width: `${Math.random() * 3}px`,
              height: `${Math.random() * 3}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 7}s`
            }}
          />
        ))}
      </div>

      <h1>🔥 Resume Roast Meme 🔥</h1>
      
      {!roastFromResume ? (
        <div className="no-roast">
          <p>No roast content found. Please generate a roast first.</p>
          <a href="/" className="back-btn">← Back to Roaster</a>
        </div>
      ) : (
        <>
          {error && (
            <div className="error-message">
              {error}
              {selectedMeme && currentUrlIndex < selectedMeme.urls.length - 1 && (
                <button 
                  onClick={tryNextUrl}
                  className="retry-btn"
                  disabled={loading}
                >
                  Try Next URL
                </button>
              )}
            </div>
          )}
          
          <div className="meme-display">
            {loading ? (
              <div className="image-placeholder">Loading meme...</div>
            ) : generatedMemeUrl ? (
              <>
                <img 
                  src={generatedMemeUrl} 
                  alt="Generated meme" 
                  onError={(e) => {
                    console.error('Image load error:', e);
                    setError('Failed to load image. Click "Try Next URL" to attempt an alternative.');
                  }}
                />
                <div className="meme-text-overlay">
                  <div className="top-text">{memeTexts.top}</div>
                  <div className="bottom-text">{memeTexts.bottom}</div>
                </div>
              </>
            ) : (
              <div className="image-placeholder">
                {selectedMeme ? 'Click "Generate Meme" to create your roast!' : 'Select a meme template'}
              </div>
            )}
          </div>
          
          <div className="action-buttons">
            <button 
              onClick={handleGenerateMeme}
              className="generate-btn"
              disabled={!selectedMeme || loading}
            >
              {loading ? 'Generating...' : 'Generate Meme'}
            </button>
            
            <button 
              onClick={handleNewTemplate}
              className="new-meme-btn"
              disabled={loading}
            >
              New Template
            </button>
          </div>
          
          <a href="/" className="back-btn">Let's Pretend This Never Happened 🥂</a>
        </>
      )}
    </div>
  );
};

export default MemeGenerator;