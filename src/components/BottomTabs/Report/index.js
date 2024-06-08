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
import { FaCamera } from "react-icons/fa";
import Footer from '../../Footer'


import './index.css';

const Report = () => {
  return (
    <>
    <div>
      <div className='main-header-container'>
        <h1 className='main-heading'>Report</h1>
      </div>
      <div className='grid-container'>
        <div className='grid-row'>
        <Link to='/selfie' className='grid-card grid-card-6'>
            <FaCamera className='icon' />
            <h2 className='heading-grid'>Household (Selfie)</h2>
          </Link>
          <Link to='/d2d' className='grid-card grid-card-1'>
            <FaDoorOpen className='icon' />
            <h2 className='heading-grid'>Door 2 Door</h2>
          </Link>
          <Link to='/yc' className='grid-card grid-card-2'>
            <FaUserFriends className='icon' />
            <h2 className='heading-grid'>
              Youth
              <br />
              Club
            </h2>
          </Link>
          <Link to='/ss' className='grid-card grid-card-3'>
            <FaUserCheck className='icon' />
            <h2 className='heading-grid'>Sansthapak Sadasaya</h2>
          </Link>
          <Link to='/whatsapp' className='whatsapp grid-card'>
            <IoLogoWhatsapp className='icon' />
            <h2 className='heading-grid'>Whatsapp</h2>
          </Link>
          <Link to='/si' className='grid-card grid-card-4'>
            <FaMicrophoneAlt className='icon' />
            <h2 className='heading-grid'>BSC/Social Influencer</h2>
          </Link>
          {/* <Link to='/photos' className='grid-card grid-card-5'>
            <MdPhotoSizeSelectActual className='icon' />
            <h2 className='heading-grid'>Photos</h2>
          </Link> */}
          <Link to='/youtuber' className='grid-card grid-card-6'>
            <FaYoutube className='icon' />
            <h2 className='heading-grid'>Youtuber</h2>
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
