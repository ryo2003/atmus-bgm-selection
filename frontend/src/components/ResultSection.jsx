import React from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { FiMusic, FiHeart, FiExternalLink } from 'react-icons/fi';
import { useLanguage } from '../contexts/LanguageContext';

const ResultSection = ({ result }) => {
  const { mainTrack, recommendations } = result;
  const { t } = useLanguage();

  return (
    <section className="result-section py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h3 className="text-2xl font-bold mb-4">{t('results.perfectMatch')}</h3>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="text-xl font-semibold">{mainTrack?.title || "Generated Track"}</h4>
                  <p className="text-gray-600">{mainTrack?.artist || "Unknown Artist"}</p>
                  <div className="flex gap-2 mt-2">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      {mainTrack?.mood || "Unknown Mood"}
                    </span>
                    <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                      {mainTrack?.genre || "Unknown Genre"}
                    </span>
                  </div>
                </div>
                <button className="p-2 hover:bg-gray-100 rounded-full">
                  <FiHeart className="text-2xl text-gray-600" />
                </button>
              </div>
              
              {mainTrack?.url ? (
                <a href={mainTrack.url} target="_blank" rel="noopener noreferrer">
                  <FiExternalLink className="text-2xl text-gray-600" />
                </a>
                // <AudioPlayer
                //   src={mainTrack.url}
                //   customProgressBarSection={["CURRENT_TIME", "PROGRESS_BAR", "DURATION"]}
                //   customControlsSection={["MAIN_CONTROLS", "VOLUME_CONTROLS"]}
                //   autoPlayAfterSrcChange={false}
                // />
              ) : (
                <p className="text-center text-gray-500">No track available.</p>
              )}
            </div>
          </div>

          <div className="bg-blue-50 border-2 border-blue-100 rounded-lg p-6 mb-8 text-center">
            <h3 className="text-xl font-semibold text-blue-800 mb-2">{t('results.moreAccurate.title')}</h3>
            <p className="text-blue-600 mb-4">{t('results.moreAccurate.subtitle')}</p>
            <a 
              href="https://forms.gle/your-form-id" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
            >
              <span>{t('results.moreAccurate.button')}</span>
              <FiExternalLink className="ml-2" />
            </a>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-4">{t('results.similarTracks')}</h3>
            <div className="grid gap-4">
              {recommendations?.length > 0 ? (
                recommendations.map((track, index) => (
                  <div key={index} className="bg-white rounded-lg p-4 shadow-sm flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-gray-100 rounded-full">
                        <FiMusic className="text-xl text-gray-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{track.title || "Untitled"}</h4>
                        <p className="text-gray-600">{track.artist || "Unknown Artist"}</p>
                        <a href={mainTrack.url} target="_blank" rel="noopener noreferrer">
                  <FiExternalLink className="text-2xl text-gray-600" />
                </a>
                        <span className="inline-block mt-1 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                          {track.mood || "Unknown Mood"}
                        </span>
                      </div>
                    </div>
                    <button className="p-2 hover:bg-gray-100 rounded-full">
                      <FiHeart className="text-xl text-gray-600" />
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500">No recommendations available.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResultSection;
