import React, { useState,useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';
import { RiArrowRightSLine } from "react-icons/ri";
import Footer from '../../Footer'
import Cookies from 'js-cookie'
import {v4 as uuidv4} from 'uuid'
import {Popup} from 'reactjs-popup'
import { MdDelete, MdExposureNeg1 } from 'react-icons/md';

import './index.css'; // Import CSS file

const Expenses = () => {
  const [showForm, setShowForm] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null); // Track selected item index
  const campCluster = Cookies.get("campId")

  useEffect(() => {
    const getSS = localStorage.getItem("collateraldata");
    if (getSS) {
      setUsers(JSON.parse(getSS));
    }
  }, []); 

  const onDeleteCollateral = (value) => {
    const filteredList = users.filter((ele) => ele.id!==value)
    setUsers(filteredList)
    localStorage.setItem("collateraldata", JSON.stringify(filteredList))
  }

  function handleSave(userData) {
    const newData = [userData,...users] 
    localStorage.setItem("collateraldata", JSON.stringify(userData))
      setUsers(newData);
      // setPhoto(null); 
    setShowForm(false);
  }

  const FormComponent = ({ onSave, onClose }) => {
    const [expensesDate, setExpensesDate] = useState('');
    const [purpose, setPurpose] = useState('');
    const [item, setItem] = useState('');
    const [amount, setAmount] = useState('');
    const [verifiedBy, setVerifiedBy] = useState('');
    const [copyOfTheBill, setCopyOfTheBill] = useState(''); 

  
    const handleSubmit = (e) => {
      e.preventDefault();
      const currentDate = (new Date()).toLocaleDateString('en-GB');
      const currentTime = (new Date()).toLocaleTimeString();
      onSave({
        id:uuidv4(),
        expensesDate,
        purpose,
        item,
        amount,
        verifiedBy,
        copyOfTheBill,
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
          <h1 className='popup-heading'>Daily Camp Expense</h1>
          <label htmlFor="expensesDate" className="form-label">Select Date:</label>
          <input
            type="date"
            id="expensesDate"
            placeholder='Enter the date'
            className="ytmcregister-user-input"
            value={expensesDate}
            onChange={(e) => setExpensesDate(e.target.value)}
            required
          />
          <label htmlFor="purpose" className="form-label">Purpose:</label>
          <input
          placeholder='Enter the Purpose'
            type="text"
            id="purpose"
            className="ytmcregister-user-input"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            required
          />
          <label htmlFor="item" className="form-label">Item :</label>
          <input
          placeholder='Enter the Item'
            type="text"
            id="item"
            className="ytmcregister-user-input"
            value={item}
            onChange={(e) => setItem(e.target.value)}
            required
          />
          <label htmlFor="amount" className="form-label">Amount :</label>
          <input
            type="text"
            placeholder='Enter Amount'
            id="amount"
            className="ytmcregister-user-input"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
          <label htmlFor="verifiedby" className="form-label">Verified By:</label>
          <input
            type="text"
            id="verifiedby"
            placeholder='Enter Verified By'
            className="ytmcregister-user-input"
            value={verifiedBy}
            onChange={(e) => setVerifiedBy(e.target.value)}
            required
          />
          <label htmlFor="copyofthebill" className="form-label">Copy of the Bill:</label>
          <input
            type="file"
            id="copyofthebill"
            placeholder='Enter the Copy of the Bill'
            className="ytmcregister-user-input"
            value={copyOfTheBill}
            onChange={(e) => setCopyOfTheBill(e.target.value)}
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
        <h1 className='main-d2d'>Expenses</h1>
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
              <li className="empty-list">The Expenses List is Empty. Click on the New to Add Expenses</li>
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
        <td className="parameter">Collateral Date</td>
        <td className="value">{users[selectedItem].collateralDate}</td>
      </tr>
      <tr>
        <td className="parameter">Visiting Card</td>
        <td className="value">{users[selectedItem].visitingCard}</td>
      </tr>
      <tr>
        <td className="parameter">Name Sticker</td>
        <td className="value">{users[selectedItem].nameSticker}</td>
      </tr>
      <tr>
        <td className="parameter">Mobile Sticker</td>
        <td className="value">{users[selectedItem].mobileSticker}</td>
      </tr>
      <tr>
        <td className="parameter">Pamphlet</td>
        <td className="value">{users[selectedItem].pamphlet}</td>
      </tr>
      <tr>
        <td className="parameter">Door Sticker</td>
        <td className="value">{users[selectedItem].doorSticker}</td>
      </tr>
      <tr>
        <td className="parameter">Flag</td>
        <td className="value">{users[selectedItem].flag}</td>
      </tr>
      <tr>
        <td className="parameter">Medal</td>
        <td className="value">{users[selectedItem].medal}</td>
      </tr>
      <tr>
        <td className="parameter">Certificate</td>
        <td className="value">{users[selectedItem].certificate}</td>
      </tr>
      <tr>
        <td>Remove</td>
        <td>
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
                            onDeleteCollateral(users[selectedItem].id)
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
export default Expenses;
