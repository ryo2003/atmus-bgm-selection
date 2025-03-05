import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import UploadSection from './components/UploadSection';
import ResultSection from './components/ResultSection';
import Features from './components/Features';
import Footer from './components/Footer';
import './style.css';
import imageCompression from 'browser-image-compression';


function App() {
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleAnalysis = async (image, description) => {
    console.log("clicked");
    setIsProcessing(true);
  
    try {
      let base64Image = null;
  
      // Ensure the image is fully processed before sending the request
      if (image) {
        // Compress the image before converting it to base64
        const options = {
          maxSizeMB: 1,          // maximum size in MB after compression
          maxWidthOrHeight: 1024 // resize image if larger than this dimension
        };
        const compressedFile = await imageCompression(image, options);

        base64Image = await convertImageToBase64(compressedFile);
      }
  
      console.log("Submitting:", { text: description, image: base64Image ? "Yes" : "No" });

      const apiUrl = "/choreo-apis/atmus/backend/v1" 
      const devUrl  = "http://127.0.0.1:8000/api/suggest-music/"
  
      const response = await fetch("/choreo-apis/atmus/backend/v1/api/suggest-music/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: description,
          image: base64Image, // Include the Base64 image
        }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch music recommendation");
      }
  
      const data = await response.json();
      console.log("API Response:", data);
  
      if (data.background_music && data.background_music.length > 0) {
        setAnalysisResult({
          mainTrack: {
            title: data.background_music[0].title || "Generated Music",
            artist: data.background_music[0].artist || "AI Composer",
            url: data.background_music[0].url || "",  // If URL isn't provided, this remains an empty string
            mood: data.background_music[0].mood || "Unknown",
            genre: data.background_music[0].genre || "Unknown"
          },
          recommendations: data.background_music.slice(1) // Use the rest as recommendations
        });
      } else {
        // Fallback in case the background_music array is empty or missing
        setAnalysisResult(null);
      }
    } catch (error) {
      console.error("Error fetching music:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  // Convert Image to Base64 Properly
  const convertImageToBase64 = (image) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = () => resolve(reader.result.split(",")[1]); // Extract base64 data
      reader.onerror = (error) => reject(error);
    });
  };
  

  return (
    <div className="app">
      <Header />
      <div className="pt-16">
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
