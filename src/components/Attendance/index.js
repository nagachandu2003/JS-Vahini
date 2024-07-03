import React, { useState, useEffect } from 'react';
import { FaGreaterThan, FaPlus } from 'react-icons/fa';
import { MdDelete } from "react-icons/md";
import { RiArrowRightSLine } from "react-icons/ri";
import {v4 as uuidv4} from 'uuid'
import Footer from '../Footer'
import Cookies from 'js-cookie'
import { Popup } from 'reactjs-popup';
import { IoStatsChartSharp } from "react-icons/io5";
import { Link } from 'react-router-dom';

import './index.css'; // Import CSS file

const Attendance = () => {
  const [showForm, setShowForm] = useState(false);
  const [allusers, setAllUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isLoading,setIsLoading] = useState(false); // Track selected item index
  const [isLoading2,setIsLoading2] = useState(false); // Track selected item index
  const campCluster = Cookies.get("campId")
  const [date,setAttendanceDate] = useState('')
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  console.log("Camp ID "+campCluster)

  useEffect(() => {
    const getVideos = async () => {
      setIsLoading2(true);
      try {
        const response = await fetch(`https://js-member-backend.vercel.app/getattendanceadmin`);
        const data = await response.json() 
        const {AttendanceList} = data
        setUsers(AttendanceList.filter((ele) => ele.campCluster===campCluster));
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
        const filteredList1 = data1.filter((ele) => (ele.regstatus === "approved" && ele.campCluster === campCluster && ele.person==="member"));
        const mappedList1 = filteredList1.map((ele) => ({
          ...ele,
          person: 'member',
          MobNo: ele.mobileno,
          status: 'present',
          email:ele.email
        }));

        // Getting Admins
        const response2 = await fetch(`https://js-member-backend.vercel.app/getcampusers`);
        const data2 = await response2.json();
        const filteredList2 = data2.CampusersList.filter((ele) => ele.campCluster === campCluster);
        const mappedList2 = filteredList2.map((ele) => ({
          ...ele,
          person: 'admin',
          MobNo: ele.campInchargeNumber,
          name: ele.campInchargeName,
          status: 'present',
          email:ele.campInchargeGmail
        }));

        // Getting Sub Admins
        const response3 = await fetch(`https://js-member-backend.vercel.app/getsubadmindetails`);
        const data3 = await response3.json();
        const filteredList3 = data3.subadminList.filter((ele) => (ele.campCluster === campCluster && ele.person==="subadmin"));
        const mappedList3 = filteredList3.map((ele) => ({
          ...ele,
          person: 'subadmin',
          MobNo: ele.mobileNo,
          status: 'present',
          email:ele.email
        }));

        const newList = [...mappedList1, ...mappedList2, ...mappedList3];
        setAllUsers(newList);
      } catch (err) {
        console.log(`Error Occurred: ${err}`);
      } finally {
        setIsLoading(false);
      }
    };

    getVideos();
  }, [campCluster]);

  console.log(users);

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

const onDeleteAttendance = async (value) => {
  try{
    const options = {
      method : "DELETE",
      headers : {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify({id:value})
    }
    const response = await fetch(`https://js-member-backend.vercel.app/deleteattendance`,options)
    const data = await response.json()
    console.log(data)
    window.location.reload()
  }
  catch(Err){
    console.log(`Error Occurred : ${Err}`)
  }
}


  const handleSave = (userData) => {
    const filteredList = users.filter((ele) => ele.attendanceDate===userData.attendanceDate)
    if(filteredList.length>0)
      {
        alert("Remove the Record with currently entered date")
      }
    else if(new Date(userData.date) > new Date()){
      alert("Please Enter the Date till today")
    }
    else 
    {
    postData(userData)
    const newList = [userData,...users]
    setUsers(newList)
    setShowForm(false);
    }
  }


  const FormComponent = ({ onSave, onClose }) => {

    const handleAttendanceChange = (name, status) => {
      const updatedUsers = allusers.map((member,index) => {
        if (index === name) {
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
        attendance : allusers.map((ele) => ({name:ele.name,MobNo:ele.MobNo,status:ele.status,category:ele.category,email:ele.email})),
        attendanceDate:(new Date(date)).toLocaleDateString('en-GB'),
        time : `${currentDate} & ${currentTime}`,
        present : allusers.filter(member => member.status === 'present').length,
        absent : allusers.filter(member => member.status === 'absent').length,
        campCluster : Cookies.get("campId")
      });
      setAttendanceDate('')
    };
  
    const handleCancel = () => {
      onClose();
    };
 

    return (
      <>
      {isLoading && <p>Loading Members</p>}
      {!isLoading && (
        <div className="form-container active" style={{ overflow: 'auto' }}>
          <form className="d2d-form" onSubmit={handleSubmit} style={{ width: '100%' }}>
            <h1 className='popup-heading'>Mark Attendance</h1>
            <label htmlFor="dateinput" className="form-label">Select Date:</label>
            <br />
            <input
              style={{ width: '100%', marginBottom: '10px' }}
              type="date"
              id="dateinput"
              className="ytmcregister-user-input"
              placeholder="Select Date"
              max={new Date().toISOString().split('T')[0]} // Set max to current date
              onChange={(e) => setAttendanceDate(e.target.value)}
              value = {date}
              required
            />
            <br />
            <table className="userTable" style={{ marginTop: "10px", marginBottom: "10px" }}>
              <thead>
                <tr>
                  <th className='parameterHeader'>Name</th>
                  <th className='parameterHeader'>Present</th>
                  <th className='parameterHeader'>Absent</th>
                </tr>
              </thead>
              <tbody>
                {allusers.map((member,index) => (
                  <tr key={index} style={{ fontSize: '12px' }}>
                    <td className={`${(member.person === "admin" || member.person === "subadmin") ? 'normStyle' : ''} value`}>
                      {member.person === "admin" ? '**' : member.person === "subadmin" ? '*' : ''} {member.name}
                      <br />
                      {member.MobNo}
                    </td>
                    <td style={{ textAlign: 'center' }} className='value'>
                      <input
                        type="radio"
                        name={`attendance-${index}`}
                        value="present"
                        checked={member.status === 'present'}
                        className={member.status === "present" ? 'greenBtn' : ''}
                        onChange={() => handleAttendanceChange(index, 'present')}
                        required
                      />
                    </td>
                    <td style={{ textAlign: 'center' }} className='value'>
                      <input
                        type="radio"
                        name={`attendance-${index}`}
                        value="absent"
                        checked={member.status === 'absent'}
                        className={member.status === "absent" ? 'redBtn' : ''}
                        onChange={() => handleAttendanceChange(index, 'absent')}
                        required
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <th className='value'>Total</th>
                  <td style={{ textAlign: 'center' }} className='value'>{allusers.filter(member => member.status === 'present').length}</td>
                  <td style={{ textAlign: 'center' }} className='value'>{allusers.filter(member => member.status === 'absent').length}</td>
                </tr>
              </tfoot>
            </table>
            <div style={{ marginTop: '10px' }} className='cancel-submit-btn-container'>
              <button type="button" className="btn-cancel" onClick={handleCancel}>Cancel</button>
              <button type="submit" className="btn-submit">Submit</button>
            </div>
          </form>
        </div>
      )}
      <Footer />
    </>
    );
  };

  return (
    <>
    <div>
    <div className='main-header-container'>
  <h1 className='main-d2d'>
    Attendance
    <Link to="/attendancestats" style={{color:'black',textDecoration:'none'}}>
    <span className='header-icon'><IoStatsChartSharp size={20} /></span>
    </Link>
  </h1>
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
                            <p className='list-d2d-name'>Date: {user.attendanceDate}</p>
                            <p className='list-d2d-time'>Present: {user.present} & Absent: {user.absent}</p>
                        </div>
                        <p><RiArrowRightSLine className='side-arrow'/></p>

                    </li>
                ))
            )
        )}

        </ul>
        console.log(users)
        {selectedItem !== null && (
          <div className="popup" style={{ height: '100%', width: '100%', justifyContent: 'center' }}>
          <div className="popup-content">
            <span style={{ top: '2px' }} className="close" onClick={() => setSelectedItem(null)}>&times;</span>
            <h2>Attendance</h2>
            <ul className="userList" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <li className="users-list" style={{ height: '300px', overflowY: 'auto' }}>
                <div className='table-container'>
                  <table className="userTable" style={{ marginTop: "10px", marginBottom: "10px" }}>
                    <thead>
                      <tr>
                        <th className="parameterHeader">Parameters</th>
                        <th colSpan={2} className="valueHeader">Values</th>
                      </tr>
                      <tr>
                        <td className="parameter">Date & Time</td>
                        <td colSpan={2} className="value">{users[selectedItem].time}</td>
                      </tr>
                      <tr>
                        <th className='parameterHeader'>Name</th>
                        <th className='parameterHeader'>Present</th>
                        <th className='parameterHeader'>Absent</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users[selectedItem].attendance.map((member,index) => (
                        <tr key={index} style={{ fontSize: '12px' }}>
                          <td className={`${(member.person === "admin" || member.person === "subadmin") ? 'normStyle' : ''} value`}>
                            {member.name}
                            <br />
                            {member.MobNo}
                          </td>
                          <td style={{ textAlign: 'center' }} className='value'>
                            <input
                              type="radio"
                              className={member.status === "present" ? 'greenBtn' : ''}
                              name={`present-${member.name}`}
                              value="present"
                              disabled={member.status === "absent"}
                              defaultChecked={member.status === 'present'}
                            />
                          </td>
                          <td style={{ textAlign: 'center' }} className='value'>
                            <input
                              className={member.status === "absent" ? 'redBtn' : ''}
                              type="radio"
                              name={`absent-${member.name}`}
                              value="absent"
                              disabled={member.status === "present"}
                              defaultChecked={member.status === 'absent'}
                            />
                          </td>
                        </tr>
                      ))}
                      <tr>
                        <th className='value'>Total</th>
                        <td style={{ textAlign: 'center' }} className='value'>{users[selectedItem].attendance.filter(member => member.status === 'present').length}</td>
                        <td style={{ textAlign: 'center' }} className='value'>{users[selectedItem].attendance.filter(member => member.status === 'absent').length}</td>
                      </tr>
                      <tr>
                        <th style={{ textAlign: 'center' }} className='value'>Remove</th>
                        <td className='value' colSpan={2}>
                        <Popup
                    trigger={<button style={{backgroundColor:'transparent',borderWidth:'0',color:'red'}} type="button"><MdDelete size={20}/></button>}
                    modal
                    nested
                    contentStyle={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: '9999' }}
                    overlayStyle={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: '9998' }}
                    >
                    {close => (
                        <div className="modal rcyt-custom-popup">
                        <div className="content rcyt-popup-cont">
                            <h3>Are you sure you want to Remove Attendance?</h3>
                            <button className="delete-Btn" onClick={() => {
                            onDeleteAttendance(users[selectedItem].id)
                            close()
                            }} type="button">Delete</button>
                        </div>
                        <div className="actions">
                            <button className="button delete-Btn" onClick={() => {
                            console.log('modal closed');
                            close();
                            }}>Cancel</button>
                        </div>
                        </div>
                    )}
                    </Popup>
                        </td>
                      </tr>
                    </tbody>
                    <tfoot>
                    </tfoot>
                  </table>
                </div>
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
