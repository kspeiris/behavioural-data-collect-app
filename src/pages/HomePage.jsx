import React from 'react';
import { Link } from 'react-router-dom';
import { MousePointer, MousePointerClick, Scroll, Keyboard, Navigation, Shield } from 'lucide-react';
import { useTrackingContext } from '../contexts/TrackingContext';

export const HomePage = () => {
  const { isConsented, grantConsent } = useTrackingContext();

  const features = [
    { icon: MousePointer, title: 'Mouse Movement', description: 'Track cursor trajectories and movement patterns' },
    { icon: MousePointerClick, title: 'Click Analysis', description: 'Record click positions and timing' },
    { icon: Scroll, title: 'Scroll Behaviour', description: 'Monitor scrolling patterns and depth' },
    { icon: Keyboard, title: 'Keyboard Dynamics', description: 'Capture typing rhythm and keypress timing' },
    { icon: Navigation, title: 'Navigation Flow', description: 'Track page transitions and browsing paths' },
    { icon: Shield, title: 'Privacy First', description: 'Anonymous sessions, no personal data stored' },
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center py-12 animate-slide-up">
        <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
          <Shield className="w-4 h-4" />
          Academic Research Study
        </div>
        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-4">
          Behavioural Data Collection
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Contributing to coordinated bot detection research through anonymous interaction tracking
        </p>
        
        {!isConsented ? (
          <button
            onClick={grantConsent}
            className="btn-primary mt-8 text-lg px-8 py-4"
          >
            Start Participating
          </button>
        ) : (
          <div className="mt-8 flex gap-4 justify-center">
            <Link to="/form" className="btn-primary">
              Begin Interaction
            </Link>
            <Link to="/navigation" className="btn-secondary">
              Explore Navigation
            </Link>
          </div>
        )}
      </section>
      
      {/* Features Grid */}
      <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div key={index} className="card card-hover">
              <div className="bg-gradient-to-br from-primary-50 to-secondary-50 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                <Icon className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          );
        })}
      </section>
      
      {/* Info Section */}
      <section className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">About This Research</h2>
          <p className="text-gray-700 leading-relaxed">
            This framework collects behavioural interaction data to develop machine learning models 
            for detecting coordinated bot activity. Your anonymous contributions help advance 
            cybersecurity research while maintaining complete privacy.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm">
            <span className="bg-white/60 px-3 py-1 rounded-full">✓ No Registration</span>
            <span className="bg-white/60 px-3 py-1 rounded-full">✓ Anonymous Session</span>
            <span className="bg-white/60 px-3 py-1 rounded-full">✓ Withdraw Anytime</span>
          </div>
        </div>
      </section>
    </div>
  );
};