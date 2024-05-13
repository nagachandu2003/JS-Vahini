import React, { useState, useEffect } from 'react';
import Report from '../BottomTabs/Report'
import LogoLauncher from '../LogoLauncher';
import Footer from '../Footer'

function CampHome() {
  const [showLogoLauncher, setShowLogoLauncher] = useState(true);
  const [showMainContent, setShowMainContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLogoLauncher(false); // Hide the logo launcher after 1 or 2 seconds
      setShowMainContent(true); // Show the main content after hiding the logo launcher
    }, 2000); // Adjust the duration as needed

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
    <div className='main-container'>
      {showLogoLauncher && <LogoLauncher />} 
      {showMainContent && (
        <>
          <div className='d2d-container'>
            <Report/>
          </div>
          </>
      )}
    </div>
    <Footer />
    </>
  );
}

export default CampHome;