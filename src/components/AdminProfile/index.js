import React,{useState,useEffect} from 'react';
import { FaUser, FaPhone, FaEnvelope, FaIdCard, FaLock, FaInfoCircle, FaUserFriends, FaNetworkWired, FaComment, FaQuestionCircle, FaMapMarkerAlt } from 'react-icons/fa'; // Added FaMapMarkerAlt for address icon
import Footer from '../Footer';
import "./index.css";
import { googleLogout } from '@react-oauth/google';
import Cookies from 'js-cookie'
import { BiIdCard } from 'react-icons/bi';
import { Link } from 'react-router-dom';

const AdminProfile = () => {
  const [isLoading,setIsLoading] = useState(false);
  const [users,setUsers] = useState([])
  const campCluster = Cookies.get("campId")
  const isAdmin = Cookies.get("isAdmin");
  const isSubAdmin = Cookies.get("isSubAdmin")
  const emailId = Cookies.get("campuseremail")
  const [name, setName] = useState('');
  const [mobileno, setMobileNo] = useState('');


  useEffect(() => {
    const getVideos = async () => {
      setIsLoading(true)
      try{
        let response;
        if(isAdmin==="true"){
        const response = await fetch(`https://js-member-backend.vercel.app/admincampusers/${emailId}`)
         const data = await response.json()
            console.log(data)
            const {campsList} = data;
            setName(campsList[0].campInchargeName)
            setMobileNo(campsList[0].campInchargeNumber)
            setIsLoading(false)
            // console.log(data);
        }
        else if(isSubAdmin==="true"){
            response = await fetch(`https://js-member-backend.vercel.app/subadmincampusers/${emailId}`)
            const data = await response.json();
            const {subadminList} = data
            console.log(subadminList[0])
      }
      else
      {
        const response = await fetch(`https://js-member-backend.vercel.app/campusers/${emailId}`)
        const data = await response.json()
        console.log(data);
      }
    }
      catch(Err){
        console.log(`Error Occurred : ${Err}`);
      }
    };

    // Call getVideos only once on mount
    getVideos();
  }, []); // Empty dependency array means it runs only once on mount

  const onClickLogOut = () => {
    googleLogout()
    Cookies.remove("isAdmin");
    Cookies.remove("campuseremail");
    Cookies.remove("isSubAdmin");
    Cookies.remove("campId");
    window.location.href="/"
  }

  return (
    <div className='main-profile-container'>
      <div className='main-header-container'>
        <h1 className='main-heading'>Profile</h1>
      </div>
      <div className='main-content'>
      <div className='profile-top-container'>
        <img src="https://res.cloudinary.com/dvwnbhpcy/image/upload/v1715776970/istockphoto-1495088043-612x612-removebg-preview_hdifqs.png" alt="profile" className='profile-logo' />
        <p className='profile-name'>{name}</p>
        <p className='profile-number'>{mobileno}</p>
        <p className='profile-number'>Camp Cluster : {campCluster}</p>
      </div>
      <div className='profile-bottom-container'>
        {/* <div className='profile-bottom-name'>
          <FaUser className='profile-bottom-logo'/> Name
        </div>
        <div className='profile-bottom-number'>
          <FaPhone className='profile-bottom-logo'/> Number
        </div> */}
        <div className='profile-bottom-email'>
          <FaEnvelope className='profile-bottom-logo'/> {emailId}
        </div>
        <div className='profile-bottom-email' style={{color:'white'}}>
          <Link to="/kyc" style={{textDecoration:'none',color: 'white'}}>
          <BiIdCard className='profile-bottom-logo'/> KYC
          </Link>
        </div>
        {/* <div className='profile-bottom-camp-id'>
          <FaIdCard className='profile-bottom-logo'/> Camp ID
        </div> */}
        {/* <div className='profile-bottom-aadhar'>
          <FaLock className='profile-bottom-logo'/> Aadhar
        </div> */}
        {/* <div className='profile-bottom-about'>
          <FaInfoCircle className='profile-bottom-logo'/> About
        </div> */}
        {/* <div className='profile-bottom-referral'>
          <FaUserFriends className='profile-bottom-logo'/> Referral
        </div> */}
        {/* <div className='profile-bottom-network'>
          <FaNetworkWired className='profile-bottom-logo'/> Network
        </div> */}
        <div className='profile-bottom-feedback'>
          <FaComment className='profile-bottom-logo'/> Feedback
        </div>
        <div className='profile-bottom-help'>
          <FaQuestionCircle className='profile-bottom-logo'/> Help
        </div>
        {/* New element for address */}
        {/* <div className='profile-bottom-address'>
          <FaMapMarkerAlt className='profile-bottom-logo'/> Address
        </div> */}
        <div style={{textAlign:'center'}}>
        <button onClick={onClickLogOut} className="delete-Btn" type="button">Log Out</button>
          </div>
      </div>
      </div>
      <Footer />
    </div>
  );
}

export default AdminProfile;
