import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="inline-flex items-center justify-center px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
    >
      <span className="font-medium">
        {language === 'en' ? '日本語' : 'English'}
      </span>
    </button>
  );
};

export default LanguageToggle;