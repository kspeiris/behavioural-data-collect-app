const API_URL = import.meta.env.VITE_API_URL;

class EventUploader {
  constructor() {
    this.pendingEvents = [];
    this.isSending = false;
  }

  async sendEvent(eventData) {
    if (!API_URL) {
      console.warn('API URL not configured. Event not sent:', eventData);
      return false;
    }

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      });

      const result = await response.json();
      return result.success === true;
    } catch (error) {
      console.error('Failed to send event:', error);
      return false;
    }
  }

  async sendBatch(events) {
    if (!API_URL) return false;
    
    try {
      const promises = events.map(event => this.sendEvent(event));
      const results = await Promise.all(promises);
      return results.every(r => r === true);
    } catch (error) {
      console.error('Batch send failed:', error);
      return false;
    }
  }

  async exportData() {
    if (!API_URL) throw new Error('API URL not configured');
    
    try {
      const response = await fetch(`${API_URL}?export=csv`, {
        method: 'GET',
        headers: {
          'Content-Type': 'text/csv',
        },
      });
      
      if (!response.ok) throw new Error('Export failed');
      
      const csvData = await response.text();
      return csvData;
    } catch (error) {
      console.error('Export failed:', error);
      throw error;
    }
  }
}

export const eventUploader = new EventUploader();

export const trackEvent = async (sessionId, eventType, x = null, y = null, value = '', pageUrl = '') => {
  const timestamp = Date.now();
  const eventData = {
    sessionId,
    eventType,
    x: x !== null ? Number(x) : null,
    y: y !== null ? Number(y) : null,
    value: String(value),
    pageUrl: String(pageUrl),
    timestamp,
  };
  
  // Use sendBeacon for page unload events
  if (eventType === 'session_end' && navigator.sendBeacon) {
    const blob = new Blob([JSON.stringify(eventData)], { type: 'application/json' });
    navigator.sendBeacon(API_URL, blob);
    return true;
  }
  
  return await eventUploader.sendEvent(eventData);
};