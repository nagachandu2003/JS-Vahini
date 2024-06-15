import React, { useState,useEffect } from 'react';
import Footer from '../../Footer'
import './index.css'; // Import the CSS file for styling
import QRCode from 'react-qr-code'; // Import QRCode component
import Cookies from 'js-cookie'

const Whatsapp = () => {
  const [activeTab, setActiveTab] = useState(0); // State to manage active tab
  const [users,setUsers] = useState([])
  const campCluster = Cookies.get("campId")

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const getVideos = async () => {
      setIsLoading(true)
      try{
        const response = await fetch(`https://js-member-backend.vercel.app/getwhatsappreportdata/${campCluster}`);
            const data = await response.json() 
            const filteredList = (data.result).filter((ele) => (ele.campCluster===campCluster && ele.addedByemail===Cookies.get("campuseremail")))
            setUsers(filteredList)
            // setUsers(data)
            setIsLoading(false)
      }
      catch(Err){
        console.log(`Error Occurred : ${Err}`);
      }
    };

    // Call getVideos only once on mount
    getVideos();
  }, []); // Empty dependency array means it runs only once on mount


  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  const phoneNumber = "+919972968390";
  const whatsappURL = `https://wa.me/${phoneNumber}?text=Hello`;

  return (
    <>
    <div className="whatsapp-container">
      <div className='whatsapp-main-header-container'>
        <h1 className='whatsapp-main-heading'>WhatsApp</h1>
      </div>
      <div className="whatsapp-upper-tabs-container">
        <div
          className={`whatsapp-upper-tab ${activeTab === 0 ? 'active' : ''}`}
          onClick={() => handleTabClick(0)}
        >
          QR Code
        </div>
        <div
          className={`whatsapp-upper-tab ${activeTab === 1 ? 'active' : ''}`}
          onClick={() => handleTabClick(1)}
        >
          List
        </div>
      </div>
      <div className="whatsapp-content-container">
        {/* Content for My Code tab */}
        <div className={`whatsapp-tab-content ${activeTab === 0 ? 'active' : ''}`}>
          <div className="whatsapp-container">
            <div className="whatsapp-qr-container">
              <h2 className="whatsapp-qr-heading">Scan the QR Code to Message on WhatsApp</h2>
              <QRCode value={whatsappURL} size={200} className='qr-code'/>
              <p className="whatsapp-info">Scan this QR code with WhatsApp to join group</p>
            </div>
          </div>
        </div>
        {/* Content for Numbers tab */}
        <div className={`whatsapp-tab-content ${activeTab === 1 ? 'active' : ''}`}>
          <h2>WhatsApp Groups List</h2>
          {isLoading===false && (
            <>
            {users.map((ele) => (
              <div>
                <h4>District : {ele.district} Block : {ele.block}</h4>
                <a href={ele.whatsappgrouplink} target="_blank" rel="noreferrer"><p>Group Link</p></a>
              </div>
            )
            
            )}
            </>
          )}
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default Whatsapp;
