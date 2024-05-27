import React, { useState, useEffect } from 'react';
// import { FaCamera } from "react-icons/fa";
// import { MdCameraswitch } from "react-icons/md";
import { FaPlus } from 'react-icons/fa';
import { RiArrowRightSLine } from "react-icons/ri";
import Footer from '../Footer'
import { Popup } from 'reactjs-popup';

import './index.css'; // Import CSS file

const CampRegistrations = () => {
  const [showForm, setShowForm] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isLoading,setIsLoading] = useState(false);

  useEffect(() => {
    const getVideos = async () => {
      setIsLoading(true)
      try{
        const response = await fetch(`http://localhost:3001/campusers`);
        if(response.ok)
          {
            const data = await response.json()
            setUsers(data)
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

  const onClickReject = async (value) => {
    const options = {
        method : "PUT",
        headers : {
        "Content-Type" : "application/json"
        },
        body : JSON.stringify({newemail:value,newregstatus:"rejected"})
    }
    // https://js-member-backend.vercel.app
    const response = await fetch(`http://localhost:3001/campusers`,options)
    const data = await response.json()
    console.log(data);
    window.location.reload()
}

const onClickApprove = async (value) => {
    console.log("I am from approve")
    console.log(value)
    const options = {
        method : "PUT",
        headers : {
        "Content-Type" : "application/json"
        },
        body : JSON.stringify({newemail:value,newregstatus:"approved"})
    }
    // https://js-member-backend.vercel.app
    const response = await fetch(`http://localhost:3001/campusers`,options)
    const data = await response.json()
    console.log(data);
    window.location.reload()
}


  return (
    <>
    <div>
      <div className='main-header-container'>
        <h1 className='main-d2d'>Registrations</h1>
      </div>
      <div className='d2d-container'>
        <ul className={selectedItem !== null ? "userList popup" : "userList"}>
          {users.length === 0 ? (
            <div className='empty-list-container'>
              <li className="empty-list">There are no registered members</li>
            </div>
          ) : (
            users.map((user, index) => (
              <li key={index} className="d2d-users-list" onClick={() => setSelectedItem(index)}>
                <div className='d2d-list-column'>
                <p className='list-d2d-name'>Username : {user.name}</p>
                <p className='list-d2d-time'>Mobile No : {user.whatsappNumber}</p>
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
                <div className="table-container">
                  <table className="userTable">
                    <thead>
                      <tr>
                        <th className="parameterHeader">Parameters</th>
                        <th className="valueHeader">Values</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="parameter">Name</td>
                        <td className="value">{users[selectedItem].name}</td>
                      </tr>
                      <tr>
                        <td className="parameter">Date & Time</td>
                        <td className="value">{users[selectedItem].date & users[selectedItem].time}</td>
                      </tr>
                      <tr>
                        <td className="parameter">Camp ID</td>
                        <td className="value">{users[selectedItem].campid}</td>
                      </tr>
                      <tr>
                        <td className="parameter">State</td>
                        <td className="value">{users[selectedItem].state}</td>
                      </tr>
                      <tr>
                        <td className="parameter">District</td>
                        <td className="value">{users[selectedItem].district}</td>
                      </tr>
                      <tr>
                        <td className="parameter">Constituency</td>
                        <td className="value">{users[selectedItem].constituency}</td>
                      </tr>
                      <tr>
                        <td className="parameter">Block</td>
                        <td className="value">{users[selectedItem].block}</td>
                      </tr>
                      <tr>
                        <td className="parameter">whatsapp Number</td>
                        <td className="value">{users[selectedItem].whatsappNumber}</td>
                      </tr>
                      <tr>
                        <td className="parameter">Email</td>
                        <td className="value">{users[selectedItem].email}</td>
                      </tr>
                      <tr>
                        <td className="parameter">Registration Pending</td>
                        <td className="value">{users[selectedItem].regstatus}</td>
                      </tr>
                    </tbody>
                  </table>
                  {users[selectedItem].regstatus==="pending" && (
                  <div style={{textAlign:'center',marginTop:'15px'}}>
                  <Popup
                    trigger={<button className="edit-Btn" type="button">Approve</button>}
                    modal
                    nested
                    contentStyle={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: '9999' }}
                    overlayStyle={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: '9998' }}
                    >
                    {close => (
                        <div className="modal rcyt-custom-popup">
                        <div className="content rcyt-popup-cont">
                            <h3>Are you sure want to Approve?</h3>
                            <button className="edit-Btn" type="button" onClick={() => {
                            onClickApprove(users[selectedItem].email)
                            close()
                            }}>Approve</button>
                        </div>
                        <div className="actions">
                            <button className="button delete-Btn" onClick={() => {
                            console.log('modal closed ');
                            close();
                            }}>Cancel</button>
                        </div>
                        </div>
                    )}
                    </Popup>

                    <Popup
                    trigger={<button className="delete-Btn" type="button">Reject</button>}
                    modal
                    nested
                    contentStyle={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: '9999' }}
                    overlayStyle={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: '9998' }}
                    >
                    {close => (
                        <div className="modal rcyt-custom-popup">
                        <div className="content rcyt-popup-cont">
                            <h3>Are you sure you want to Reject?</h3>
                            <button className="delete-Btn" onClick={() => {
                            onClickReject(users[selectedItem].email)
                            close()
                            }} type="button">Reject</button>
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
                  </div>
                  )}
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
export default CampRegistrations;
