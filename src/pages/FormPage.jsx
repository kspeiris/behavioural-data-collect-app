import React, { useState } from 'react';
import { Send, User, MessageSquare } from 'lucide-react';
import { useTrackingContext } from '../contexts/TrackingContext';

export const FormPage = () => {
  const { isConsented } = useTrackingContext();
  const [formData, setFormData] = useState({
    name: '',
    feedback: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isConsented) return;
    
    // Note: No actual data storage - only behavioural tracking captures interactions
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
    
    // Reset form
    setFormData({ name: '', feedback: '' });
  };

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
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Interactive Form</h1>
        <p className="text-gray-600">Your typing behaviour helps us understand human-computer interaction patterns</p>
      </div>
      
      <div className="card">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <User className="w-4 h-4 inline mr-2" />
              Name (Optional)
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name or leave blank"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition outline-none"
            />
            <p className="text-xs text-gray-400 mt-1">This field is optional and not stored persistently</p>
          </div>
          
          {/* Feedback Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <MessageSquare className="w-4 h-4 inline mr-2" />
              Feedback or Comments
            </label>
            <textarea
              name="feedback"
              value={formData.feedback}
              onChange={handleChange}
              rows={4}
              placeholder="Share your thoughts about this research or any feedback..."
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition outline-none resize-none"
            />
          </div>
          
          <button
            type="submit"
            className="w-full btn-primary flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" />
            Submit Feedback
          </button>
          
          {isSubmitted && (
            <div className="bg-green-100 text-green-700 p-3 rounded-lg text-center animate-fade-in">
              ✓ Thank you for your contribution!
            </div>
          )}
        </form>
      </div>
      
      <div className="bg-blue-50 rounded-xl p-4 text-sm text-blue-800">
        <strong>Note:</strong> The system is tracking your keyboard interactions, mouse movements, 
        and clicks to analyse typing dynamics and interaction patterns. No personal information 
        from form fields is stored.
      </div>
    </div>
  );
};