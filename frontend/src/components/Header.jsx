import React, { useState } from 'react';
import { FiMenu, FiX, FiMusic } from 'react-icons/fi';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageToggle from './LanguageToggle';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <header className="bg-white shadow-sm fixed w-full top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <FiMusic className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">BGM Finder</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
              {t('nav.features')}
            </a>
            <a href="#how-it-works" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
              {t('nav.howItWorks')}
            </a>
            <a href="#contact" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
              {t('nav.contact')}
            </a>
            <LanguageToggle />
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              {t('nav.getStarted')}
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <LanguageToggle />
            <button 
              className="p-2 rounded-lg hover:bg-gray-100"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <FiX className="h-6 w-6 text-gray-600" />
              ) : (
                <FiMenu className="h-6 w-6 text-gray-600" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a
                href="#features"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50"
              >
                {t('nav.features')}
              </a>
              <a
                href="#how-it-works"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50"
              >
                {t('nav.howItWorks')}
              </a>
              <a
                href="#contact"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50"
              >
                {t('nav.contact')}
              </a>
              <button className="w-full mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                {t('nav.getStarted')}
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;