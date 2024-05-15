import React, { useState } from 'react';
import './index.css'; 
import { FaRegFileAlt } from "react-icons/fa";
import { PiPresentationChartBold } from "react-icons/pi";
import { FcReadingEbook } from "react-icons/fc";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import Footer from '../../Footer';

const Task = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'D2D Visit to Village',
      description: 'Conduct D2D activity in village, Singaila, Block Motipur target 60 houses, 150 people outreach, add them to Whatsapp group, subscribe youtube Channel of Jan Suraaj, collect data of social influencer, Youtuber and people interested to open Youth Club',
      time: 'Today 11 AM',
      status: 'upcoming'
    },
    {
      id: 2,
      title: 'Study Questionnaire',
      description: 'UI stands for user interface. It is the bridge between humans and computers. Anything you interact with as a user is part of the user interface. For example, screens, sounds, overall style, and responsiveness are all elements that need to be considered in UI.',
      time: 'Today 10 AM',
      status: 'upcoming'
    },
    {
      id: 3,
      title: 'Presentation',
      description: 'Brief UI Projects',
      time: 'Today 11 AM',
      status: 'upcoming'
    }
  ]);
  const [activeTab, setActiveTab] = useState('upcoming');
  const [popupVisible, setPopupVisible] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const handleTaskClick = (taskId) => {
    setSelectedTaskId(taskId);
    setPopupVisible(true);
  };

  const handleSaveTask = (newStatus) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === selectedTaskId) {
        return { ...task, status: newStatus };
      }
      return task;
    });

    setTasks(updatedTasks);

    // If the task is set to "completed", change the tab to "completed"
    if (newStatus === 'completed') {
      setActiveTab('completed');
    } else if (newStatus === 'pending') {
      setActiveTab('pending');
    }

    setPopupVisible(false);
  };

  return (
    <>
      <div>
        <div className='main-header-container'>
          <h1 className='main-heading'>Task</h1>
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
          <div
            className={`task-tab ${activeTab === 'pending' ? 'active' : ''}`}
            onClick={() => handleTabClick('pending')}
          >
            Pending
          </div>
          <div className='task-tab-slider' style={{ left: activeTab === 'completed' ? '50%' : activeTab === 'pending' ? '100%' : '0' }} />
        </div>
        <div className='task-content-container'>
          {tasks.map(task => (
            task.status === activeTab && (
              <div key={task.id}>
                <div className='task-content' onClick={() => handleTaskClick(task.id)}>
                  {task.status === 'upcoming' ? <FaRegFileAlt className='task-icon'/> : task.status === 'completed' ? <PiPresentationChartBold className='task-icon'/> : <FcReadingEbook className='task-icon' />}
                  <div className='task-details-container'>
                    <div>
                      <h1 className='task-details-heading'>{task.title}</h1>
                      <p>{task.time}</p>
                    </div>
                    <MdOutlineKeyboardArrowRight className='task-right-arrow'/>
                  </div>
                </div>
              </div>
            )
          ))}
        </div>
      </div>
      {popupVisible && (
        <div className="task-popup">
          <h2 className="task-popup-title">Task Title: {tasks.find(task => task.id === selectedTaskId).title}</h2>
          <p className="task-popup-description">Task Description: {tasks.find(task => task.id === selectedTaskId).description}</p>
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
            <button className="task-popup-cancel-btn" onClick={() => setPopupVisible(false)}>Close</button>
            {/* Added onClick event for Save button */}
            <button className="task-popup-save-btn" onClick={() => handleSaveTask(document.querySelector('input[name="status"]:checked').value)}>Save</button>
          </div>
        </div>
      )}
      <Footer/>
    </>
  );
};

export default Task;
