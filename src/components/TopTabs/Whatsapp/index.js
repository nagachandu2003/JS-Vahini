import React, { useState, useEffect } from 'react';
import './index.css';
import { FaRegFileAlt } from 'react-icons/fa';
import { PiPresentationChartBold } from 'react-icons/pi';
import { FcReadingEbook } from 'react-icons/fc';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import Footer from '../../Footer';
import Cookies from 'js-cookie'
import { ThreeDots } from 'react-loader-spinner';
// import TrendingItem from '../TrendingItem';

const Whatsapp = () => {
  const [activeTab, setActiveTab] = useState('qrcode');
  const [popupVisible, setPopupVisible] = useState(false);
  const [videosList, setVideosList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [videosList2, setVideosList2] = useState([]);
  const [isLoading2, setIsLoading2] = useState(false);
  const campCluster = Cookies.get("campId");


  useEffect(() => {
    const getVideos = async () => {
      setIsLoading(true)
      try{
        const response = await fetch(`https://js-member-backend.vercel.app/getwhatsappreportdata/${campCluster}`);
        if(response.ok)
          {
            const data = await response.json()
            const filteredList = (data.result).filter((ele) => ele.campCluster===campCluster)
            setVideosList(filteredList);
            setIsLoading(false);
          }
      }
      catch(Err){
        console.log(`Error Occurred : ${Err}`);
      }
    };

    // Call getVideos only once on mount
    getVideos();
  }, []); // Empty dependency array means it runs only once on mount


  console.log(videosList)





  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };


  return (
    <>
    <div style={{backgroundColor:'black',minHeight:'100vh'}}>
      <header className="task-main-header-container">
        <h1 className="main-heading">WhatsApp</h1>
      </header>
      <nav style={{backgroundColor:'black'}} className="task-tabs-container">
        <div style={{backgroundColor:'black',color:'white'}}
          className={`task-tab ${activeTab === 'qrcode' ? 'active' : ''}`}
          onClick={() => handleTabClick('qrcode')}
        >
          QR Code
        </div>
        <div style={{backgroundColor:'black',color:'white'}}
          className={`task-tab ${activeTab === 'list' ? 'active' : ''}`}
          onClick={() => handleTabClick('list')}
        >
          List
        </div>
        <div className="task-tab-slider" style={{ left: activeTab === 'qrcode' ? '50%' : '0' }} />
      </nav>
      <main style={{marginTop:'70px'}}>
        {activeTab === 'qrcode' && (
          <section>
            {isLoading===true && (
                    <div className="ytmchome-content-container" style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                        <ThreeDots color="gray" height={50} width={50}/>
                    </div>
                )}
          {isLoading===false && (
          <div style={{marginTop:'0'}} className="ytmchome-content-container">
            {(videosList===undefined || videosList.length === 0) ? (
              <p>Please add Videos</p>
            ) : (
              <ul style={{paddingLeft:0,listStyleType:'none'}}>
                {videosList.map((ele) => (
                  <li style={{textAlign:'center',padding:'10px',margin:'10px',borderRadius:'8px'}}>
                    <img src={ele.whatsappqrcode} height="200" width="200" alt="whatsappqr"/>
                  </li>
                ))}
              </ul>
            )}
          </div>
          )}
          </section>
        )}
        {activeTab === 'list' && (
          <section>
            {isLoading===true && (
                    <div className="ytmchome-content-container" style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                        <ThreeDots color="gray" height={50} width={50}/>
                    </div>
                )}
          {isLoading===false && (
          <div style={{marginTop:'0'}} className="ytmchome-content-container">
            {(videosList===undefined || videosList.length === 0) ? (
              <p>Please add Videos</p>
            ) : (
              <ul style={{paddingLeft:0,listStyleType:'none'}}>
              {videosList.map((ele) => (
                <li style={{backgroundColor:'white',textAlign:'center',padding:'10px',margin:'10px',borderRadius:'8px'}}>
                  <div style={{textAlign:'left'}}>
                    <h4>District : {ele.district} & Block : {ele.block}</h4>
                    <p>Date & Time : {ele.date} & {ele.time}</p>
                    <a href={ele.whatsappgrouplink} target="_blank" rel="noreferrer"><p>Group Link</p></a>
                  </div>
                </li>
              ))}
            </ul>
            )}
          </div>
          )}
          </section>
        )}
      </main>
      {popupVisible && (
        <div className="task-popup">
          {/* Popup content */}
          {/* Modify and structure popup content here */}
        </div>
      )}
      </div>
      <Footer />
    </>
  );
};

export default Whatsapp;