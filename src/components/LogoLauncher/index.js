import React, { useState, useEffect } from 'react';
import "./index.css"

const LogoLauncher = () => {
  const [showLogoLauncher, setShowLogoLauncher] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLogoLauncher(false); // Hide the logo launcher after 1 or 2 seconds
    }, 2000); // Adjust the duration as needed

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="logo-launcher" style={{ display: showLogoLauncher ? 'flex' : 'none' }}>
      <img src="https://res.cloudinary.com/dylh46szw/image/upload/v1711793425/favicon2_pef2lb.jpg" alt="logo" className='logo-launcher-logo'/>
    </div>
  );
};

export default LogoLauncher;
