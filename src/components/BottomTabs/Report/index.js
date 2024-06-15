import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserEdit } from "react-icons/fa";
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
import { FaCamera } from "react-icons/fa";
import Footer from '../../Footer'
import { BiSolidInstitution } from "react-icons/bi";
import Cookies from 'js-cookie'

import './index.css';

const Report = () => {
  const isAdmin = Cookies.get("isAdmin");
  return (
    <>
    <div style={{minHeight:'100vh',backgroundColor:'black'}}>
      <div className='main-header-container'>
        <h1 className='main-heading'>Report</h1>
      </div>
      <div  className='grid-container'>
        <div className='grid-row'>
        <Link to='/selfie' className='grid-card grid-card-6'>
            <FaCamera className='icon' />
            <h2 className='heading-grid'>Household (Selfie)</h2>
          </Link>
          <Link to='/d2d' className='grid-card grid-card-1'>
            <FaDoorOpen className='icon' />
            <h2 className='heading-grid'>D2D Report</h2>
          </Link>
          {/* <Link to='/yc' className='grid-card grid-card-2'>
            <FaUserFriends className='icon' />
            <h2 className='heading-grid'>
              Youth
              <br />
              Club
            </h2>
          </Link> */}
          <Link to='/ss' className='grid-card grid-card-3'>
            <FaUserCheck className='icon' />
            <h2 className='heading-grid'>Sansthapak Sadasaya</h2>
          </Link>
          <Link to={'/whatsapp'} className='whatsapp grid-card'>
            <IoLogoWhatsapp className='icon' />
            <h2 className='heading-grid'>Whatsapp</h2>
          </Link>
          <Link to='/digitalinfluencer' className='grid-card grid-card-4'>
            <FaMicrophoneAlt className='icon' />
            <h2 className='heading-grid'>Digital Influencer</h2>
          </Link>
          <Link to='/coaching' className='grid-card grid-card-5'>
            <BiSolidInstitution className='icon' />
            <h2 className='heading-grid'>Coaching</h2>
          </Link>
          <Link to='/ssvitran' className='grid-card grid-card-6'>
            <FaUserEdit className='icon' />
            <h2 className='heading-grid'>SS Vitran</h2>
          </Link>
          {/* <Link to='/maps' className='grid-card maps'>
            <FaMapLocationDot className='icon' />
            <h2 className='heading-grid'>Maps</h2>
          </Link> */}
  
      </div>
      </div>
      </div>
      <Footer />
      </>
  );
};

export default Report;
