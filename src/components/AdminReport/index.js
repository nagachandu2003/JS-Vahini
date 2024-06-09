import "./index.css"
import React from 'react';
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import {
  FaDoorOpen, FaUserFriends, FaUserCheck,
} from 'react-icons/fa';
import { FaFlag } from "react-icons/fa";
import { TbCoinRupeeFilled } from "react-icons/tb";
import { FaYoutube } from "react-icons/fa6";
import { FaMicrophoneAlt } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { MdPhotoSizeSelectActual } from "react-icons/md";
import { FaMapLocationDot } from "react-icons/fa6";
import { MdAppRegistration } from "react-icons/md";
import { RiTeamFill } from "react-icons/ri";
import { MdOutlineVerifiedUser } from "react-icons/md";
import Footer from "../Footer"
import Cookies from 'js-cookie'
import { FaRegListAlt, FaUserShield, FaUsers, FaClipboardList, FaHome, FaPalette, FaRunning, FaCampground, FaFolderOpen, FaTaxi, FaUtensils, FaMoneyCheckAlt, FaCommentDots, FaQuestionCircle } from 'react-icons/fa';

const accessTabs = [
  'Registration', 'Sub Admin', 'Team', 'Attendance', 'D2D Incharge', 
  'Culture', 'Activity', 'Camp Visitor', 'Collaterals', 
  'Cabs', 'Kitchen', 'Expenses', 'Feedback', 'Help Ticket'
];

const AdminReport = () => {
  const [subAdminInfo,setSubAdminInfo] = useState('')
  const location = useLocation();
  const isSubAdmin = Cookies.get("isSubAdmin");
  const [accessibleTabs, setAccessibleTabs] = useState([]);
  const campId = Cookies.get("campId");

  useEffect(() => {
    if (isSubAdmin === "true") {
      const { subAdminDetails } = location.state;
      setSubAdminInfo(subAdminDetails);
      setAccessibleTabs(subAdminDetails.accessItems)
    }
  }, [isSubAdmin, location.state]);


  let accessTabItems = [  'Registration', 'Sub Admin', 'Team', 'Attendance', 'D2D Incharge', 
  'Culture', 'Activity', 'Camp Visitor', 'Collaterals', 
  'Cabs', 'Kitchen', 'Expenses', 'Feedback', 'Help Ticket'];
  if(isSubAdmin==="true")
    {
    accessTabItems = accessTabs.map(tab => ({
    tab: accessibleTabs.includes(tab) ? 'norm' : 'dis'
  }));
}
    return (
        <>
            <div>
      <div className='main-header-container'>
        <h1 className='main-heading'>Admin</h1>
      </div>
      <div className='grid-container' style={{backgroundColor:'black',minHeight:'100vh',display:'flex',justifyContent:'flex-start'}}>
        <div className='grid-row'>
          <Link to='/campregistrations'  className={`grid-card grid-card-1 ${accessTabItems[0].tab}`}>
            <FaRegListAlt className='icon' />
            <h2 className='heading-grid'>Registration</h2>
          </Link>
          <Link to='/subadmin' className={`grid-card grid-card-2 ${accessTabItems[1].tab}`}>
          <FaUserShield className='icon' />
            <h2 className='heading-grid'>
              Sub Admin
            </h2>
          </Link>
          <Link to='/adminteam' className={`grid-card grid-card-3 ${accessTabItems[2].tab}`}>
            <FaUsers className='icon' />
            <h2 className='heading-grid'>Team</h2>
          </Link>
          <Link to='/adminattendance' className={`whatsapp grid-card ${accessTabItems[3].tab}`}>
            <FaClipboardList className='icon' />
            <h2 className='heading-grid'>Attendance</h2>
          </Link>
          <Link to='/d2dincharge' className={`grid-card grid-card-4 ${accessTabItems[4].tab}`}>
            <FaHome className='icon' />
            <h2 className='heading-grid'>D2D Incharge</h2>
          </Link>
          {/* <Link to='/photos' className={`grid-card grid-card-5 ${accessTabItems[5].tab}`}>
            <FaPalette className='icon' />
            <h2 className='heading-grid'>Culture</h2>
          </Link> */}
          <Link to='/activity' className={`grid-card grid-card-6 ${accessTabItems[6].tab}`}>
            <FaRunning className='icon' />
            <h2 className='heading-grid'>Activity</h2>
          </Link>
          {/* <Link to='/maps' className={`grid-card maps ${accessTabItems[7].tab}`}>
            <FaCampground className='icon' />
            <h2 className='heading-grid'>Camp Visitor</h2>
          </Link> */}
          <Link to='/collateral'  className={`grid-card grid-card-1 ${accessTabItems[8].tab}`}>
            <FaFlag className='icon' />
            <h2 className='heading-grid'>Collaterals</h2>
          </Link>
          {/* <Link to='/cabs' className={`grid-card grid-card-2 ${accessTabItems[9].tab}`}>
          <FaTaxi className="icon"/>
            <h2 className='heading-grid'>
              Cabs
            </h2>
          </Link>
          <Link to='/kitchen' className={`grid-card grid-card-3 ${accessTabItems[10].tab}`}>
            <FaUtensils className='icon' />
            <h2 className='heading-grid'>Kitchen</h2>
          </Link> */}
          <Link to='/expenses' className={`whatsapp grid-card ${accessTabItems[11].tab}`}>
            <TbCoinRupeeFilled className='icon' />
            <h2 className='heading-grid'>Expenses</h2>
          </Link>
          {/* <Link to='/feedback' className={`grid-card grid-card-5 ${accessTabItems[12].tab}`}>
            <FaCommentDots className='icon' />
            <h2 className='heading-grid'>Feedback</h2>
          </Link>
          <Link to='/helpticket' className={`grid-card grid-card-6 ${accessTabItems[13].tab}`}>
            <FaQuestionCircle className='icon' />
            <h2 className='heading-grid'>Help Ticket</h2>
          </Link> */}

      </div>
      </div>
      </div>
        <Footer/>
        </>
    )
}

export default AdminReport