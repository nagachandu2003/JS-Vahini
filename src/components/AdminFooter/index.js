import React, { useState } from 'react';
import { Link } from "react-router-dom";
import "./index.css";
import { IoStatsChartSharp } from "react-icons/io5";
import { RiAdminFill } from "react-icons/ri";
import { FaFileAlt, FaBell, FaTasks, FaUsers, FaUser } from 'react-icons/fa'; // Importing icons from React Icons

const AdminFooter = () => {
  const [activeTab, setActiveTab] = useState('Admin'); // Initially set to 'Report'

  const handleClick = (tabName) => {
    setActiveTab(tabName);
  };

  const handleIconClick = (tabName) => {
    setActiveTab(tabName === activeTab ? null : tabName);
  };

  return (
    <div className='footer-container'>
      <nav className='bottom-tabs-container'>
      <Link to="/adminreport" className={`bottom-tab ${activeTab === 'Admin' ? 'active' : ''}`} onClick={() => handleClick('Admin')}><RiAdminFill className={`tab-icon ${activeTab === 'Admin' ? 'active-icon' : ''}`} onClick={() => handleIconClick('Admin')} /> Admin</Link>
        <Link to="/report" className={`bottom-tab ${activeTab === 'Report' ? 'active' : ''}`} onClick={() => handleClick('Report')}><FaFileAlt className={`tab-icon ${activeTab === 'Report' ? 'active-icon' : ''}`} onClick={() => handleIconClick('Report')} /> Report</Link>
        <Link to="/stats" className={`bottom-tab ${activeTab === 'Stats' ? 'active' : ''}`} onClick={() => handleClick('Stats')}><FaTasks className={`tab-icon ${activeTab === 'Stats' ? 'active-icon' : ''}`} onClick={() => handleIconClick('Stats')} /> Stats</Link>
        <Link to="/trainings" className={`bottom-tab ${activeTab === 'Trainings' ? 'active' : ''}`} onClick={() => handleClick('Trainings')}><FaBell className={`tab-icon ${activeTab === 'Trainings' ? 'active-icon' : ''}`} onClick={() => handleIconClick('Trainings')} /> Trainings</Link>
        <Link to="/team" className={`bottom-tab ${activeTab === 'Team' ? 'active' : ''}`} onClick={() => handleClick('Team')}><FaUsers className={`tab-icon ${activeTab === 'Team' ? 'active-icon' : ''}`} onClick={() => handleIconClick('Team')} /> Team</Link>
        <Link to="/profile" className={`bottom-tab ${activeTab === 'Profile' ? 'active' : ''}`} onClick={() => handleClick('Profile')}><FaUser className={`tab-icon ${activeTab === 'Profile' ? 'active-icon' : ''}`} onClick={() => handleIconClick('Profile')} /> Profile</Link>
      </nav>
    </div>
  );
};

export default AdminFooter;
