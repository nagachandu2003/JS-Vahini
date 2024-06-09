import React, { useState,useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';
import { RiArrowRightSLine } from "react-icons/ri";
import Footer from '../../Footer'
import Cookies from 'js-cookie'
import {v4 as uuidv4} from 'uuid'
import {Popup} from 'reactjs-popup'
import { MdDelete } from 'react-icons/md';


import './index.css'; // Import CSS file

const Collateral = () => {
  const [showForm, setShowForm] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null); // Track selected item index
  const campCluster = Cookies.get("campId")

  // useEffect(() => {
  //   const getSS = localStorage.getItem("collateraldata");
  //   if (getSS) {
  //     setUsers(JSON.parse(getSS));
  //   }
  // }, []); 

  const onDeleteCollateral = (value) => {
    const filteredList = users.filter((ele) => ele.id!==value)
    setUsers(filteredList)
    localStorage.setItem("collateraldata", JSON.stringify(filteredList))
  }

  function handleSave(userData) {
    const newData = [userData,...users] 
    localStorage.setItem("collateraldata", JSON.stringify(userData))
      setUsers(newData);
      // setPhoto(null); 
    setShowForm(false);
  }

  const FormComponent = ({ onSave, onClose }) => {
    const [collateralDate, setActivityDate] = useState('');
  const [visitingCard, setVisitingCard] = useState('');
  const [nameSticker, setNameSticker] = useState('');
  const [mobileSticker, setMobileSticker] = useState('');
  const [pamphlet, setPamphlet] = useState('');
  const [doorSticker, setDoorSticker] = useState('');
  const [flag, setFlag] = useState('');
  const [medal, setMedal] = useState('');
  const [certificate, setCertificate] = useState('');

  
    const handleSubmit = (e) => {
      e.preventDefault();
      const currentDate = (new Date()).toLocaleDateString('en-GB');
      const currentTime = (new Date()).toLocaleTimeString();
      onSave({
        id:uuidv4(),
        collateralDate,
        visitingCard,
        nameSticker,
        mobileSticker,
        pamphlet,
        doorSticker,
        flag,
        medal,
        certificate,
        date : currentDate,
        time : currentTime,
        campCluster,
        email:Cookies.get("campuseremail")
      });

      // Reset input fields after submission

    };
  
    const handleCancel = () => {
      onClose();
    };
 

    return (
      <>
      <div className="form-container active"> {/* Add overflow style */}
        <form className="d2d-form" onSubmit={handleSubmit}>
          <h1 className='popup-heading'>Collateral Used Report</h1>
          <label htmlFor="activityDate" className="form-label">Select Date:</label>
          <input
            type="date"
            id="activityDate"
            placeholder='Enter the date'
            className="ytmcregister-user-input"
            value={collateralDate}
            onChange={(e) => setActivityDate(e.target.value)}
            required
          />
          <label htmlFor="visitingCard" className="form-label">Visiting Card:</label>
          <input
          placeholder='Enter Visiting Card'
            type="text"
            id="visitingCard"
            className="ytmcregister-user-input"
            value={visitingCard}
            onChange={(e) => setVisitingCard(e.target.value)}
            required
          />
          <label htmlFor="nameSticker" className="form-label">Name Sticker:</label>
          <input
          placeholder='Enter Name Sticker'
            type="text"
            id="nameSticker"
            className="ytmcregister-user-input"
            value={nameSticker}
            onChange={(e) => setNameSticker(e.target.value)}
            required
          />
          <label htmlFor="mobileSticker" className="form-label">Mobile Sticker:</label>
          <input
            type="text"
            placeholder='Enter Mobile Sticker'
            id="mobileSticker"
            className="ytmcregister-user-input"
            value={mobileSticker}
            onChange={(e) => setMobileSticker(e.target.value)}
            required
          />
          <label htmlFor="pamphlet" className="form-label">Pamphlet:</label>
          <input
            type="text"
            id="pamphlet"
            placeholder='Enter the Pamphlet'
            className="ytmcregister-user-input"
            value={pamphlet}
            onChange={(e) => setPamphlet(e.target.value)}
            required
          />
          <label htmlFor="doorSticker" className="form-label">Door Sticker:</label>
          <input
            type="text"
            id="doorSticker"
            placeholder='Enter the Door Sticker'
            className="ytmcregister-user-input"
            value={doorSticker}
            onChange={(e) => setDoorSticker(e.target.value)}
            required
          />
          <label htmlFor="flag" className="form-label">Flag:</label>
          <input
            type="text"
            id="flag"
            placeholder='Enter the flag'
            className="ytmcregister-user-input"
            value={flag}
            onChange={(e) => setFlag(e.target.value)}
            required
          />
          <label htmlFor="medal" className="form-label">Medal:</label>
          <input
            type="text"
            id="medal"
            placeholder='Enter the Medal'
            className="ytmcregister-user-input"
            value={medal}
            onChange={(e) => setMedal(e.target.value)}
            required
          />
          <label htmlFor="certificate" className="form-label">Certificate:</label>
          <input
          placeholder='Enter the Certificate'
            type="text"
            id="certificate"
            className="ytmcregister-user-input"
            value={certificate}
            onChange={(e) => setCertificate(e.target.value)}
            required
          />
          <div style={{marginTop:'10px'}} className='cancel-submit-btn-container'>
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
        <h1 className='main-d2d'>Collateral</h1>
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
              <li className="empty-list">The Collateral List is Empty. Click on the New to Add Collateral</li>
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
                {/* <p className='list-d2d-name'>Activity</p> */}
                <p className='list-d2d-name'>Date & Time: {user.date} & {user.time}</p>
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
  <li className="users-list" style={{height:'300px',overflowY:'auto'}}>
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
        <td className="value">{users[selectedItem].date} & {users[selectedItem].time}</td>
      </tr>
      <tr>
        <td className="parameter">Collateral Date</td>
        <td className="value">{users[selectedItem].collateralDate}</td>
      </tr>
      <tr>
        <td className="parameter">Visiting Card</td>
        <td className="value">{users[selectedItem].visitingCard}</td>
      </tr>
      <tr>
        <td className="parameter">Name Sticker</td>
        <td className="value">{users[selectedItem].nameSticker}</td>
      </tr>
      <tr>
        <td className="parameter">Mobile Sticker</td>
        <td className="value">{users[selectedItem].mobileSticker}</td>
      </tr>
      <tr>
        <td className="parameter">Pamphlet</td>
        <td className="value">{users[selectedItem].pamphlet}</td>
      </tr>
      <tr>
        <td className="parameter">Door Sticker</td>
        <td className="value">{users[selectedItem].doorSticker}</td>
      </tr>
      <tr>
        <td className="parameter">Flag</td>
        <td className="value">{users[selectedItem].flag}</td>
      </tr>
      <tr>
        <td className="parameter">Medal</td>
        <td className="value">{users[selectedItem].medal}</td>
      </tr>
      <tr>
        <td className="parameter">Certificate</td>
        <td className="value">{users[selectedItem].certificate}</td>
      </tr>
      </tbody>
      {/* <tr>
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
      </tr> */}
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
export default Collateral;
