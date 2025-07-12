
import React, { useEffect, useState } from 'react';
import { FlaskConical } from 'lucide-react';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 500); // Allow fade out animation to complete
    }, 3000); // Show splash screen for 3 seconds

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 transition-opacity duration-500 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="text-center animate-fade-in">
        {/* Logo and App Name */}
        <div className="flex items-center justify-center mb-8 animate-scale-in">
          <FlaskConical className="w-20 h-20 text-blue-300 mr-4 animate-pulse" />
          <div>
            <h1 className="text-6xl font-bold text-white mb-2">
              ChemQuest
            </h1>
            <h2 className="text-4xl font-semibold text-blue-200">
              Solver
            </h2>
          </div>
        </div>

        {/* Tagline */}
        <p className="text-xl text-blue-200 mb-12 max-w-md mx-auto">
          Your comprehensive chemistry calculation companion
        </p>

        {/* Loading Animation */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>

        {/* Creator Information */}
        <div className="text-center">
          <p className="text-blue-300 text-lg mb-2">Created by</p>
          <p className="text-white text-2xl font-semibold">Mafole Makhetha</p>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
