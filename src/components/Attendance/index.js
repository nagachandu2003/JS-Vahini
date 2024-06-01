import React, { useState, useEffect } from 'react';
import { FaGreaterThan, FaPlus } from 'react-icons/fa';
import { MdDelete } from "react-icons/md";
import { RiArrowRightSLine } from "react-icons/ri";
import {v4 as uuidv4} from 'uuid'
import Footer from '../Footer'

import './index.css'; // Import CSS file

const Attendance = () => {
  const [showForm, setShowForm] = useState(false);
  const [allusers, setAllUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isLoading,setIsLoading] = useState(false); // Track selected item index
  const [isLoading2,setIsLoading2] = useState(false); // Track selected item index

  useEffect(() => {
    const getVideos = async () => {
      setIsLoading2(true);
      try {
        const response = await fetch(`https://js-member-backend.vercel.app/getattendanceadmin`);
        const data = await response.json() 
        setUsers(data.AttendanceList);
        // setIsLoading(false);
      } catch (err) {
        console.log(`Error Occurred : ${err}`);
      }
    };
  
    getVideos();
  }, []);

  useEffect(() => {
    const getVideos = async () => {
      setIsLoading(true);
      try {
        // Getting Members
        const response1 = await fetch(`https://js-member-backend.vercel.app/campusers`);
        const data1 = await response1.json();
        const filteredList1 = data1.filter((ele) => ele.regstatus === "approved");
        const mappedList1 = filteredList1.map((ele) => ({ ...ele, person: 'member',MobNo:ele.whatsappNumber,status:'present' }));
  
        // Getting Admins
        const response2 = await fetch(`https://js-member-backend.vercel.app/getcampusers`);
        const data2 = await response2.json();
        const mappedList2 = data2.CampusersList.map((ele) => ({ ...ele, person: 'admin', MobNo : ele.campInchargeNumber,name:ele.campInchargeName,status:'present' }));
  
        // Getting Sub Admins
        const response3 = await fetch(`https://js-member-backend.vercel.app/getsubadmindetails`);
        const data3 = await response3.json();
        const mappedList3 = data3.subadminList.map((ele) => ({ ...ele, person: 'subadmin', MobNo : ele.mobileNo, status:'present' }));
  
        const newList = [...mappedList1, ...mappedList2, ...mappedList3];
        setAllUsers(newList);
        setIsLoading(false);
      } catch (err) {
        console.log(`Error Occurred : ${err}`);
        setIsLoading(false);
      }
    };
  
    getVideos();
  }, []);

  const postData = async (obj) => {
    try{
      const options = {
        method : "POST",
        headers : {
          "Content-Type" : "application/json"
        },
        body : JSON.stringify(obj)
      }
      const response = await fetch(`https://js-member-backend.vercel.app/addattendanceadmin`,options);
      const data = await response.json();
      console.log(data);
    }
  catch(Err)
  {
    console.log(`Error Occurred : ${Err}`);
  }
}


  const handleSave = (userData) => {
    postData(userData)
    console.log(userData.attendance)
    setShowForm(false);
  }


  const FormComponent = ({ onSave, onClose }) => {
    const [date, setAttendanceDate] = useState('');

    const handleAttendanceChange = (name, status) => {
      const updatedUsers = allusers.map(member => {
        if (member.name === name) {
          return { ...member, status };
        }
        return member;
      });
      
      // Assuming you have a state updater function for allusers
      setAllUsers(updatedUsers);
    }
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const currentDate = (new Date()).toLocaleDateString('en-GB');
      const currentTime = (new Date()).toLocaleTimeString();
      onSave({
        id:uuidv4(),
        attendance : allusers,
        time : `${currentDate} & ${currentTime}`,
        present : allusers.filter(member => member.status === 'present').length,
        absent : allusers.filter(member => member.status === 'absent').length,
        campId : Cookies.get("campId")
      });
    };
  
    const handleCancel = () => {
      onClose();
    };
 

    return (
      <>
      <div className="form-container active" style={{ overflow: 'auto' }}> {/* Add overflow style */}
        <form className="d2d-form" onSubmit={handleSubmit} style={{width:'100%'}}>
          <h1 className='popup-heading'>Mark Attendance</h1>
         <label htmlFor="villageName" className="form-label">Date :</label>
         <br/>
        <input
        style={{width:'100%'}}
          type="date"
          id="dateinput"
          className="form-input"
          placeholder="Select Date "
          value={date}
          max="<?php echo date('Y-m-d'); ?>"
          onChange={(e) => setAttendanceDate(e.target.value)}
          required
        />
        <br/>

{isLoading === false && (
  <table className="userTable">
    <thead>
      <tr>
        <th className='parameterHeader'>Name</th>
        <th className='parameterHeader'>Present</th>
        <th className='parameterHeader'>Absent</th>
      </tr>
    </thead>
    <tbody>
      {allusers.map((member) => (
        <tr key={member.name} style={{fontSize:'12px'}}>
          <td className={`${(member.type === "admin" || member.person === "subadmin") ? 'normStyle' : ''} value`}>
            {member.name}
            <br />
            {member.MobNo}
          </td>
          <td className='value'>
            <input
              type="radio"
              name={`attendance-${member.name}`}
              value="present"
              checked={member.status === 'present'}
              onChange={() => handleAttendanceChange(member.name, 'present')}
            />
          </td>
          <td className='value'>
            <input
              type="radio"
              name={`attendance-${member.name}`}
              value="absent"
              checked={member.status === 'absent'}
              onChange={() => handleAttendanceChange(member.name, 'absent')}
            />
          </td>
        </tr>
      ))}
    </tbody>
    <tfoot>
      <tr>
        <th className='value'>Total</th>
        <td className='value'>{allusers.filter(member => member.status === 'present').length}</td>
        <td className='value'>{allusers.filter(member => member.status === 'absent').length}</td>
      </tr>
    </tfoot>
  </table>
)}



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
        <h1 className='main-d2d'>Attendance</h1>
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
                <li className="empty-list">Loading Attendance</li>
            </div>
        ) : (
            users.length === 0 ? (
                <div className='empty-list-container'>
                    <li className="empty-list">No data is available</li>
                </div>
            ) : (
                users.map((user, index) => (
                    <li key={index} className="d2d-users-list">
                        <div className='d2d-list-column' onClick={() => setSelectedItem(index)}>
                            <p className='list-d2d-name'>Date: {user.time}</p>
                            <p className='list-d2d-time'>Present: {user.present} & Absent: {user.absent}</p>
                        </div>
                        <p ><RiArrowRightSLine className='side-arrow' /></p>
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
                  <thead>
                <tr>
                    <th className="parameterHeader">Parameters</th>
                    <th className="valueHeader">Values</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td className="parameter">Date & Time</td>
                    <td className="value">{users[selectedItem].time}</td>
                </tr>
                {users[selectedItem].attendance.map((ele) => (
                  <tr key={ele.name}>
                    <td className="parameter">{ele.name} <br/> {ele.MobNo}</td>
                    <td className="value">{ele.status}</td>
                  </tr>
                ))}
                <tr>
                  <th className="parameter">Present</th>
                  <td className='value'>{users[selectedItem].present}</td>
                </tr>
                <tr>
                  <th className="parameter">Absent</th>
                  <td className="value">{users[selectedItem].absent}</td>
                </tr>
                </tbody>
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
export default Attendance;
