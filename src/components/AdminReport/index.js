import "./index.css"
import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaDoorOpen,
  FaUserFriends,
  FaUserCheck,
} from 'react-icons/fa';
import { FaYoutube } from "react-icons/fa6";
import { FaMicrophoneAlt } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { MdPhotoSizeSelectActual } from "react-icons/md";
import { FaMapLocationDot } from "react-icons/fa6";
import { MdAppRegistration } from "react-icons/md";
import { RiTeamFill } from "react-icons/ri";
import { MdOutlineVerifiedUser } from "react-icons/md";
import Footer from "../Footer"
import { FaRegListAlt, FaUserShield, FaUsers, FaClipboardList, FaHome, FaPalette, FaRunning, FaCampground, FaFolderOpen, FaTaxi, FaUtensils, FaMoneyCheckAlt, FaCommentDots, FaQuestionCircle } from 'react-icons/fa';

const iconMapping = {
  'Registration': FaRegListAlt,
  'Sub Admin': FaUserShield,
  'Team': FaUsers,
  'Attendance': FaClipboardList,
  'D2D Incharge': FaHome,
  'Culture': FaPalette,
  'Activity': FaRunning,
  'Camp Visitor': FaCampground,
  'Collaterals': FaFolderOpen,
  'Cabs': FaTaxi,
  'Kitchen': FaUtensils,
  'Expenses': FaMoneyCheckAlt,
  'Feedback': FaCommentDots,
  'Help Ticket': FaQuestionCircle
};

const AdminReport = () => {
    return (
        <>
            <div>
      <div className='main-header-container'>
        <h1 className='main-heading'>Admin</h1>
      </div>
      <div className='grid-container' style={{backgroundColor:'black',minHeight:'100vh',display:'flex',justifyContent:'flex-start'}}>
        <div className='grid-row'>
          <Link to='/campregistrations'  className='grid-card grid-card-1'>
            <FaRegListAlt className='icon' />
            <h2 className='heading-grid'>Registration</h2>
          </Link>
          <Link to='/subadmin' className='grid-card grid-card-2'>
          <FaUserShield className='icon' />
            <h2 className='heading-grid'>
              Sub Admin
            </h2>
          </Link>
          <Link to='/team' className='grid-card grid-card-3'>
            <FaUsers className='icon' />
            <h2 className='heading-grid'>Team</h2>
          </Link>
          <Link to='/adminattendance' className='whatsapp grid-card'>
            <FaClipboardList className='icon' />
            <h2 className='heading-grid'>Attendance</h2>
          </Link>
          <Link to='/d2dincharge' className='grid-card grid-card-4'>
            <FaHome className='icon' />
            <h2 className='heading-grid'>D2D Incharge</h2>
          </Link>
          <Link to='/photos' className='grid-card grid-card-5'>
            <FaPalette className='icon' />
            <h2 className='heading-grid'>Culture</h2>
          </Link>
          <Link to='/youtuber' className='grid-card grid-card-6'>
            <FaRunning className='icon' />
            <h2 className='heading-grid'>Activity</h2>
          </Link>
          <Link to='/maps' className='grid-card maps'>
            <FaCampground className='icon' />
            <h2 className='heading-grid'>Camp Visitor</h2>
          </Link>
          <Link to='/collateral'  className='grid-card grid-card-1'>
            <FaFolderOpen className='icon' />
            <h2 className='heading-grid'>Collaterals</h2>
          </Link>
          <Link to='/cabs' className='grid-card grid-card-2'>
          <FaTaxi className="icon"/>
            <h2 className='heading-grid'>
              Cabs
            </h2>
          </Link>
          <Link to='/kitchen' className='grid-card grid-card-3'>
            <FaUtensils className='icon' />
            <h2 className='heading-grid'>Kitchen</h2>
          </Link>
          <Link to='/expenses' className='whatsapp grid-card'>
            <FaMoneyCheckAlt className='icon' />
            <h2 className='heading-grid'>Expenses</h2>
          </Link>
          <Link to='/feedback' className='grid-card grid-card-5'>
            <FaCommentDots className='icon' />
            <h2 className='heading-grid'>Feedback</h2>
          </Link>
          <Link to='/helpticket' className='grid-card grid-card-6'>
            <FaQuestionCircle className='icon' />
            <h2 className='heading-grid'>Help Ticket</h2>
          </Link>

      </div>
      </div>
      </div>
        <Footer/>
        </>
    )
}

export default AdminReport