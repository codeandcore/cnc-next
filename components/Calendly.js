import React, { useEffect, useState } from 'react';

const Calendly = ({ url, className, buttonText = "Let’s talk", onClose, schedule_icon }) => {
  const [calendlyReady, setCalendlyReady] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    script.onload = () => setCalendlyReady(true); 
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script); 
    };
  }, []);

  const handleCalendlyPopup = (e) => {
    e.preventDefault();
    if (calendlyReady && window.Calendly) {
      window.Calendly.initPopupWidget({
        url: url, 
      });
    } else {
      console.error("Calendly script not ready yet.");
    }
    return false;
  };

  const handleClick = (e) => {
    handleCalendlyPopup(e); 
    if (onClose) onClose(); 
  };

  return (
    <a 
      href="#" 
      className={className} 
      onClick={handleClick} 
    >
      <img src={schedule_icon} alt="Schedule Icon" />
      <br />
      <em>{buttonText}</em>
    </a>
  );
};

export default Calendly;
