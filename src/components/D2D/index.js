import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { RiArrowRightSLine } from "react-icons/ri";
import Footer from '../Footer'

import './index.css'; // Import CSS file

const D2D = () => {
  const [showForm, setShowForm] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null); // Track selected item index


  // const [photo, setPhoto] = useState(null);
  // const [location, setLocation] = useState(null); // Define location state
  // const [facingMode, setFacingMode] = useState('user'); // Default to user (front) camera
  // const videoRef = useRef();

  // const handleStartCamera = () => {
  //   // Explicitly set facingMode to 'user' (front camera) initially
  //   setFacingMode('user');
  //   navigator.mediaDevices.getUserMedia({ video: { facingMode } })
  //     .then((stream) => {
  //       videoRef.current.srcObject = stream;
  //       getLocation();
  //     })
  //     .catch((error) => {
  //       console.error('Error accessing camera:', error);
  //     });
  // };

  // const handleCapture = () => {
  //   console.log("Capturing image...");
  //   const canvas = document.createElement('canvas');
  //   canvas.width = videoRef.current.videoWidth;
  //   canvas.height = videoRef.current.videoHeight;
  //   canvas.getContext('2d').drawImage(videoRef.current, 0, 0, canvas.width, canvas.height); // Ensure the entire image is captured
  //   const capturedImg = canvas.toDataURL('image/png');
  //   console.log("Captured image:", capturedImg);
  //   setPhoto({ imgSrc: capturedImg, location });
  // };
  // const getLocation = () => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       const latitude = position.coords.latitude;
  //       const longitude = position.coords.longitude;
  //       const locationString = `Latitude: ${latitude}, Longitude: ${longitude}`;
  //       setLocation(locationString);
  //     });
  //   } else {
  //     setLocation('Geolocation is not supported by this browser.');
  //   }
  // };

  // const toggleCameraFacingMode = () => {
  //   setFacingMode((prevMode) => (prevMode === 'user' ? 'environment' : 'user'));
  // };

  // useEffect(() => {
  //   const startCamera = async () => {
  //     await handleStartCamera();
  //   };
  //   startCamera();
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [facingMode]); // Restart camera when facing mode changes

  function handleSave(userData) {
    if (userData) {
      // Set the default name as d2d1, d2d2, d2d3, ...
      const defaultName = `D2D${users.length + 1}`;
      // const userWithPhotos = { ...userData, name: defaultName, photo };
      const d2dName = { ...userData, name: defaultName };
      setUsers([...users, d2dName]);
      // setPhoto(null); 
    }
    setShowForm(false);
  }

  const FormComponent = ({ onSave, onClose }) => {
    const [villageName, setVillageName] = useState('');
    const [villagePopulation, setVillagePopulation] = useState('');
    const [totalHouseholdCovered, setTotalHouseholdCovered] = useState('');
    const [youtubeSubscription, setYoutubeSubscription] = useState('');
    const [totalWhatsAppGroupAdded, setTotalWhatsAppGroupAdded] = useState('');
    const [totalFoundingMemberAdded, setTotalFoundingMemberAdded] = useState('');
    const [district, setDistrict] = useState('');
    const [block, setBlock] = useState('');
    const [panchayat, setPanchayat] = useState('');

  
    const handleSubmit = (e) => {
      e.preventDefault();
      const currentTime = new Date().toLocaleString();
      onSave({
        villageName,
        villagePopulation,
        totalHouseholdCovered,
        youtubeSubscription,
        totalWhatsAppGroupAdded,
        totalFoundingMemberAdded,
        district,
        block,
        panchayat,
        time: currentTime
      });
      // Reset input fields after submission
      setVillageName('');
      setVillagePopulation('');
      setTotalHouseholdCovered('');
      setYoutubeSubscription('');
      setTotalWhatsAppGroupAdded('');
      setTotalFoundingMemberAdded('');
      setDistrict('');
      setBlock('');
      setPanchayat('');
    };
  
    const handleCancel = () => {
      onClose();
    };
 

    return (
      <>
      <div className="form-container active" style={{ overflow: 'auto' }}> {/* Add overflow style */}
        <form className="d2d-form" onSubmit={handleSubmit}>
          <h1 className='popup-heading'>Enter the D2D Details</h1>
          {/* <div className="camera-container">
            <div className="camera-preview">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="video-preview"
              />
            </div>
            <div className="camera-controls">
              <button className="btn-toggle-camera" onClick={toggleCameraFacingMode}>Start Camera<MdCameraswitch className='camera-icons' /></button>
              <button className="btn-capture" onClick={handleCapture}>Capture<FaCamera className='camera-icons' /></button>
            </div>
            {photo && (
              <div className="photo-preview">
                <img src={photo.imgSrc} alt="Captured" className='captured-image'/>
                <p>{photo.location}</p>
              </div>
            )}
          </div> */}
         <label htmlFor="villageName" className="form-label">Village Name:</label>
        <input
          type="text"
          id="villageName"
          className="form-input"
          placeholder="Enter Village Name"
          value={villageName}
          onChange={(e) => setVillageName(e.target.value)}
          required
        />
        <label htmlFor="villagePopulation" className="form-label">Village Population:</label>
<input
  type="text"
  id="villagePopulation"
  className="form-input"
  placeholder="Enter Village Population"
  value={villagePopulation}
  onChange={(e) => {
    const inputValue = e.target.value;
    // Check if the input value is a valid integer
    if (/^\d*$/.test(inputValue)) {
      // If it's a valid integer, update the state
      setVillagePopulation(inputValue);
    }
    // If it's not a valid integer, do nothing (or you could provide feedback to the user)
  }}
  required
/>

        <label htmlFor="totalHouseholdCovered" className="form-label">Total Household Covered:</label>
        <input
          type="text"
          id="totalHouseholdCovered"
          className="form-input"
          placeholder="Enter Total Household Covered"
          value={totalHouseholdCovered}
          onChange={(e) => setTotalHouseholdCovered(e.target.value)}
          required
        />
        <label htmlFor="youtubeSubscription" className="form-label">YouTube Subscription:</label>
        <input
          type="text"
          id="youtubeSubscription"
          className="form-input"
          placeholder="Enter YouTube Subscription"
          value={youtubeSubscription}
          onChange={(e) => setYoutubeSubscription(e.target.value)}
          required
        />
        <label htmlFor="totalWhatsAppGroupAdded" className="form-label">Total WhatsApp Group Added:</label>
        <input
          type="text"
          id="totalWhatsAppGroupAdded"
          className="form-input"
          placeholder="Enter Total WhatsApp Group Added"
          value={totalWhatsAppGroupAdded}
          onChange={(e) => setTotalWhatsAppGroupAdded(e.target.value)}
          required
        />
        <label htmlFor="totalFoundingMemberAdded" className="form-label">Total Founding Member Added:</label>
        <input
          type="text"
          id="totalFoundingMemberAdded"
          className="form-input"
          placeholder="Enter Total Founding Member Added"
          value={totalFoundingMemberAdded}
          onChange={(e) => setTotalFoundingMemberAdded(e.target.value)}
          required
        />
        <label htmlFor="district" className="form-label">District:</label>
        <input
          type="text"
          id="district"
          className="form-input"
          placeholder="Enter District"
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
          required
        />
        <label htmlFor="block" className="form-label">Block:</label>
        <input
          type="text"
          id="block"
          className="form-input"
          placeholder="Enter Block"
          value={block}
          onChange={(e) => setBlock(e.target.value)}
          required
        />
        <label htmlFor="panchayat" className="form-label">Panchayat:</label>
        <input
          type="text"
          id="panchayat"
          className="form-input"
          placeholder="Enter Panchayat"
          value={block}
          onChange={(e) => setBlock(e.target.value)}
          required
        />
          <div className='cancel-submit-btn-container'>
          <button type="button" className="btn-cancel" onClick={handleCancel}>Cancel</button>
          <button type="submit" className="btn-submit">Submit</button>
          </div>
        </form>
      </div>
      <Footer/>
      </>
    );
  };

  return (
    <>
    <div>
      <div className='main-header-container'>
        <h1 className='main-d2d'>D2D</h1>
      </div>
      <div className='d2d-container'>
        <div className={showForm ? "overlay" : "overlay hidden"} onClick={() => setShowForm(false)}></div>
        {showForm && <FormComponent onSave={handleSave} onClose={() => setShowForm(false)} />}
        <div className="floating-button" onClick={() => setShowForm(!showForm)}>
          <span>New</span>
          <FaPlus className="plus-icon" />
        </div>
        <ul className={selectedItem !== null ? "userList popup" : "userList"}>
          {users.length === 0 ? (
            <div className='empty-list-container'>
              <li className="empty-list">The D2D List is Empty. Click on the New to Add D2D Report</li>
            </div>
          ) : (
            users.map((user, index) => (
              <li key={index} className="d2d-users-list" onClick={() => setSelectedItem(index)}>
                 {/* user.photo && (
                  <div className="d2d-photo-item">
                    <img src={user.photo.imgSrc} alt="Captured" className='d2d-photo'/>
                      <p>Location: {user.photo.location}</p>
                  </div>
                ) */}
                <div className='d2d-list-column'>
                <p className='list-d2d-name'>D2D : {user.block},{user.district}</p>
                <p className='list-d2d-time'>Date & Time: {user.time}</p>
                </div>
                <p><RiArrowRightSLine className='side-arrow' /></p>             
              </li>
            ))
          )}
        </ul>
        {selectedItem !== null && (
          <div className="popup">
            <div className="popup-content">
              <span className="close" onClick={() => setSelectedItem(null)}>&times;</span>
             
              <ul className="userList">
  <li className="users-list">
    <table className="userTable">
      <tr>
        <th className="parameterHeader">Parameters</th>
        <th className="valueHeader">Values</th>
      </tr>
      <tr>
        <td className="parameter">Village Name</td>
        <td className="value">{users[selectedItem].villageName}</td>
      </tr>
      <tr>
        <td className="parameter">Date & Time</td>
        <td className="value">{users[selectedItem].time}</td>
      </tr>
      <tr>
        <td className="parameter">Village Population</td>
        <td className="value">{users[selectedItem].villagePopulation}</td>
      </tr>
      <tr>
        <td className="parameter">Total Household Covered</td>
        <td className="value">{users[selectedItem].totalHouseholdCovered}</td>
      </tr>
      <tr>
        <td className="parameter">YouTube Subscription</td>
        <td className="value">{users[selectedItem].youtubeSubscription}</td>
      </tr>
      <tr>
        <td className="parameter">Total WhatsApp Group Added</td>
        <td className="value">{users[selectedItem].totalWhatsAppGroupAdded}</td>
      </tr>
      <tr>
        <td className="parameter">Total Founding Member Added</td>
        <td className="value">{users[selectedItem].totalFoundingMemberAdded}</td>
      </tr>
      <tr>
        <td className="parameter">District</td>
        <td className="value">{users[selectedItem].district}</td>
      </tr>
      <tr>
        <td className="parameter">Block</td>
        <td className="value">{users[selectedItem].block}</td>
      </tr>
      <tr>
        <td className="parameter">Village Panchayat</td>
        <td className="value">{users[selectedItem].villagePanchayat}</td>
      </tr>
      <tr>
        <td className="parameter">Village</td>
        <td className="value">{users[selectedItem].village}</td>
      </tr>
      <tr>
        <td className="parameter">Panchayat</td>
        <td className="value">{users[selectedItem].pachayat}</td>
      </tr>
    </table>
  </li>
</ul>

            </div>
          </div>
        )}
      </div>
    </div>
    <Footer/>
    </>
  );
}
export default D2D;
