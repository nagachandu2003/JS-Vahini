import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import './index.css'; // Import the CSS file for styling

const Photos = () => {
  const [activeTab, setActiveTab] = useState(0); // State to manage active tab
  const [capturedImages, setCapturedImages] = useState([]);
  const webcamRef = useRef(null);
  const [location, setLocation] = useState('');

  const captureImage = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    const imageData = {
      src: imageSrc,
      location: null // We'll update this with location data later
    };
    setCapturedImages(prevImages => [...prevImages, imageData]);
    getLocation(); // Fetch user's location when capturing the image
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

  const fetchLocation = async (latitude, longitude) => {
    try {
      const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`);
      const data = await response.json();
      const { city, principalSubdivision, countryName } = data;
      const locationData = { city, region: principalSubdivision, country: countryName };
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
                <div className='capture-button-container'>                <button onClick={captureImage} className="capture-button">Capture</button>
</div>
              </div>
              <div className="image-list-container">
                {capturedImages.map((image, index) => (
                  <div className="image-item" key={index}>
                    <img src={image.src} alt={`captured-${index}`} className="captured-image" />
                    {image.location && (
                      <div className="location-info">
                        <h3>City: <span>{image.location.city}</span></h3>
                        <h3>State: <span>{image.location.region}</span></h3>
                        <h3>Country: <span>{image.location.country}</span></h3>
                      </div>
                    )}
                  </div>
                ))}
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
    </>
  );
};

export default Photos;
