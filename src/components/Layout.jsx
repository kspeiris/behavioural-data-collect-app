import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Activity, Home, FileText, Navigation, BarChart3 } from 'lucide-react';
import { useTrackingContext } from '../contexts/TrackingContext';

export const Layout = ({ children }) => {
  const location = useLocation();
  const { isConsented } = useTrackingContext();

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/form', icon: FileText, label: 'Form' },
    { path: '/navigation', icon: Navigation, label: 'Navigation' },
    { path: '/export', icon: BarChart3, label: 'Export' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-40 border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-gradient-to-r from-primary-500 to-secondary-500 p-2 rounded-xl">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                Behavioural Research
              </span>
            </Link>
            
            <div className="flex items-center gap-1">
              {isConsented && (
                <div className="flex items-center gap-2 bg-green-100 px-3 py-1.5 rounded-full">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-xs font-medium text-green-700">Tracking Active</span>
                </div>
              )}
            </div>
          </div>
          
          {/* Navigation Tabs */}
          <nav className="flex gap-1 mt-3 overflow-x-auto pb-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 whitespace-nowrap ${
                    isActive
                      ? 'bg-primary-50 text-primary-600 font-medium shadow-sm'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="animate-fade-in">
          {children}
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-sm border-t border-gray-200 py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-gray-500">
            Academic Research Project | Behavioural Data Collection Framework
          </p>
          <p className="text-xs text-gray-400 mt-1">
            No personal data stored • Anonymous session tracking • GDPR Compliant
          </p>
        </div>
      </footer>
    </div>
  );
};