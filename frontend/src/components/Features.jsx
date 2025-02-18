import React from 'react';
import { FiImage, FiMusic, FiHeart, FiShare2 } from 'react-icons/fi';
import { useLanguage } from '../contexts/LanguageContext';

const Features = () => {
  const { t } = useLanguage();

  return (
    <section id="features" className="features py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">{t('features.title')}</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="feature-card bg-white p-6 rounded-lg shadow-sm text-center">
            <div className="inline-block p-3 bg-blue-100 rounded-full mb-4">
              <FiImage className="text-2xl text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">{t('features.analysis.title')}</h3>
            <p className="text-gray-600">
              {t('features.analysis.description')}
            </p>
          </div>

          <div className="feature-card bg-white p-6 rounded-lg shadow-sm text-center">
            <div className="inline-block p-3 bg-purple-100 rounded-full mb-4">
              <FiMusic className="text-2xl text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">{t('features.matching.title')}</h3>
            <p className="text-gray-600">
              {t('features.matching.description')}
            </p>
          </div>

          <div className="feature-card bg-white p-6 rounded-lg shadow-sm text-center">
            <div className="inline-block p-3 bg-pink-100 rounded-full mb-4">
              <FiHeart className="text-2xl text-pink-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">{t('features.favorites.title')}</h3>
            <p className="text-gray-600">
              {t('features.favorites.description')}
            </p>
          </div>

          <div className="feature-card bg-white p-6 rounded-lg shadow-sm text-center">
            <div className="inline-block p-3 bg-green-100 rounded-full mb-4">
              <FiShare2 className="text-2xl text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">{t('features.sharing.title')}</h3>
            <p className="text-gray-600">
              {t('features.sharing.description')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;