import React, { useState, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';
import { RiArrowRightSLine } from "react-icons/ri";
import Footer from '../Footer'
import Cookies from 'js-cookie'

import './index.css'; // Import CSS file

const accessTabs = [
  'Registration', 'Sub Admin', 'Team', 'Attendance', 'D2D Incharge', 
  'Culture', 'Activity', 'Camp Visitor', 'Collaterals', 
  'Cabs', 'Kitchen', 'Expenses', 'Feedback', 'Help Ticket'
];

const SubAdmin = () => {
  const [showForm, setShowForm] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null); 
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getVideos = async () => {
      setIsLoading(true)
      try{
        const response = await fetch(`https://js-member-backend.vercel.app/getsubadmindetails`);
        if(response.ok)
          {
            const data = await response.json()
            setUsers(data.subadminList)
            // setUsers(data)
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


  const handleSave = async (userData) => {
    setShowForm(false)
    try{
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...userData,
          addedBy: Cookies.get("campuseremail")
        })
      };
      const response = await fetch(`https://js-member-backend.vercel.app/addsubadmindata`,options);
      const data = await response.json()
      console.log(data)
      if(data.msg)
        alert("User Already Exists")
    }
    catch(Err){
      console.log(`Error Occurred : ${Err}`)
    }
  }

  const FormComponent = ({ onSave, onClose }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    let [accessItems, setAccessItems] = useState([]);

    const onChangeAccessItems = (event) => {
      const { value, checked } = event.target;
      
      if (checked) {
          accessItems = [...accessItems, value];
      } else {
          accessItems = accessItems.filter(ele => ele !== value);
      }

      setAccessItems(accessItems)
  }

  
    const handleSubmit = (e) => {
      e.preventDefault();
      const currentTime = new Date().toLocaleString();
      onSave({
        name,
        email,
        mobileNo,
        accessItems,
        time: currentTime
      });
      setName('')
      setEmail('')
      setMobileNo('')
      setAccessItems('')
    };
  
    const handleCancel = () => {
      onClose();
    };
 

    return (
      <>
      <div className="form-container active" style={{ overflow: 'auto' }}> {/* Add overflow style */}
        <form className="d2d-form" onSubmit={handleSubmit}>
          <h2 className='popup-heading'>Enter the Sub Admin Details</h2>
         <label htmlFor="subadminname" className="form-label">Name :</label>
        <input
          type="text"
          id="subadminname"
          className="form-input"
          placeholder="Enter Sub Admin Name "
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label htmlFor="subadminemail" className="form-label">Email :</label>
        <input
        type="email"
        id="subadminemail"
        className="form-input"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => {setEmail(e.target.value)}}
        required
        />
        <label htmlFor="accessitems" className="form-label">Tabs to be Accessed : </label>
        <br/>
        {accessTabs.map(option => (
            <div className="form-input" key={option}>
                <input style={{marginRight:'10px'}} type="checkbox" id={option} value={option} onChange={onChangeAccessItems}/>
                <label htmlFor={option}>{option}</label>
            </div>
        ))}
        <label htmlFor="mobno">Mobile Number</label>
        <input onChange={(e) => setMobileNo(e.target.value)} placeholder="Enter the whatsapp number E.g : +91 987654321" pattern="^\+91(?:[0-9] ?){6,14}[0-9]$" className="ytmcregister-user-input" type="tel" id="mobno" required/>
        
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
        <h1 className='main-d2d'>Sub Admin</h1>
      </div>
      <div className='d2d-container'>

        {showForm && <FormComponent onSave={handleSave} onClose={() => setShowForm(false)} />}
        <div className="floating-button" onClick={() => setShowForm(!showForm)}>
          <span>New</span>
          <FaPlus className="plus-icon" />
        </div>
        <ul className={selectedItem !== null ? "userList popup" : "userList"}>
          {users.length === 0 ? (
            <div className='empty-list-container'>
              <li className="empty-list">There are no Sub Admins.</li>
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
                <p className='list-d2d-name'>Name : {user.name}</p>
                <p className='list-d2d-time'>Email : {user.email}</p>
                <p className='list-d2d-time'>Date & Time: {(user.time).toLocaleString('en-GB')}</p>
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
  <li className="users-list" style={{height:'400px',overflowY:'auto'}}>
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
        <td className="value">{users[selectedItem].time}</td>
      </tr>
      <tr>
        <td className="parameter">Email</td>
        <td className="value">{users[selectedItem].email}</td>
      </tr>
      <tr>
        <td className="parameter">WhatsApp Number</td>
        <td className="value">{users[selectedItem].mobileNo}</td>
      </tr>
      <tr>
        <td className="parameter">Tabs Accessed</td>
        <td className="value">{users[selectedItem].accessItems.map((item, index) => (
      <React.Fragment key={index}>
        {item}
        <br />
      </React.Fragment>
    ))}</td>
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
export default SubAdmin;
