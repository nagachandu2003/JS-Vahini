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
  const campCluster = Cookies.get("campId")
  const [members,setMembers] = useState([])

  useEffect(() => {
    const getVideos = async () => {
      setIsLoading(true)
      try{
        const response = await fetch(`https://js-member-backend.vercel.app/getsubadmindetails`);
        const response2 = await fetch(`https://js-member-backend.vercel.app/campusers`)        
            const data2 = await response2.json()
            const data = await response.json() 
            const filteredList2 = data2.filter((ele) => (ele.campCluster===campCluster && ele.person==="member" && ele.regstatus==="approved"))
            const filteredList = (data.subadminList).filter((ele) => (ele.campCluster===campCluster))
            setMembers(filteredList2)
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

  const postData = async (userData) => {
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

  const updateStatus = async (value) => {
    try{
      const options = {
        method : "PUT",
        headers : {
          "Content-Type" : "application/json"
        },
        body : JSON.stringify({email:value,person:'subadmin'})
      }
      const response = await fetch(`http://localhost:3001/updatemembertosubadmin`,options)
      const data = await response.json()
      console.log(data)
    }
    catch(Err){
      console.log(`Error Occurred : ${Err}`)
    }
  }

  const handleSave = async (userData) => {
    await updateStatus(userData.email)
    await postData(userData)
    const newList = [userData,...users]
    setUsers(newList)
    setShowForm(false)
    alert("Sub Admin Added Successfully")
  }

  const FormComponent = ({ onSave, onClose }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    let [accessItems, setAccessItems] = useState([]);
    const [item,setItem] = useState({})

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
        name:item.name,
        email:item.email,
        mobileNo:item.mobileno,
        accessItems,
        campCluster,
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

    const onChangeMember = (item) => {
      setItem(item)
    }
 

    return (
      <>
      <div className="form-container active" style={{ overflow: 'auto' }}> {/* Add overflow style */}
        <form className="d2d-form" onSubmit={handleSubmit}>
          <h2 className='popup-heading'>Add Sub Admin </h2>
          {members.length===0 && <p>No Registered Members</p> }
          {members.length!==0 && (
            <>
          <p>Select the Member</p>
          {members.map((ele) => (
            <div key={ele.email} className='ytmcregister-user-input'>
              <input type="radio" name="subadmin" id={ele.email} onChange={() => onChangeMember(ele)} />
              <label htmlFor={ele.email}><span style={{marginLeft:'20px'}}>{ele.name}</span><br/><span style={{marginLeft:'26px'}}>{ele.mobileno}</span></label>
            </div>
          ))}
          </>
        )}
         {/* <label htmlFor="subadminname" className="form-label">Name :</label>
        <input
          type="text"
          id="subadminname"
          className="ytmcregister-user-input"
          placeholder="Enter Sub Admin Name "
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label htmlFor="subadminemail" className="form-label">Email :</label>
        <input
        type="email"
        id="subadminemail"
        className="ytmcregister-user-input"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => {setEmail(e.target.value)}}
        required
        /> */}
        <label htmlFor="accessitems" className="form-label">Tabs to be Accessed : </label>
        <br/>
        {accessTabs.map(option => (
            <div className="ytmcregister-user-input" key={option}>
                <input style={{marginRight:'10px'}} type="checkbox" id={option} value={option} onChange={onChangeAccessItems}/>
                <label htmlFor={option}>{option}</label>
            </div>
        ))}
        {/* <label className="form-label" htmlFor="mobno">Mobile Number</label>
        <input onChange={(e) => setMobileNo(e.target.value)} placeholder="Enter the whatsapp number E.g : +91 987654321" className="ytmcregister-user-input" type="tel" id="mobno" required/> */}
        
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
      <div className={showForm ? "overlay" : "overlay hidden"} onClick={() => setShowForm(false)}></div>
        {showForm && <FormComponent onSave={handleSave} onClose={() => setShowForm(false)} />}
        <div className="floating-button" onClick={() => setShowForm(!showForm)}>
          <span>New</span>
          <FaPlus className="plus-icon" />
        </div>
        <ul className={selectedItem !== null ? "userList popup" : "userList"}>

        {isLoading ? (
            <div className='empty-list-container'>
                <li className="empty-list">Loading Sub Admins</li>
            </div>
        ) : (
            users.length === 0 ? (
                <div className='empty-list-container'>
                    <li className="empty-list">Please add Sub Admins</li>
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
            )
        )}
        </ul>
        {selectedItem !== null && (
          <div className="popup">
            <div className="popup-content">
              <span className="close" onClick={() => setSelectedItem(null)}>&times;</span>
             
  <ul className="userList">
  <li className="users-list" style={{margin:'auto',width:'90%',overflowY:'auto'}} >
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
        <td className="value">{(users[selectedItem].accessItems).map((items, index) => (
      <React.Fragment key={index}>
        {items}
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
