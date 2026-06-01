import React from 'react';
import { Download, Database, Shield, AlertCircle } from 'lucide-react';
import { ExportButton } from '../components/ExportButton';
import { useTrackingContext } from '../contexts/TrackingContext';

export const ExportPage = () => {
  const { isConsented } = useTrackingContext();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Data Export</h1>
        <p className="text-gray-600">Export collected behavioural data for analysis (Researcher Access Only)</p>
      </div>
      
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 flex items-start gap-4">
        <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" />
        <div>
          <h3 className="font-semibold text-yellow-800 mb-1">Researcher Access Only</h3>
          <p className="text-sm text-yellow-700">
            This page is intended for research purposes only. Exported data contains anonymous behavioural 
            events including mouse movements, clicks, scrolls, keyboard interactions, and navigation patterns.
          </p>
        </div>
      </div>
      
      <div className="card">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-primary-100 p-3 rounded-xl">
            <Database className="w-6 h-6 text-primary-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Export Behavioural Data</h2>
            <p className="text-sm text-gray-500">Download all collected events in CSV format</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-medium text-gray-700 mb-2">Export Specifications</h3>
            <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
              <li>Format: CSV (Comma Separated Values)</li>
              <li>Columns: SessionID, EventType, X, Y, Value, PageURL, Timestamp</li>
              <li>Event Types: mousemove, click, scroll, keydown, navigation, session_start, session_end</li>
              <li>Timestamp: Unix milliseconds</li>
            </ul>
          </div>
          
          <div className="flex justify-center pt-4">
            <ExportButton className="px-8 py-3 text-lg" />
          </div>
        </div>
      </div>
      
      <div className="bg-blue-50 rounded-xl p-4 flex items-start gap-3">
        <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-blue-800">
          <strong>Privacy Guarantee:</strong> Exported data contains no personally identifiable information. 
          Session IDs are randomly generated UUIDs that cannot be traced back to individual users.
        </div>
      </div>
      
      {!isConsented && (
        <div className="bg-gray-100 rounded-xl p-4 text-center text-gray-600">
          Note: No data has been collected yet. Please accept consent and interact with the application 
          to generate behavioural data.
        </div>
      )}
    </div>
  );
};