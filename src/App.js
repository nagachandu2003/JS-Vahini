import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import D2D from './components/D2D';
import Footer from './components/Footer';
import YC from './components/TopTabs/YC';
import SI from './components/TopTabs/SI';
import SS from './components/TopTabs/SS';
import Photos from './components/TopTabs/Photos';
import Youtuber from './components/TopTabs/Youtuber';
import Report from './components/BottomTabs/Report';
import Trainings from './components/BottomTabs/Trainings';
import Task from './components/BottomTabs/Task';
import Team from './components/BottomTabs/Team';
import Profile from './components/BottomTabs/Profile';
import Maps from "./components/TopTabs/Maps"
import LogoLauncher from './components/LogoLauncher';
import Whatsapp from './components/TopTabs/Whatsapp';

function App() {
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
    <div className='main-container'>
      {showLogoLauncher && <LogoLauncher />} 
      {showMainContent && (
        <Router>
          <div className='d2d-container'>
            <Routes>
              <Route path="/d2d" element={<D2D />} />
              <Route path="/yc" element={<YC />} />
              <Route path="/si" element={<SI />} />
              <Route path="/ss" element={<SS />} />
              <Route path="/youtuber" element={<Youtuber />} />
              <Route path="/photos" element={<Photos />} />
              <Route path="/" element={<Report />} />
              <Route path="/trainings" element={<Trainings />} />
              <Route path="/task" element={<Task />} />
              <Route path="/team" element={<Team />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/maps" element={<Maps />} />
              <Route path="/whatsapp" element={<Whatsapp />} />
            </Routes>
          </div>
          <Footer />
        </Router>
      )}
    </div>
  );
}

export default App;
