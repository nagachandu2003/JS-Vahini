import React, { useState, useRef } from 'react';
import Footer from '../../Footer';
import Webcam from 'react-webcam';
import Maps from '../Maps';
import './index.css'; // Import the CSS file for styling

const Photos = () => {
  const [activeTab, setActiveTab] = useState(0); // State to manage active tab
  const [capturedImages, setCapturedImages] = useState([]);
  const [location, setLocation] = useState('');
  const webcamRef = useRef(null);

  const handleImageCapture = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    getLocation(); // Fetch user's location when capturing the image
    setCapturedImages([...capturedImages, { src: imageSrc, alt: 'Captured Image', location }]);
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        fetchLocation(latitude, longitude);
      });
    } else {
      setLocation('Location not available');
    }
  };

  const fetchLocation = async (latitude, longitude) => {
    try {
      const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`);
      const data = await response.json();
      const { principalSubdivision, city, locality, district } = data;
      setLocation(`${locality}, ${district}, ${city}, ${principalSubdivision}`);
    } catch (error) {
      console.error('Error fetching location:', error);
      setLocation('Location not available');
    }
  };

  return (
    <>
      <div className="photos-container">
        <div className='photos-main-header-container'>
          <h1 className='photos-main-heading'>Photos</h1>
        </div>
        <div className="photos-upper-tabs-container">
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
          <div className={`photos-tab-content ${activeTab === 0 ? 'active' : ''}`}>
            <div className="photos-container">
              {/* Webcam and Image List */}
              <div className="camera-container">
                <Webcam
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  width={320} // Adjusted width for mobile devices
                  height={240} // Adjusted height for mobile devices
                />
                <button onClick={handleImageCapture} className="capture-button">Capture</button>
              </div>
              <div className="image-list-container">
                {capturedImages.map((image, index) => (
                  <div className="image-item" key={index}>
                    <img src={image.src} alt={image.alt} className="image" />
                    <div className="image-location">{image.location}</div> {/* Display location */}
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Content for Maps tab */}
          <div className={`photos-tab-content ${activeTab === 1 ? 'active' : ''}`}>
            <div className="photos-container">
              {/* Placeholder for Maps content */}
             <Maps/>
              {/* Add your content here */}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Photos;
