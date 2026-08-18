import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import './BackToTop.css';

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!isVisible) return null;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className="back-to-top-btn shadow-md hover:shadow-lg transition-all"
      aria-label="Back to top"
      title="Back to top"
    >
      <ArrowUp size={20} />
    </button>
  );
}

export default BackToTop;
