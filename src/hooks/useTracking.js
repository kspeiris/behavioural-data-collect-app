import { useCallback, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackEvent } from '../services/api';

const THROTTLE_MS = 100; // Throttle mouse move events
const SCROLL_THROTTLE_MS = 150;

export const useTracking = (sessionId, isActive) => {
  const location = useLocation();
  const lastMouseMoveRef = useRef(0);
  const lastScrollRef = useRef(0);
  const previousPageRef = useRef(location.pathname);
  const scrollDirectionRef = useRef('none');
  const lastScrollYRef = useRef(0);

  // Track mouse movement
  const handleMouseMove = useCallback((e) => {
    if (!isActive || !sessionId) return;
    
    const now = Date.now();
    if (now - lastMouseMoveRef.current < THROTTLE_MS) return;
    lastMouseMoveRef.current = now;
    
    const x = e.clientX;
    const y = e.clientY;
    
    trackEvent(sessionId, 'mousemove', x, y, '', location.pathname).catch(console.error);
  }, [sessionId, isActive, location.pathname]);

  // Track clicks
  const handleClick = useCallback((e) => {
    if (!isActive || !sessionId) return;
    
    const x = e.clientX;
    const y = e.clientY;
    
    trackEvent(sessionId, 'click', x, y, '', location.pathname).catch(console.error);
  }, [sessionId, isActive, location.pathname]);

  // Track scroll
  const handleScroll = useCallback(() => {
    if (!isActive || !sessionId) return;
    
    const now = Date.now();
    if (now - lastScrollRef.current < SCROLL_THROTTLE_MS) return;
    lastScrollRef.current = now;
    
    const scrollY = window.scrollY;
    const direction = scrollY > lastScrollYRef.current ? 'down' : scrollY < lastScrollYRef.current ? 'up' : 'none';
    lastScrollYRef.current = scrollY;
    
    const scrollValue = `${scrollY}|${direction}`;
    
    trackEvent(sessionId, 'scroll', null, scrollY, scrollValue, location.pathname).catch(console.error);
  }, [sessionId, isActive, location.pathname]);

  // Track keyboard
  const handleKeyDown = useCallback((e) => {
    if (!isActive || !sessionId) return;
    
    // Avoid tracking modifier keys only
    const key = e.key;
    if (key === 'Meta' || key === 'Control' || key === 'Alt' || key === 'Shift') return;
    
    trackEvent(sessionId, 'keydown', null, null, key, location.pathname).catch(console.error);
  }, [sessionId, isActive, location.pathname]);

  // Track navigation
  useEffect(() => {
    if (!isActive || !sessionId) return;
    
    const currentPage = location.pathname;
    const previousPage = previousPageRef.current;
    
    if (previousPage !== currentPage) {
      const navValue = `${previousPage} -> ${currentPage}`;
      trackEvent(sessionId, 'navigation', null, null, navValue, currentPage).catch(console.error);
      previousPageRef.current = currentPage;
    }
  }, [location.pathname, sessionId, isActive]);

  // Session end tracking
  useEffect(() => {
    if (!isActive || !sessionId) return;
    
    const handleBeforeUnload = () => {
      trackEvent(sessionId, 'session_end', null, null, '', location.pathname);
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [sessionId, isActive, location.pathname]);

  // Attach event listeners
  useEffect(() => {
    if (!isActive || !sessionId) return;
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isActive, sessionId, handleMouseMove, handleClick, handleScroll, handleKeyDown]);
};