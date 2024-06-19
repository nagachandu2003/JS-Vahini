import React, { useState, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';
import { RiArrowRightSLine } from "react-icons/ri";
import Footer from '../../Footer'
import Cookies from 'js-cookie'
import {v4 as uuidv4} from 'uuid'

import './index.css'; // Import CSS file

const D2D = () => {
  const [showForm, setShowForm] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null); // Track selected item index
  const campCluster = Cookies.get("campId")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const getVideos = async () => {
      setIsLoading(true)
      try{
        const response = await fetch(`https://js-member-backend.vercel.app/getd2dreportdata/${campCluster}`);
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

  const postData = async (obj) => {
    try{
      const options = {
        method : "POST",
        headers : {
          "Content-Type" : "application/json"
        },
        body : JSON.stringify(obj)
      }
      const response = await fetch(`https://js-member-backend.vercel.app/addreportd2dlist`,options);
      const data = await response.json()
      console.log(data)
    }
    catch(Err){
      console.log(`Error Occurred : ${Err}`);
    }
  }

  function handleSave(userData) {
    // postData(userData)
      setUsers([userData,...users]);
      // setPhoto(null); 
    setShowForm(false);
  }

  const FormComponent = ({ onSave, onClose }) => {
    const [teamLeadName, setTeamLeadName] = useState('');
    const [householdscovered, setHouseholdsCovered] = useState('');
    const [SSMade, setSSMade] = useState('');
    const [digitalInfluencersOnboarded, setDigitalInfluencersOnboarded] = useState('');
    // const [villageName, setVillageName] = useState('');
    // const [villagePopulation, setVillagePopulation] = useState('');
    // const [totalHouseholdCovered, setTotalHouseholdCovered] = useState('');
    // const [youtubeSubscription, setYoutubeSubscription] = useState('');
    // const [totalWhatsAppGroupAdded, setTotalWhatsAppGroupAdded] = useState('');
    // const [totalFoundingMemberAdded, setTotalFoundingMemberAdded] = useState('');
    // const [district, setDistrict] = useState('');
    // const [block, setBlock] = useState('');
    // const [panchayat, setPanchayat] = useState('');

  
    const handleSubmit = (e) => {
      e.preventDefault();
      const currentDate = (new Date()).toLocaleDateString('en-GB');
      const currentTime = (new Date()).toLocaleTimeString();
      onSave({
        id:uuidv4(),
        teamLeadName,
        householdscovered,
        SSMade,
        digitalInfluencersOnboarded,
        date : currentDate,
        time : currentTime,
        campCluster,
        addedByemail: Cookies.get("campuseremail")
      });

      // Reset input fields after submission
      setTeamLeadName('');
      setHouseholdsCovered('');
      setSSMade('');
      setDigitalInfluencersOnboarded('');
      // setVillageName('');
      // setVillagePopulation('');
      // setTotalHouseholdCovered('');
      // setYoutubeSubscription('');
      // setTotalWhatsAppGroupAdded('');
      // setTotalFoundingMemberAdded('');
      // setDistrict('');
      // setBlock('');
      // setPanchayat('');
    };
  
    const handleCancel = () => {
      onClose();
    };
 

    return (
      <>
      <div className="form-container active"> {/* Add overflow style */}
        <form className="d2d-form" onSubmit={handleSubmit}>
          <h1 className='popup-heading'>Enter the D2D Details</h1>
          <label htmlFor="teamleadname" className="form-label">Team Name:</label>
        <input
          type="text"
          id="teamleadname"
          className="ytmcregister-user-input"
          placeholder="Enter Team Lead Name "
          value={teamLeadName}
          onChange={(e) => setTeamLeadName(e.target.value)}
          required
        />
        <label htmlFor="teamleadname" className="form-label">House Holds Covered :</label>
        <input
          type="text"
          id="householdscovered"
          className="ytmcregister-user-input"
          placeholder="Enter House Holds Covered"
          value={householdscovered}
          onChange={(e) => setHouseholdsCovered(e.target.value)}
          required
        />
        <label htmlFor="ssmade" className="form-label">SS Made :</label>
        <input
          type="text"
          id="ssmade"
          className="ytmcregister-user-input"
          placeholder="Enter SS Made "
          value={SSMade}
          onChange={(e) => setSSMade(e.target.value)}
          required
        />
        <label htmlFor="digitalinfluencersonboarded" className="form-label">Digital Influencers Onboarded :</label>
        <input
          type="text"
          id="digitalinfluencersonboarded"
          className="ytmcregister-user-input"
          placeholder="Enter Digital Influencers Onboarded"
          value={digitalInfluencersOnboarded}
          onChange={(e) => setDigitalInfluencersOnboarded(e.target.value)}
          required
        />
         {/* <label htmlFor="villageName" className="form-label">Village Name:</label>
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
        /> */}
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
        <h1 className='main-d2d'>D2D</h1>
      </div>
      <div className='d2d-container'>
        <div className={showForm ? "overlay" : "overlay hidden"} onClick={() => setShowForm(false)}></div>
        {showForm && <FormComponent onSave={handleSave} onClose={() => setShowForm(false)} />}
        <div className="floating-button" onClick={() => setShowForm(!showForm)}>
          <span>New</span>
          <FaPlus className="plus-icon" />
        </div>
        <div className='scrollable-container'>
        <ul className={selectedItem !== null ? "userList" : "userList"}>
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
                <p className='list-d2d-name'>D2D : {user.teamLeadName}</p>
                <p className='list-d2d-time'>Date & Time: {user.time}</p>
                </div>
                <p><RiArrowRightSLine className='side-arrow' /></p>             
              </li>
            ))
          )}
        </ul>
        </div>
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
export default D2D;
