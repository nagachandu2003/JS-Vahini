import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import './index.css'; // Import the CSS file for styling
import { FaCamera } from "react-icons/fa";
import Footer from '../../Footer';
import { FaTimes } from 'react-icons/fa';
import {v4 as uuidv4} from 'uuid'
import { Popup } from 'reactjs-popup';
import { IoClose } from "react-icons/io5";

const Selfie = () => {
  const [activeTab, setActiveTab] = useState(0); // State to manage active tab
  const [capturedImages, setCapturedImages] = useState([]);
  const webcamRef = useRef(null);
  const [location, setLocation] = useState('');
  const [date,setDate] = useState('');
  const [capturedImage,setCapturedImage] = useState(null)
  const [isCameraOpen, setIsCameraOpen] = useState(false)

  const captureImage = async () => {
    // const imageSrc = webcamRef.current.getScreenshot();
    const imageData = {
      id:uuidv4(),
      src: capturedImage,
      location: getLocation(),
      date : (new Date()).toLocaleDateString('en-GB'),
      time : (new Date()).toLocaleTimeString() // We'll update this with location data later
    };
    setCapturedImages(prevImages => [...prevImages, imageData]);
    await getLocation(); // Fetch user's location when capturing the image
    setIsCameraOpen(false)
    setCapturedImage(null)
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        fetchLocation(latitude, longitude);
      });
    } else {
      setLocation('Location not available');
    }
  };

  const handleRetake = () => {
    setCapturedImage(null);
  };

  const fetchLocation = async (latitude, longitude) => {
    try {
      const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`);
      const data = await response.json();
      const { city, principalSubdivision, countryName} = data;
      const locationData = { city, region: principalSubdivision, country: countryName ,latitude,longitude};
      updateLastCapturedImageLocation(locationData);
    } catch (error) {
      console.error('Error fetching location:', error);
      setLocation('Location not available');
    }
  };

  const updateLastCapturedImageLocation = locationData => {
    setCapturedImages(prevImages => {
      const lastImageIndex = prevImages.length - 1;
      const updatedImages = [...prevImages];
      updatedImages[lastImageIndex].location = locationData;
      return updatedImages;
    });
  };
  
  return (
    <>
    {!isCameraOpen && (
      <>
      <div style={{backgroundColor:'black',color:'white'}} className="photos-container">
        <div className='photos-main-header-container'>
          <h1 className='photos-main-heading'>Household (Selfie)</h1>
        </div>
        <div style={{backgroundColor:'black',color:'white'}} className="photos-upper-tabs-container">
          <div
            className={`photos-upper-tab ${activeTab === 0 ? 'active' : ''}`}
            onClick={() => setActiveTab(0)}
          >
            List
          </div>
          <div
            className={`photos-upper-tab ${activeTab === 1 ? 'active' : ''}`}
            onClick={() => setActiveTab(1)}
          >
            Maps
          </div>
        </div>
        <div className="photos-content-container">
          {/* Content for Photos tab */}
          <div style={{backgroundColor:'black',color:'white'}} className={`photos-tab-content ${activeTab === 0 ? 'active' : ''}`}>
            <div className="photos-container">
              {/* Webcam and Image List */}
                <div className='capture-button-container'>                
                <button style={{borderRadius:'5px',borderWidth:0}} onClick={() => setIsCameraOpen(true)} className="floating-button">
                  <FaCamera size={30}/>
                </button>
              </div>
              <div style={{backgroundColor:'black',color:'white',width:'100%'}} className="image-list-container">
              {capturedImages.length===0 && (<p>Please add photos to capture</p>)}
                {capturedImages.length!==0 && (
                  <>
                  {
                    capturedImages.map((image, index) => (
                      <div className="image-item-cont" key={index}>
                        <img src={image.src} alt={`captured-${index}`} className="image-item-size" />
                        {image.location && (
                          <div className="location-info">
                            <p>{image.date} & {image.time}</p>
                            <p><span>{image.location.latitude} & {image.location.longitude}</span></p>
                            <Popup
                    trigger={<button className='edit-Btn' style={{borderRadius:'3px'}} type="button">View</button>}
                    modal
                    nested
                    contentStyle={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: '9999' }}
                    overlayStyle={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: '9998' }}
                    >
                    {close => (
                        <div style={{height:'400px',backgroundColor:'white'}} className="modal rcyt-custom-popup">
                          <div style={{textAlign:'right'}} className="actions">
                            <button className="button" style={{backgroundColor:'transparent',borderWidth:'0px',position:'relative',top:'2px'}} onClick={() => {
                            console.log('modal closed');
                            close();
                            }}><IoClose size={20}/></button>
                        </div>
                        <div style={{backgroundColor:'white'}} className="content rcyt-popup-cont">
                            <table className="userTable">
                  <thead>
                <tr>
                    <th className="parameterHeader">Parameters</th>
                    <th className="valueHeader">Values</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td className="parameter">Date & Time</td>
                    <td className="value">{image.date} & {image.time}</td>
                </tr>
                <tr>
                    <td className="parameter">Latitude</td>
                    <td className="value">{image.location.latitude}</td>
                </tr>
                <tr>
                    <td className="parameter">Longitude</td>
                    <td className="value">{image.location.longitude}</td>
                </tr>
                <tr>
                    <td className="parameter">City</td>
                    <td className="value">{image.location.city}</td>
                </tr>
                <tr>
                    <td className="parameter">State</td>
                    <td className="value">{image.location.region}</td>                    
                </tr>
                <tr>
                    <td className="parameter">Country</td>
                    <td className="value">{image.location.country}</td>                    
                </tr>
                </tbody>
                </table>
                        </div>
                        </div>
                    )}
                    </Popup>
                            {/* <h3>City: <span>{image.location.city}</span></h3>
                            <h3>State: <span>{image.location.region}</span></h3>
                            <h3>Country: <span>{image.location.country}</span></h3> */}
                          </div>
                        )}
                      </div>
                    ))
                  }
                  </>
                )}
              </div>
            </div>
          </div>
          {/* Content for Maps tab */}
          <div className={`photos-tab-content ${activeTab === 1 ? 'active' : ''}`}>
            <div className="photos-container">
              {/* Placeholder for Maps content */}
              {/* Replace this with your Maps component */}
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
              )}
      <div style={{ height: '90vh' }}>
      {isCameraOpen && (
        <div style={{ height: '100vh', position: 'relative' }}>
          {capturedImage ? (
            <div style={{ backgroundColor:'black',color:'white', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <h1>Captured Image</h1>
              <img src={capturedImage} alt="Captured" style={{ maxHeight: '80%', maxWidth: '100%' }} />
              <div style={{ height: '10%', display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                <button className='retakeBtn' onClick={handleRetake} style={{ marginRight: '1rem' }}>
                  Retake
                </button>
                <button className='saveBtn' onClick={captureImage}>
                  Save & Submit
                </button>
              </div>
            </div>
          ) : (
            <div style={{ height: '100%' }}>
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                style={{ height: '90%', width: '100%', objectFit: 'cover' }}
              />
              <div style={{ height: '10%', backgroundColor: 'black', display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                <button onClick={() => {
                      const imageSrc = webcamRef.current.getScreenshot();
                      setCapturedImage(imageSrc)
                }} style={{backgroundColor: 'transparent',borderWidth:'0',marginRight: '1rem' }}>
                  <FaCamera color='yellow' size={30} />
                </button>
                <button style={{backgroundColor: 'transparent',borderWidth:'0'}} onClick={() => setIsCameraOpen(false)}>
                  <FaTimes color="#fff" size={30} />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
    </>


  );
};

export default Selfie;
