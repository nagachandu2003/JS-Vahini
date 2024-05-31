import React, { useState, useEffect } from 'react';
// import { FaCamera } from "react-icons/fa";
// import { MdCameraswitch } from "react-icons/md";
import { FaPlus } from 'react-icons/fa';
import { RiArrowRightSLine } from "react-icons/ri";
import Footer from '../Footer'
import { Popup } from 'reactjs-popup';
import Cookies from 'js-cookie'

import './index.css'; // Import CSS file

const CampRegistrations = () => {
  const [activeTab, setActiveTab] = useState('pending');
  const [showForm, setShowForm] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isLoading,setIsLoading] = useState(false);
  const campId = Cookies.get("campId");

  useEffect(() => {
    const getVideos = async () => {
      setIsLoading(true)
      try{
        const response = await fetch(`https://js-member-backend.vercel.app/regcampusers/${campId}`);
        if(response.ok)
          {
            const data = await response.json()
            // console.log(data)
            setUsers(data.result)
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
  let filteredList = [];
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const onClickReject = async (value) => {
    const options = {
        method : "PUT",
        headers : {
        "Content-Type" : "application/json"
        },
        body : JSON.stringify({newemail:value,newregstatus:"rejected"})
    }
    // https://js-member-backend.vercel.app
    const response = await fetch(`https://js-member-backend.vercel.app/campusers`,options)
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
    const response = await fetch(`https://js-member-backend.vercel.app/campusers`,options)
    const data = await response.json()
    console.log(data);
    window.location.reload()
}

if(activeTab==="pending")
  filteredList = users.filter((ele) => ele.regstatus==="pending")
 else if(activeTab==="approved")
   filteredList = users.filter((ele) => ele.regstatus==="approved")
 else 
 filteredList = users.filter((ele) => ele.regstatus==="rejected")








  return (
    <>
    <div>
      <div className='main-header-container'>
        <h1 className='main-d2d'>Registrations</h1>
      </div>
      <nav style={{marginTop:'5px'}} className="task-tabs-container">
        <div
          className={`task-tab ${activeTab === 'pending' ? 'active' : ''}`}
          onClick={() => handleTabClick('pending')}
        >
          Pending
        </div>
        <div
          className={`task-tab ${activeTab === 'approved' ? 'active' : ''}`}
          onClick={() => handleTabClick('approved')}
        >
          Approved
        </div>
        <div
          className={`task-tab ${activeTab === 'rejected' ? 'active' : ''}`}
          onClick={() => handleTabClick('rejected')}
        >
          Rejected
        </div>
        <div className="task-tab-slider" style={{ left: activeTab === 'claimed' ? '50%' : '0' }} />
      </nav> 
      <div style={{marginTop:'50px'}} className='d2d-container'>
        <ul className={selectedItem !== null ? "userList popup" : "userList"}>
          {filteredList.length === 0 ? (
            <div className='empty-list-container'>
              <li className="empty-list">Loading Members</li>
            </div>
          ) : (
            filteredList.map((user, index) => (
              <li key={index} className="d2d-users-list" onClick={() => setSelectedItem(index)}>
                <div className='d2d-list-column'>
                <p className='list-d2d-name'>Name : {user.name}</p>
                <p className='list-d2d-time'>Mobile No : {user.whatsappNumber}</p>
                <p className='list-d2d-time'>Referral : {user.referral}</p>
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
                        <td className="value">{filteredList[selectedItem].name}</td>
                      </tr>
                      <tr>
                        <td className="parameter">Date & Time</td>
                        <td className="value">{filteredList[selectedItem].date} & {filteredList[selectedItem].time}</td>
                      </tr>
                      <tr>
                        <td className="parameter">Referral</td>
                        <td className="value">{filteredList[selectedItem].referral}</td>
                      </tr>
                      <tr>
                        <td className="parameter">Camp ID</td>
                        <td className="value">{filteredList[selectedItem].campid}</td>
                      </tr>
                      <tr>
                        <td className="parameter">State</td>
                        <td className="value">{filteredList[selectedItem].state}</td>
                      </tr>
                      <tr>
                        <td className="parameter">District</td>
                        <td className="value">{filteredList[selectedItem].district}</td>
                      </tr>
                      <tr>
                        <td className="parameter">Constituency</td>
                        <td className="value">{filteredList[selectedItem].constituency}</td>
                      </tr>
                      <tr>
                        <td className="parameter">Block</td>
                        <td className="value">{filteredList[selectedItem].block}</td>
                      </tr>
                      <tr>
                        <td className="parameter">WhatsApp Number</td>
                        <td className="value">{filteredList[selectedItem].whatsappNumber}</td>
                      </tr>
                      <tr>
                        <td className="parameter">Email</td>
                        <td className="value">{filteredList[selectedItem].email}</td>
                      </tr>
                      <tr>
                        <td className="parameter">Registration Status</td>
                        {filteredList[selectedItem].regstatus==="approved" && (<td className='text-color1 value'>Approved</td>)}
                        {filteredList[selectedItem].regstatus==="rejected" && (<td className='text-color2 value'>Rejected</td>)}
                        {filteredList[selectedItem].regstatus==="pending" && (<td className='value'>Pending</td>)}
                      </tr>
                    </tbody>
                  </table>
                  {filteredList[selectedItem].regstatus==="pending" && (
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
                            onClickApprove(filteredList[selectedItem].email)
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
                            onClickReject(filteredList[selectedItem].email)
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
