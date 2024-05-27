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

const AdminReport = () => {
    return (
        <>
            <div>
      <div className='main-header-container'>
        <h1 className='main-heading'>Admin</h1>
      </div>
      <div className='grid-container' style={{backgroundColor:'black',minHeight:'100vh'}}>
        <div className='grid-row'>
          <Link to='/campregistrations' className='grid-card grid-card-1'>
            <MdAppRegistration className='icon' />
            <h2 className='heading-grid'>Registrations</h2>
          </Link>
          <Link to='/subadmin' className='grid-card grid-card-2'>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"
            fill="#000000"
            />
        </svg>
            <h2 className='heading-grid'>
              Sub Admin
            </h2>
          </Link>
          <Link to='/team' className='grid-card grid-card-3'>
            <RiTeamFill className='icon' />
            <h2 className='heading-grid'>Team</h2>
          </Link>
          <Link to='/adminattendance' className='whatsapp grid-card'>
            <MdOutlineVerifiedUser className='icon' />
            <h2 className='heading-grid'>Attendance</h2>
          </Link>
          {/* <Link to='/si' className='grid-card grid-card-4'>
            <FaMicrophoneAlt className='icon' />
            <h2 className='heading-grid'>BSC/Social Influencer</h2>
          </Link>
          <Link to='/photos' className='grid-card grid-card-5'>
            <MdPhotoSizeSelectActual className='icon' />
            <h2 className='heading-grid'>Photos</h2>
          </Link>
          <Link to='/youtuber' className='grid-card grid-card-6'>
            <FaYoutube className='icon' />
            <h2 className='heading-grid'>Youtuber</h2>
          </Link>
          <Link to='/maps' className='grid-card maps'>
            <FaMapLocationDot className='icon' />
            <h2 className='heading-grid'>Maps</h2>
          </Link> */}

      </div>
      </div>
      </div>
        <Footer/>
        </>
    )
}

export default AdminReport