import { useState, useEffect, useRef } from 'react';

const UseOnScreen = (options) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !isVisible) {
        setIsVisible(true);
        observer.unobserve(entry.target); 
      }
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current); 
      }
    };
  }, [options, isVisible]);

  return [ref, isVisible];
};

export default UseOnScreen;
