import React, { useState, useEffect } from 'react';
// import { FaCamera } from "react-icons/fa";
// import { MdCameraswitch } from "react-icons/md";
import { FaPlus } from 'react-icons/fa';
import { RiArrowRightSLine } from "react-icons/ri";
import Footer from '../Footer'
import { Popup } from 'reactjs-popup';
import Cookies from 'js-cookie'
import { MdDelete } from "react-icons/md";

import './index.css'; // Import CSS file

const CampRegistrations = () => {
  const [activeTab, setActiveTab] = useState('pending');
  const [showForm, setShowForm] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isLoading,setIsLoading] = useState(false);
  const campCluster = Cookies.get("campId");
  const [categoryVal, setCategory] = useState('');

  useEffect(() => {
    const getVideos = async () => {
      setIsLoading(true)
      try{
        const response = await fetch(`https://js-member-backend.vercel.app/regcampusers/${campCluster}`);
        if(response.ok)
          {
            const data = await response.json()
            // console.log(data)
            const filteredList = (data.result).filter((ele) => ele.person==="member")
            setUsers(filteredList)
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

  const onDeleteMember = async (value) => {
    try{
      const options = {
        method : "DELETE",
        headers : {
          "Content-Type" : "application/json"
        }
      }
      const response = await fetch(`https://js-member-backend.vercel.app/deletecampusers/${value}`,options)
      const data = await response.json()
      console.log(data)
    }
    catch(Err){
      console.log(`Error Occurred : ${Err}`)
    }
    finally {
      const newList = users.filter((ele) => ele.email!==value)
      if(newList.length===0)
        setSelectedItem(null)
      setUsers(newList)
    }
  }

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

const onClickApprove = async (value,cat) => {
    console.log("I am from approve")
    console.log(value)
    if(cat==="")
      {
        alert("Please Select the Member Category")
      }
      else{
        const options = {
          method : "PUT",
          headers : {
          "Content-Type" : "application/json"
          },
          body : JSON.stringify({newemail:value,newregstatus:"approved",category:cat})
      }
      // https://js-member-backend.vercel.app
      const response = await fetch(`https://js-member-backend.vercel.app/campusers`,options)
      const data = await response.json()
      console.log(data);
      window.location.reload()
      }
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
        {isLoading ? (
            <div className='empty-list-container'>
                <li className="empty-list">Loading Members</li>
            </div>
        ) : (
            filteredList.length === 0 ? (
                <div className='empty-list-container'>
                    <li className="empty-list">No Members Yet</li>
                </div>
            ) : (
              filteredList.map((user, index) => (
                <li key={index} className="d2d-users-list" onClick={() => setSelectedItem(index)}>
                  <div className='d2d-list-column'>
                  <p className='list-d2d-name'>Name : {user.name}</p>
                  <p className='list-d2d-time'>Mobile No : {user.mobileno}</p>
                  <p className='list-d2d-time'>Referral : {user.referral}</p>
                  </div>
                  <p><RiArrowRightSLine className='side-arrow' /></p>             
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
                        <td className="parameter">Email</td>
                        <td className="value">{filteredList[selectedItem].email}</td>
                      </tr>
                      <tr>
                        <td className="parameter">Date & Time</td>
                        <td className="value">{filteredList[selectedItem].date} & {filteredList[selectedItem].time}</td>
                      </tr>
                      <tr>
                        <td className="parameter">Camp Cluster</td>
                        <td className="value">{filteredList[selectedItem].campCluster}</td>
                      </tr>
                      <tr>
                        <td className="parameter">D.O.B</td>
                        <td className="value">{filteredList[selectedItem].dob}</td>
                      </tr>
                      <tr>
                        <td className="parameter">Father Name</td>
                        <td className="value">{filteredList[selectedItem].fathername}</td>
                      </tr>
                      <tr>
                        <td className="parameter">District</td>
                        <td className="value">{filteredList[selectedItem].district}</td>
                      </tr>
                      <tr>
                        <td className="parameter">Block</td>
                        <td className="value">{filteredList[selectedItem].block}</td>
                      </tr>
                      <tr>
                        <td className="parameter">Panchayat</td>
                        <td className="value">{filteredList[selectedItem].panchayat}</td>
                      </tr>
                      <tr>
                        <td className="parameter">Village</td>
                        <td className="value">{filteredList[selectedItem].village}</td>
                      </tr>
                      <tr>
                        <td className="parameter">Aadhaar Number</td>
                        <td className="value">{filteredList[selectedItem].aadhaarNo}</td>
                      </tr>
                      <tr>
                        <td className="parameter">Mobile Number</td>
                        <td className="value">{filteredList[selectedItem].mobileno}</td>
                      </tr>
                      <tr>
                        <td className="parameter">Referred By</td>
                        <td className="value">{filteredList[selectedItem].referral}</td>
                      </tr>
                      {filteredList[selectedItem].regstatus==="approved" && (
                        <tr>
                        <td className='parameter'>Category</td>
                        <td className='value'>{filteredList[selectedItem].category}</td>
                      </tr>
                      )}
                      <tr>
                        <td className="parameter">Registration Status</td>
                        {filteredList[selectedItem].regstatus==="approved" && (<td className='text-color1 value'>Approved</td>)}
                        {filteredList[selectedItem].regstatus==="rejected" && (<td className='text-color2 value'>Rejected</td>)}
                        {filteredList[selectedItem].regstatus==="pending" && (<td className='value'>Pending</td>)}
                      </tr>
                      {(filteredList[selectedItem].regstatus==="approved" || filteredList[selectedItem].regstatus==="rejected") && (
                        <tr>
                          <td className='parameter'>Delete</td>
                          <td className='value'>
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
                            <h3>Are you sure you want to Delete?</h3>
                            <button className="delete-Btn" onClick={() => {
                            onDeleteMember(filteredList[selectedItem].email)
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
                      )

                      }
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
                            <div>
                              <h4>Select Category</h4>
                              <input style={{marginRight:"10px"}} onChange={(e) => setCategory(e.target.value)} id="vahini" type="radio" name="category" value="vahini"/>
                              <label htmlFor="vahini">Vahini</label>
                              <br/>
                              <input style={{marginRight:"10px"}} onChange={(e) => setCategory(e.target.value)} id="padayatri" type="radio" name="category" value="padayatri"/>
                              <label htmlFor="padayatri">Padayatri</label>
                            </div>
                            <button style={{marginTop:'20px'}} className="edit-Btn" type="button" onClick={() => {
                            onClickApprove(filteredList[selectedItem].email,categoryVal)
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
