// ScrollToTop.js
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Force scroll to top on route change
    const forceScrollTop = () => {
      window.scrollTo(0, 0);
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    };

    // Try multiple times to ensure scroll
    const scrollAttempts = () => {
      forceScrollTop();
      setTimeout(forceScrollTop, 0);
      setTimeout(forceScrollTop, 100);
    };

    scrollAttempts();

    // Add scroll restoration
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    return () => {
      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'auto';
      }
    };
  }, [pathname]);

  return null;
};

export default ScrollToTop;
