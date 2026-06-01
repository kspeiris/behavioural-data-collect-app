import React, { useState } from 'react';
import { ArrowRight, ExternalLink, BookOpen, Settings, User, Bell, Star } from 'lucide-react';
import { useTrackingContext } from '../contexts/TrackingContext';

export const NavigationPage = () => {
  const { isConsented } = useTrackingContext();
  const [clickCount, setClickCount] = useState({});

  const handleNavClick = (itemName) => {
    setClickCount(prev => ({
      ...prev,
      [itemName]: (prev[itemName] || 0) + 1
    }));
  };

  const navCards = [
    { title: 'Research Overview', icon: BookOpen, description: 'Learn about bot detection research', href: '#' },
    { title: 'Participant Guide', icon: User, description: 'How to contribute effectively', href: '#' },
    { title: 'Privacy Policy', icon: Shield, description: 'Data handling and protection', href: '#' },
    { title: 'Contact Researcher', icon: Bell, description: 'Get in touch with questions', href: '#' },
    { title: 'Project Dashboard', icon: Settings, description: 'View project progress', href: '#' },
    { title: 'Acknowledgments', icon: Star, description: 'Credits and references', href: '#' },
  ];

  const quickLinks = [
    { name: 'Documentation', url: '#' },
    { name: 'GitHub Repository', url: '#' },
    { name: 'Research Paper', url: '#' },
    { name: 'Consent Form', url: '#' },
  ];

  if (!isConsented) {
    return (
      <div className="text-center py-12">
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 max-w-md mx-auto">
          <h2 className="text-xl font-semibold text-yellow-800 mb-2">Consent Required</h2>
          <p className="text-yellow-700">Please accept the consent on the home page to participate.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Navigation Patterns</h1>
        <p className="text-gray-600">Interact with these elements to help us understand navigation behaviour</p>
      </div>
      
      {/* Cards Grid */}
      <section>
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Star className="w-5 h-5 text-primary-500" />
          Interactive Cards
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {navCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <button
                key={index}
                onClick={() => handleNavClick(card.title)}
                className="card card-hover text-left w-full group"
              >
                <div className="flex items-start justify-between">
                  <div className="bg-gradient-to-br from-primary-50 to-secondary-50 p-3 rounded-xl">
                    <Icon className="w-5 h-5 text-primary-600" />
                  </div>
                  {clickCount[card.title] > 0 && (
                    <span className="bg-primary-100 text-primary-700 text-xs px-2 py-1 rounded-full">
                      {clickCount[card.title]}
                    </span>
                  )}
                </div>
                <h3 className="font-semibold text-gray-800 mt-3">{card.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{card.description}</p>
                <div className="mt-3 flex items-center text-primary-600 text-sm group-hover:translate-x-1 transition-transform">
                  Explore <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </button>
            );
          })}
        </div>
      </section>
      
      {/* Quick Links */}
      <section>
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <ExternalLink className="w-5 h-5 text-primary-500" />
          Quick Navigation Links
        </h2>
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {quickLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              onClick={() => handleNavClick(link.name)}
              className="flex items-center justify-between p-4 hover:bg-gray-50 transition border-b last:border-b-0 group"
            >
              <span className="text-gray-700 group-hover:text-primary-600 transition">
                {link.name}
              </span>
              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-primary-500 group-hover:translate-x-1 transition" />
            </a>
          ))}
        </div>
      </section>
      
      {/* Buttons Section */}
      <section>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Action Buttons</h2>
        <div className="flex flex-wrap gap-4">
          {['Save Progress', 'Reset Session', 'View Report', 'Download Data'].map((btn, idx) => (
            <button
              key={idx}
              onClick={() => handleNavClick(btn)}
              className="px-6 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-gray-700 font-medium"
            >
              {btn}
            </button>
          ))}
        </div>
      </section>
      
      <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600">
        <strong>Navigation Tracking:</strong> Each click, link interaction, and page transition is being 
        recorded to analyse browsing patterns and decision sequences.
      </div>
    </div>
  );
};