import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import UploadSection from './components/UploadSection';
import ResultSection from './components/ResultSection';
import Features from './components/Features';
import Footer from './components/Footer';
import './style.css';

function App() {
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleAnalysis = async (image, description) => {
    setIsProcessing(true);
    
    // Simulate API call for demo
    setTimeout(() => {
      setAnalysisResult({
        mainTrack: {
          title: "Peaceful Sunset",
          artist: "Nature Sounds",
          url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
          mood: "Calm",
          genre: "Ambient"
        },
        recommendations: [
          {
            title: "Ocean Waves",
            artist: "Relaxing Sounds",
            mood: "Serene"
          },
          {
            title: "Mountain Air",
            artist: "Nature's Best",
            mood: "Peaceful"
          }
        ]
      });
      setIsProcessing(false);
    }, 2000);
  };

  return (
    <div className="app">
      <Header />
      <div className="pt-16"> {/* Add padding to account for fixed header */}
        <Hero />
        <UploadSection onSubmit={handleAnalysis} isProcessing={isProcessing} />
        {analysisResult && <ResultSection result={analysisResult} />}
        <Features />
        <Footer />
      </div>
    </div>
  );
}

export default App;