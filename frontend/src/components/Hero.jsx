import React from 'react';
import { FiUpload, FiMusic, FiExternalLink } from 'react-icons/fi';
import { useLanguage } from '../contexts/LanguageContext';

const Hero = () => {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-700">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-4 py-24 sm:py-32">
        <div className="max-w-3xl mx-auto text-center relative z-10">
          {/* Icon */}
          <div className="flex justify-center mb-8">
            <div className="p-4 bg-white/10 rounded-full inline-block">
              <FiMusic className="h-10 w-10 text-white" />
            </div>
          </div>

          {/* Main Content */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            {t('hero.title')}
          </h1>
          
          <p className="text-xl sm:text-2xl text-blue-100 mb-10 leading-relaxed">
            {t('hero.subtitle')}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="#upload-section" 
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              <FiUpload className="mr-2" />
              {t('hero.uploadButton')}
            </a>
            <a 
              href="#features" 
              className="inline-flex items-center justify-center px-6 py-3 bg-blue-700 text-white rounded-lg font-semibold hover:bg-blue-800 transition-colors duration-200 border-2 border-blue-400/30"
            >
              {t('hero.learnMore')}
            </a>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-blue-100">
            <div className="flex items-center">
              <span className="font-semibold mr-2">1M+</span> {t('hero.stats.imagesAnalyzed')}
            </div>
            <div className="flex items-center">
              <span className="font-semibold mr-2">500K+</span> {t('hero.stats.musicMatches')}
            </div>
            <div className="flex items-center">
              <span className="font-semibold mr-2">4.9/5</span> {t('hero.stats.userRating')}
            </div>
          </div>

          {/* Google Form Link */}
          <div className="mt-8 inline-block bg-white/10 rounded-lg p-4">
            <a 
              href="https://forms.gle/your-form-id" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center text-white hover:text-blue-100 transition-colors duration-200"
            >
              <FiExternalLink className="mr-2" />
              <span>{t('hero.detailedForm')}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;