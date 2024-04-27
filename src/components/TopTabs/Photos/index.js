import React, { useState } from 'react';
import './index.css';
import { FaCamera } from 'react-icons/fa'; // Importing camera icon

const Photos = () => {
  const [activeTab, setActiveTab] = useState('list');
  const [showListForm, setShowListForm] = useState(false); // State for List tab popup
  const [showMapForm, setShowMapForm] = useState(false); // State for Map tab popup

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <div className="main-container">
        <div className="main-header-container">
          <h1 className="main-heading">Photos</h1>
        </div>
        <div className="photos-tab-container">
          {/* List Tab */}
          <div className="tab">
            <button
              className={`photos-tab-btn ${activeTab === 'list' ? 'photos-active-tab' : ''}`}
              onClick={() => handleTabClick('list')}
            >
              List
            </button>
            {/* Floating camera button for List tab */}
            {activeTab === 'list' && (
              <div className="floating-button" onClick={() => setShowListForm(!showListForm)}>
                <span>New</span>
                <FaCamera className="camera-icon" />
              </div>
            )}
          </div>
          {/* Map Tab */}
          <div className="tab">
            <button
              className={`photos-tab-btn ${activeTab === 'map' ? 'photos-active-tab' : ''}`}
              onClick={() => handleTabClick('map')}
            >
              Map
            </button>
            {/* Floating camera button for Map tab */}
            {activeTab === 'map' && (
              <div className="floating-button" onClick={() => setShowMapForm(!showMapForm)}>
                <span>New</span>
                <FaCamera className="camera-icon" />
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Popup for List tab */}
      {activeTab === 'list' && showListForm && (
        <div className="popup">
          <p>List tab popup interface content goes here</p>
          <button className="cancel-button" onClick={() => setShowListForm(false)}>Cancel</button>
        </div>
      )}
      {/* Popup for Map tab */}
      {activeTab === 'map' && showMapForm && (
        <div className="popup">
          <p>Map tab popup interface content goes here</p>
          <button className="cancel-button" onClick={() => setShowMapForm(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default Photos;
