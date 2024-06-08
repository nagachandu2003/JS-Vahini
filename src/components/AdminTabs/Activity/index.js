import React, { useState,useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';
import { RiArrowRightSLine } from "react-icons/ri";
import Footer from '../../Footer'
import Cookies from 'js-cookie'
import {v4 as uuidv4} from 'uuid'

import './index.css'; // Import CSS file

const Activity = () => {
  const [showForm, setShowForm] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null); // Track selected item index
  const campCluster = Cookies.get("campId")

  useEffect(() => {
    const getSS = localStorage.getItem("activitydata");
    if (getSS) {
      setUsers(JSON.parse(getSS));
    }
  }, []); 

  function handleSave(userData) {
    const newData = [userData,...users] 
    localStorage.setItem("activitydata", JSON.stringify(newData))
      setUsers(newData);
      // setPhoto(null); 
    setShowForm(false);
  }

  const FormComponent = ({ onSave, onClose }) => {
    const [activityDate, setActivityDate] = useState('');
    const [d2dteams, setD2DTeams] = useState('');
    const [d2dmembers, setD2DMembers] = useState('');
    const [villagetargeted, setVillageTargeted] = useState('');
    const [culture, setCulture] = useState('');
    const [digitalcontent, setDigitalContent] = useState('');
    const [verificationorexpansion,setVeriOrExpa] = useState('');
    const [adminoperations, setAdminOperations] = useState('');
    const [sabhasplanned, setSabhasPlanned] = useState('');
    const [campeventplanned, setCampEventPlanned] = useState('');
    const [onleave, setOnLeave] = useState('');

  
    const handleSubmit = (e) => {
      e.preventDefault();
      const currentDate = (new Date()).toLocaleDateString('en-GB');
      const currentTime = (new Date()).toLocaleTimeString();
      onSave({
        id:uuidv4(),
        activityDate,
        d2dteams,
        d2dmembers,
        villagetargeted,
        culture,
        digitalcontent,
        verificationorexpansion,
        adminoperations,
        sabhasplanned,
        campeventplanned,
        onleave,
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
          <h1 className='popup-heading'>Enter the Activity Details</h1>
          <label htmlFor="activityDate" className="form-label">Date:</label>
            <input
              type="date"
              id="activityDate"
              className="ytmcregister-user-input"
              value={activityDate}
              onChange={(e) => setActivityDate(e.target.value)}
              required
            />
            <label htmlFor="d2dteams" className="form-label">D2D Teams:</label>
            <input
              type="text"
              placeholder='Enter the d2d teams'
              id="d2dteams"
              className="ytmcregister-user-input"
              value={d2dteams}
              onChange={(e) => setD2DTeams(e.target.value)}
              required
            />
            <label htmlFor="d2dmembers" className="form-label">D2D Members:</label>
            <input
              type="text"
              id="d2dmembers"
              placeholder='Enter the d2d members'
              className="ytmcregister-user-input"
              value={d2dmembers}
              onChange={(e) => setD2DMembers(e.target.value)}
              required
            />
            <label htmlFor="villagetargeted" className="form-label">Village Targeted:</label>
            <input
              type="text"
              id="villagetargeted"
              className="ytmcregister-user-input"
              placeholder='Enter the village targeted'
              value={villagetargeted}
              onChange={(e) => setVillageTargeted(e.target.value)}
              required
            />
            <label htmlFor="culture" className="form-label">Culture:</label>
            <input
              type="text"
              id="culture"
              className="ytmcregister-user-input"
              placeholder='Enter the culture'
              value={culture}
              onChange={(e) => setCulture(e.target.value)}
              required
            />
            <label htmlFor="digitalcontent" className="form-label">Digital Content:</label>
            <input
              type="text"
              id="digitalcontent"
              className="ytmcregister-user-input"
              placeholder='Enter the digital content'
              value={digitalcontent}
              onChange={(e) => setDigitalContent(e.target.value)}
              required
            />
            <label htmlFor="verificationorexpansion" className="form-label">Verification/Expansion:</label>
            <input
              type="text"
              id="verificationorexpansion"
              placeholder='Enter the verification/expansion'
              className="ytmcregister-user-input"
              value={verificationorexpansion}
              onChange={(e) => setVeriOrExpa(e.target.value)}
              required
            />
            <label htmlFor="adminoperations" className="form-label">Admin/ Sangathan/ Operations:</label>
            <input
              type="text"
              id="adminoperations"
              placeholder='Enter the admin operations'
              className="ytmcregister-user-input"
              value={adminoperations}
              onChange={(e) => setAdminOperations(e.target.value)}
              required
            />
            <label htmlFor="sabhasplanned" className="form-label">Sabhas Planned:</label>
            <input
              type="text"
              id="sabhasplanned"
              placeholder='Enter the sabhas planned'
              className="ytmcregister-user-input"
              value={sabhasplanned}
              onChange={(e) => setSabhasPlanned(e.target.value)}
              required
            />
            <label htmlFor="campeventplanned" className="form-label">Camp Event Planned:</label>
            <input
              type="text"
              id="campeventplanned"
              placeholder='Enter the camp event planned'
              className="ytmcregister-user-input"
              value={campeventplanned}
              onChange={(e) => setCampEventPlanned(e.target.value)}
              required
            />
            <label htmlFor="onleave" className="form-label">On Leave:</label>
            <input
              type="text"
              placeholder='Enter the leave'
              id="onleave"
              className="ytmcregister-user-input"
              value={onleave}
              onChange={(e) => setOnLeave(e.target.value)}
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
        <h1 className='main-d2d'>Activity</h1>
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
              <li className="empty-list">The Activity List is Empty. Click on the New to Add Activity</li>
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
        <td className="parameter">Team Lead Name</td>
        <td className="value">{users[selectedItem].teamLeadName}</td>
      </tr>
      <tr>
        <td className="parameter">House Holds Covered</td>
        <td className="value">{users[selectedItem].householdscovered}</td>
      </tr>
      <tr>
        <td className="parameter">SS Made</td>
        <td className="value">{users[selectedItem].SSMade}</td>
      </tr>
      <tr>
        <td className="parameter">Digital Influencers Onboarded</td>
        <td className="value">{users[selectedItem].digitalInfluencersOnboarded}</td>
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
export default Activity;
