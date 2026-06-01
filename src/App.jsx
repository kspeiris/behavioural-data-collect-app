import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TrackingProvider } from './contexts/TrackingContext';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { FormPage } from './pages/FormPage';
import { NavigationPage } from './pages/NavigationPage';
import { ExportPage } from './pages/ExportPage';
import { ConsentModal } from './components/ConsentModal';
import { useTrackingContext } from './contexts/TrackingContext';

const AppContent = () => {
  const { isConsented, grantConsent } = useTrackingContext();

  return (
    <>
      <ConsentModal onConsent={grantConsent} isOpen={!isConsented} />
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/form" element={<FormPage />} />
          <Route path="/navigation" element={<NavigationPage />} />
          <Route path="/export" element={<ExportPage />} />
        </Routes>
      </Layout>
    </>
  );
};

function App() {
  return (
    <Router>
      <TrackingProvider>
        <AppContent />
      </TrackingProvider>
    </Router>
  );
}

export default App;
