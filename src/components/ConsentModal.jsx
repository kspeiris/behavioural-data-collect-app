import React, { useState, useEffect } from 'react';
import { ShieldCheck, X } from 'lucide-react';

export const ConsentModal = ({ onConsent, isOpen }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleConsent = () => {
    setIsVisible(false);
    setTimeout(() => onConsent(), 300);
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleConsent} />
      
      <div className={`relative bg-white rounded-2xl shadow-2xl max-w-lg w-full transform transition-all duration-300 ${isVisible ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'}`}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="bg-primary-100 p-2 rounded-full">
                <ShieldCheck className="w-6 h-6 text-primary-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Research Consent</h2>
            </div>
            <button onClick={handleConsent} className="text-gray-400 hover:text-gray-600 transition">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="space-y-4 text-gray-600">
            <p className="text-sm leading-relaxed">
              This website collects <strong className="text-gray-800">anonymous behavioural interaction data</strong> for academic research on bot detection.
            </p>
            
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <p className="text-sm font-semibold text-gray-700">What we collect:</p>
              <ul className="text-sm space-y-1 list-disc list-inside text-gray-600">
                <li>Mouse movements and clicks</li>
                <li>Scroll behaviour</li>
                <li>Keyboard interactions</li>
                <li>Page navigation patterns</li>
              </ul>
            </div>
            
            <div className="bg-green-50 rounded-lg p-4">
              <p className="text-sm text-green-800">
                ✓ <strong>No personal information</strong> is collected (no names, emails, IP addresses, or passwords)
              </p>
              <p className="text-sm text-green-700 mt-1">
                ✓ All data is anonymized with a random session ID
              </p>
              <p className="text-sm text-green-700 mt-1">
                ✓ You can withdraw at any time by closing the browser
              </p>
            </div>
            
            <p className="text-xs text-gray-500 italic">
              By clicking "I Consent", you agree to participate in this research study.
            </p>
          </div>
          
          <div className="flex gap-3 mt-6">
            <button
              onClick={handleConsent}
              className="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-95"
            >
              I Consent
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};