import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { LanguageProvider } from './contexts/LanguageContext'

window.configs = {
  apiUrl: 'https://7eb2b79b-b774-4746-beaf-d08eab4bf315-dev.e1-us-east-azure.choreoapis.dev/atmus/backend/v1.0/api/suggest-music',        
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </React.StrictMode>,
)