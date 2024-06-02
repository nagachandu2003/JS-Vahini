import React from 'react';
import { FaUser, FaPhone, FaEnvelope, FaIdCard, FaLock, FaInfoCircle, FaUserFriends, FaNetworkWired, FaComment, FaQuestionCircle, FaMapMarkerAlt } from 'react-icons/fa'; // Added FaMapMarkerAlt for address icon
import Footer from '../../Footer';
import "./index.css";
import { googleLogout } from '@react-oauth/google';
import Cookies from 'js-cookie'

const Profile = () => {

  const onClickLogOut = () => {
    googleLogout()
    Cookies.remove("isAdmin")
    Cookies.remove("campuseremail")
    Cookies.remove("isSubAdmin")
    window.location.href="/"
  }

  return (
    <div className='main-profile-container'>
      <div className='main-header-container'>
        <h1 className='main-heading'>Profile</h1>
      </div>
      <div className='profile-top-container'>
        <img src="https://res.cloudinary.com/dvwnbhpcy/image/upload/v1715776970/istockphoto-1495088043-612x612-removebg-preview_hdifqs.png" alt="profile" className='profile-logo' />
        <p className='profile-name'>Vijay Kumar</p>
        <p className='profile-number'>9972968390</p>
      </div>
      <div className='profile-bottom-container'>
        <div className='profile-bottom-name'>
          <FaUser className='profile-bottom-logo'/> Name
        </div>
        <div className='profile-bottom-number'>
          <FaPhone className='profile-bottom-logo'/> Number
        </div>
        <div className='profile-bottom-email'>
          <FaEnvelope className='profile-bottom-logo'/> Email
        </div>
        <div className='profile-bottom-camp-id'>
          <FaIdCard className='profile-bottom-logo'/> Camp ID
        </div>
        <div className='profile-bottom-aadhar'>
          <FaLock className='profile-bottom-logo'/> Aadhar
        </div>
        <div className='profile-bottom-about'>
          <FaInfoCircle className='profile-bottom-logo'/> About
        </div>
        <div className='profile-bottom-referral'>
          <FaUserFriends className='profile-bottom-logo'/> Referal
        </div>
        <div className='profile-bottom-network'>
          <FaNetworkWired className='profile-bottom-logo'/> Network
        </div>
        <div className='profile-bottom-feedback'>
          <FaComment className='profile-bottom-logo'/> Feedback
        </div>
        <div className='profile-bottom-help'>
          <FaQuestionCircle className='profile-bottom-logo'/> Help
        </div>
        {/* New element for address */}
        <div className='profile-bottom-address'>
          <FaMapMarkerAlt className='profile-bottom-logo'/> Address
        </div>
        <div style={{textAlign:'center'}}>
        <button onClick={onClickLogOut} className="delete-Btn" type="button">Log Out</button>
          </div>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
