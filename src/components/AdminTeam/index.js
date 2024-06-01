import React, { useState, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';
import { MdDelete } from "react-icons/md";
import { RiArrowRightSLine } from "react-icons/ri";
import {v4 as uuidv4} from 'uuid'
import Footer from '../Footer'
import Cookies from 'js-cookie'

import './index.css'; // Import CSS file

const AdminTeam = () => {
  const [showForm, setShowForm] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isLoading,setIsLoading] = useState(false); // Track selected item index
  const campId = Cookies.get("campId")

  useEffect(() => {
    const getVideos = async () => {
      setIsLoading(true)
      try{
        const response = await fetch(`https://js-member-backend.vercel.app/getcampteams`);
        if(response.ok)
          {
            const data = await response.json()
            const filteredTeams = (data.Teams).filter((ele) => ele.campId===campId)
            setUsers(filteredTeams)
            setIsLoading(false)
            // console.log(data);
          }
      }
      catch(Err){
        console.log(`Error Occurred : ${Err}`);
      }
    };

    // Call getVideos only once on mount
    getVideos();
  }, []); // Empty dependency array means it runs only once on mount


  const postData = async (obj) => {
    console.log(obj)
    try{
        const options = {
            method : "POST",
            headers :{
            "Content-Type" : "application/json"
            },
            body : JSON.stringify(obj)
        }
        const response = await fetch(`https://js-member-backend.vercel.app/addteaminadmin`,options);
        const data = await response.json();
        console.log(data);
    }
    catch(Err){
        console.log(`Error Occurred : ${Err}`);
    }
  }

  const onDeleteTeam = async (value) => {
    try{
        const options = {
            method : "DELETE",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({id:value})
        }
        const response = await fetch(`https://js-member-backend.vercel.app/deleteteaminadmin`,options);
        const data = await response.json();
        console.log(data)
    }
    catch(Err){
        console.log(`Error Occurred : ${Err}`)
    }
  }



  const handleSave = (userData) => {
    postData(userData)
    const newList = [...users,userData]
    setUsers(newList)
    setShowForm(false);
  }

  const onDeleteUser = (value) => {
    onDeleteTeam(value)
  }

  const FormComponent = ({ onSave, onClose }) => {
    const [teamName, setTeamName] = useState('');
    const [teamNumber, setTeamNumber] = useState('');
    const [teamLeadName, setTeamLeadName] = useState('');
    const [teamLeadMobile, setTeamLeadMobileNo] = useState('');

  
    const handleSubmit = (e) => {
      e.preventDefault();
      const currentTime = new Date().toLocaleString();
      onSave({
        id:uuidv4(),
        teamName,
        teamNumber,
        teamLeadName,
        teamLeadMobile,
        time: currentTime,
        campId
      });
      setTeamName('');
      setTeamLeadName('');
      setTeamNumber('');
      setTeamLeadMobileNo('');
    };
  
    const handleCancel = () => {
      onClose();
    };
 

    return (
      <>
      <div className="form-container active" style={{ overflow: 'auto' }}> {/* Add overflow style */}
        <form className="d2d-form" onSubmit={handleSubmit}>
          <h1 className='popup-heading'>Enter the Team Details</h1>
         <label htmlFor="villageName" className="form-label">Team Name:</label>
        <input
          type="text"
          id="teamname"
          className="form-input"
          placeholder="Enter Team Name "
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          required
        />
        <label htmlFor="teamnumber" className="form-label">Team Number :</label>
        <input
        type="number"
        id="teamnumber"
        className="form-input"
        placeholder="Enter Team Number"
        value={teamNumber}
        min="1"
        onChange={(e) => {
            setTeamNumber(e.target.value)
            }}
            // If it's not a valid integer, do nothing (or you could provide feedback to the user)
        required
        />

        <label htmlFor="teamleadname" className="form-label">Team Lead Name :</label>
        <input
          type="text"
          id="teamleadname"
          className="form-input"
          placeholder="Enter Team Lead Name"
          value={teamLeadName}
          onChange={(e) => setTeamLeadName(e.target.value)}
          required
        />
        <label htmlFor="teamleadmobileno" className="form-label">Team Lead Mobile No :</label>
        <input
          type="tel"
          id="teamleadmobileno"
          className="form-input"
          placeholder="Enter Team Lead Mobile No"
          value={teamLeadMobile}
          onChange={(e) => setTeamLeadMobileNo(e.target.value)}
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
        <h1 className='main-d2d'>Team</h1>
      </div>
      <div className='d2d-container'>
        <div className={showForm ? "overlay" : "overlay hidden"} onClick={() => setShowForm(false)}></div>
        {showForm && <FormComponent onSave={handleSave} onClose={() => setShowForm(false)} />}
        <div className="floating-button" onClick={() => setShowForm(!showForm)}>
          <span>Add</span>
          <FaPlus className="plus-icon" />
        </div>
        <ul className={selectedItem !== null ? "userList popup" : "userList"}>
                {isLoading ? (
            <div className='empty-list-container'>
                <li className="empty-list">Loading Team</li>
            </div>
        ) : (
            users.length === 0 ? (
                <div className='empty-list-container'>
                    <li className="empty-list">Please add Team</li>
                </div>
            ) : (
                users.map((user, index) => (
                    <li key={index} className="d2d-users-list">
                        <div className='d2d-list-column' onClick={() => setSelectedItem(index)}>
                            <p className='list-d2d-name'>Team: {user.teamNumber}</p>
                            <p className='list-d2d-time'>Name: {user.teamLeadName} & Mobile: {user.teamLeadMobile}</p>
                            <p className='list-d2d-time'>Date & Time: {user.time}</p>
                        </div>
                        <p onClick={() => onDeleteUser(user.id)}><MdDelete className='side-arrow' /></p>
                    </li>
                ))
            )
        )}

        </ul>
        {selectedItem !== null && (
          <div className="popup">
            <div className="popup-content">
              <span className="close" onClick={() => setSelectedItem(null)}>&times;</span>
             
              <ul className="userList">
            <li className="users-list" style={{height:'300px',overflowY:'auto'}}>
                <table className="userTable">
                <tr>
                    <th className="parameterHeader">Parameters</th>
                    <th className="valueHeader">Values</th>
                </tr>
                <tr>
                    <td className="parameter">Team Name</td>
                    <td className="value">{users[selectedItem].teamName}</td>
                </tr>
                <tr>
                    <td className="parameter">Date & Time</td>
                    <td className="value">{users[selectedItem].time}</td>
                </tr>
                <tr>
                    <td className="parameter">Team Number</td>
                    <td className="value">{users[selectedItem].teamNumber}</td>
                </tr>
                <tr>
                    <td className="parameter">Team Lead Name</td>
                    <td className="value">{users[selectedItem].teamLeadName}</td>
                </tr>
                <tr>
                    <td className="parameter">Team Lead Mobile No</td>
                    <td className="value">{users[selectedItem].teamLeadMobile}</td>
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
export default AdminTeam;
