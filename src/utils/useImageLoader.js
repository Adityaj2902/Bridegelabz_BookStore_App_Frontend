import { useState, useEffect } from 'react';

/**
 * Custom hook for optimized image loading
 * @param {string} src - Image source URL
 * @param {string} placeholder - Placeholder image source URL
 * @returns {Object} - Loading state and image source
 */
const useImageLoader = (src, placeholder = '') => {
  const [loading, setLoading] = useState(true);
  const [currentSrc, setCurrentSrc] = useState(placeholder);

  useEffect(() => {
    // If no source provided, return early
    if (!src) {
      setLoading(false);
      return;
    }

    // Create new image to preload
    const img = new Image();
    let isMounted = true;

    // Start loading the target image
    img.src = src;
    
    img.onload = () => {
      // Only update state if component is still mounted
      if (isMounted) {
        setCurrentSrc(src);
        setLoading(false);
      }
    };

    img.onerror = () => {
      // Handle error - keep using placeholder
      if (isMounted) {
        console.error(`Failed to load image: ${src}`);
        setLoading(false);
      }
    };

    // Cleanup function for useEffect
    return () => {
      isMounted = false;
      // Cancel the image loading if component unmounts
      img.onload = null;
      img.onerror = null;
    };
  }, [src, placeholder]);

  return { loading, currentSrc };
};

export default useImageLoader; 