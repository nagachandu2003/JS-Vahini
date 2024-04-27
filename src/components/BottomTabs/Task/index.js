import React, { useState } from 'react';
import './index.css'; 
import { FaRegFileAlt } from "react-icons/fa";
import { PiPresentationChartBold } from "react-icons/pi";
import { FcReadingEbook } from "react-icons/fc";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

const Task = () => {
  
  const [activeTab, setActiveTab] = useState('upcoming');
  const [popupVisible, setPopupVisible] = useState(false);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const handleTaskClick = () => {
    setPopupVisible(!popupVisible);
  };

  return (
    <div>
      <div className='main-header-container'>
        <h1 className='main-heading'>Team</h1>
      </div>
      <div className='task-tabs-container'>
        <div
          className={`task-tab ${activeTab === 'upcoming' ? 'active' : ''}`}
          onClick={() => handleTabClick('upcoming')}
        >
          Upcoming
        </div>
        <div
          className={`task-tab ${activeTab === 'completed' ? 'active' : ''}`}
          onClick={() => handleTabClick('completed')}
        >
          Completed
        </div>
        <div className='task-tab-slider' style={{ left: activeTab === 'completed' ? '50%' : '0' }} />
      </div>
      <div className='task-content-container'>
        {activeTab === 'upcoming' && (
          <div>
            <div className='task-content' onClick={handleTaskClick}>
              <FaRegFileAlt className='task-icon'/>
              <div className='task-details-container'>
                <div>
                  <h1 className='task-details-heading'>D2D Visit to Village</h1>
                  <p>Today 11 AM</p>
                </div>
                <MdOutlineKeyboardArrowRight className='task-right-arrow'/>
              </div>
            </div>
            {popupVisible && (
  <div className="task-popup">
    <h2 className="task-popup-title">Task Title: D2D Visit to Village, Block</h2>
    <p className="task-popup-description">
      Task Description: Conduct D2D activity in village,  Singaila,  Block Motipur target 60 houses,  150 people outreach,  add them to Whatsapp group,  subscribe youtube Channel of Jan Suraaj,  collect data of social influencer,  Youtuber and people interested to open Youth Club
    </p>
    <h3 className="task-popup-subtitle">Task Status</h3>
    <div className="task-popup-status">
      <label className="task-popup-radio-label">
        <input
          type="radio"
          name="status"
          value="completed"
          className="task-popup-radio"
        />
        Completed
      </label>
      <label className="task-popup-radio-label">
        <input
          type="radio"
          name="status"
          value="pending"
          className="task-popup-radio"
        />
        Pending
      </label>
    </div>
    <div className="task-popup-buttons">
      <button className="task-popup-cancel-btn" onClick={handleTaskClick}>Close</button>
      <button className="task-popup-save-btn">Save</button>
    </div>
  </div>
)}
            <div className='task-content' onClick={handleTaskClick}>
              <FcReadingEbook className='task-icon' />
              <div className='task-details-container'>
                <div>
                  <h1 className='task-details-heading'>Study Questionnaire</h1>
                  <p>Today 10 AM</p>
                </div>
                <MdOutlineKeyboardArrowRight className='task-right-arrow'/>
              </div>
            </div>
            {popupVisible && (
  <div className="task-popup">
    <h2 className="task-popup-title">Task Title: Study Questionnaire</h2>
    <p className="task-popup-description">
      Task Description: UI stands for user interface. It is the bridge between humans and computers. Anything you interact with as a user is part of the user interface. For example, screens, sounds, overall style, and responsiveness are all elements that need to be considered in UI.
    </p>
    <h3 className="task-popup-subtitle">Task Status</h3>
    <div className="task-popup-status">
      <label className="task-popup-radio-label">
        <input
          type="radio"
          name="status"
          value="completed"
          className="task-popup-radio"
        />
        Completed
      </label>
      <label className="task-popup-radio-label">
        <input
          type="radio"
          name="status"
          value="pending"
          className="task-popup-radio"
        />
        Pending
      </label>
    </div>
    <div className="task-popup-buttons">
      <button className="task-popup-cancel-btn" onClick={handleTaskClick}>Close</button>
      <button className="task-popup-save-btn">Save</button>
    </div>
  </div>
)}
            <div className='task-content' onClick={handleTaskClick}>
              <PiPresentationChartBold className='task-icon' />
              <div className='task-details-container'>
                <div>
                  <h1 className='task-details-heading'>Presentation</h1>
                  <p>Today 11 AM</p>
                </div>
                <MdOutlineKeyboardArrowRight className='task-right-arrow'/>
              </div>
            </div>
            {popupVisible && (
  <div className="task-popup">
    <h2 className="task-popup-title">Task Title: Brief UI Projects</h2>
    <p className="task-popup-description">
      Task Description: UI stands for user interface. It is the bridge between humans and computers. Anything you interact with as a user is part of the user interface. For example, screens, sounds, overall style, and responsiveness are all elements that need to be considered in UI.
    </p>
    <h3 className="task-popup-subtitle">Task Status</h3>
    <div className="task-popup-status">
      <label className="task-popup-radio-label">
        <input
          type="radio"
          name="status"
          value="completed"
          className="task-popup-radio"
        />
        Completed
      </label>
      <label className="task-popup-radio-label">
        <input
          type="radio"
          name="status"
          value="pending"
          className="task-popup-radio"
        />
        Pending
      </label>
    </div>
    <div className="task-popup-buttons">
      <button className="task-popup-cancel-btn" onClick={handleTaskClick}>Close</button>
      <button className="task-popup-save-btn">Save</button>
    </div>
  </div>
)}
          </div>
        )}
        {activeTab === 'completed' && (
          <div className="task-content">
            {/* Content for Completed Tasks */}
            <h2>Completed Tasks</h2>
            {/* Add your completed tasks content here */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Task;
