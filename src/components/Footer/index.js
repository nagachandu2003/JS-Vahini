import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Cookies from 'js-cookie';
import "./index.css";
import { RiAdminFill } from 'react-icons/ri';
import { FaFileAlt, FaBell, FaTasks, FaUsers, FaUser } from 'react-icons/fa';
import { GrTasks } from "react-icons/gr";

const Footer = () => {
  const [activeTab, setActiveTab] = useState('Admin'); // Initially set to 'Report'
  const isAdmin = Cookies.get("isAdmin");
  const isSubAdmin = Cookies.get("isSubAdmin");

  const handleClick = (tabName) => {
    setActiveTab(tabName);
  };

  const renderTab = (to, tabName, Icon, label) => (
    <Link
      to={to}
      className={`bottom-tab ${activeTab === tabName ? 'active' : ''}`}
      onClick={() => handleClick(tabName)}
    >
      <Icon className={`tab-icon ${activeTab === tabName ? 'active-icon' : ''}`} />
      {label}
    </Link>
  );

  return (
    <>
      {isAdmin !== "true" && (
        <div className='footer-container'>
          <nav className='bottom-tabs-container'>
            {renderTab("/report", 'Report', FaFileAlt, 'Report')}
            {renderTab("/trainings", 'Trainings', FaBell, 'Trainings')}
            {renderTab("/stats", 'Stats', FaTasks, 'Stats')}
            {renderTab("/task", 'Task', GrTasks, 'Task')}
            {/* {renderTab("/team", 'Team', FaUsers, 'Team')} */}
            {renderTab("/profile", 'Profile', FaUser, 'Profile')}
          </nav>
        </div>
      )}
      {(isAdmin === "true"||isSubAdmin==="true") && (
        <div className='footer-container'>
          <nav className='bottom-tabs-container'>
            {renderTab("/adminreport", 'Admin', RiAdminFill, 'Admin')}
            {renderTab("/report", 'Report', FaFileAlt, 'Report')}
            {renderTab("/stats", 'Stats', FaTasks, 'Stats')}
            {renderTab("/trainings", 'Trainings', FaBell, 'Trainings')}
            {/* {renderTab("/team", 'Team', FaUsers, 'Team')} */}
            {renderTab("/adminprofile", 'Profile', FaUser, 'Profile')}
          </nav>
        </div>
      )}
    </>
  );
};

export default Footer;
