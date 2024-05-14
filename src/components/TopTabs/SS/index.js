import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { RiArrowRightSLine } from "react-icons/ri";
import Footer from '../../Footer';

import './index.css'; // Import CSS file

const SS = () => {
  const [showForm, setShowForm] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null); // Track selected item index

  function handleSave(userData) {
    if (userData) {
      // Set the default name as d2d1, d2d2, d2d3, ...
      const defaultName = `SS${users.length + 1}`;
      const ssName = { ...userData, name: defaultName };
      setUsers([...users, ssName]);
    }
    setShowForm(false);
  }

  const FormComponent = ({ onSave, onClose }) => {
    const [founderName, setFounderName] = useState('');
    const [founderMobile, setFounderMobile] = useState('');
    const [district, setDistrict] = useState('');
    const [occupation, setOccupation] = useState('');
    const [perception, setPerception] = useState('');
    const [successPerson, setSuccessPerson] = useState('');
    const [visitorName, setVisitorName] = useState('');
    const [visitorMobile, setVisitorMobile] = useState('');

    const handleSubmit = (e) => {
      e.preventDefault();
      const currentTime = new Date().toLocaleString();
      onSave({
        founderName,
        founderMobile,
        district,
        occupation,
        perception,
        successPerson,
        visitorName,
        visitorMobile,
        time: currentTime
      });
      // Reset input fields after submission
      setFounderName('');
      setFounderMobile('');
      setDistrict('');
      setOccupation('');
      setPerception('');
      setSuccessPerson('');
      setVisitorName('');
      setVisitorMobile('');
    };

    const handleCancel = () => {
      onClose();
    };

    return (
      <>
        <div className="form-container active" style={{ overflow: 'auto' }}> {/* Add overflow style */}
          <form className="ss-form" onSubmit={handleSubmit}>
            <h1 className='popup-heading'>Enter the SS Details</h1>
            <label htmlFor="founderName" className="form-label">संस्थापक सदस्य नाम:</label>
            <input
              type="text"
              id="founderName"
              className="form-input"
              placeholder="Enter संस्थापक सदस्य नाम"
              value={founderName}
              onChange={(e) => setFounderName(e.target.value)}
              required
            />
            <label htmlFor="founderMobile" className="form-label">संस्थापक सदस्य मोबाइल नंबर:</label>
            <input
              type="text"
              id="founderMobile"
              className="form-input"
              placeholder="Enter संस्थापक सदस्य मोबाइल नंबर"
              value={founderMobile}
              onChange={(e) => setFounderMobile(e.target.value)}
              required
            />
            <label htmlFor="district" className="form-label">जिला:</label>
            <input
              type="text"
              id="district"
              className="form-input"
              placeholder="Enter जिला"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              required
            />
            <label htmlFor="occupation" className="form-label">पेशा:</label>
            <input
              type="text"
              id="occupation"
              className="form-input"
              placeholder="Enter पेशा"
              value={occupation}
              onChange={(e) => setOccupation(e.target.value)}
              required
            />
            <label htmlFor="perception" className="form-label">वाहिनी / पदयात्री के नज़र में यह संस्थापक सदस्य:</label>
            <input
              type="text"
              id="perception"
              className="form-input"
              placeholder="Enter नज़र"
              value={perception}
              onChange={(e) => setPerception(e.target.value)}
              required
            />
            <label htmlFor="successPerson" className="form-label">संस्थापक सदस्य के लिए सवाल:</label>
            <input
              type="text"
              id="successPerson"
              className="form-input"
              placeholder="Enter सवाल"
              value={successPerson}
              onChange={(e) => setSuccessPerson(e.target.value)}
              required
            />
            <label htmlFor="visitorName" className="form-label">वाहिनी / पदयात्री का नाम:</label>
            <input
              type="text"
              id="visitorName"
              className="form-input"
              placeholder="Enter नाम"
              value={visitorName}
              onChange={(e) => setVisitorName(e.target.value)}
              required
            />
            <label htmlFor="visitorMobile" className="form-label">वाहिनी / पदयात्री का मोबाइल नंबर:</label>
            <input
              type="text"
              id="visitorMobile"
              className="form-input"
              placeholder="Enter मोबाइल नंबर"
              value={visitorMobile}
              onChange={(e) => setVisitorMobile(e.target.value)}
              required
            />
            <div className='cancel-submit-btn-container'>
              <button type="button" className="btn-cancel" onClick={handleCancel}>Cancel</button>
              <button type="submit" className="btn-submit">Submit</button>
            </div>
          </form>
        </div>
        <Footer />
      </>
    );
  };

  return (
    <>
      <div>
        <div className='main-header-container'>
          <h1 className='main-ss'>Sansthapak Sadasaya</h1>
        </div>
        <div className='ss-container'>
          <div className={showForm ? "overlay" : "overlay hidden"} onClick={() => setShowForm(false)}></div>
          {showForm && <FormComponent onSave={handleSave} onClose={() => setShowForm(false)} />}
          <div className="floating-button" onClick={() => setShowForm(!showForm)}>
            <span>New</span>
            <FaPlus className="plus-icon" />
          </div>
          <ul className={selectedItem !== null ? "userList popup" : "userList"}>
            {users.length === 0 ? (
              <div className='empty-list-container'>
                <li className="empty-list">The SS List is Empty. Click on the New to Add SS Report</li>
              </div>
            ) : (
              users.map((user, index) => (
                <li key={index} className="ss-users-list" onClick={() => setSelectedItem(index)}>
                  <div className='ss-list-column'>
                    <p className='list-ss-name'>संस्थापक सदस्य: {user.founderName}</p>
                    <p className='list-ss-time'>Date & Time: {user.time}</p>
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
                  <li className="users-list">
                    <p className='list-time'>संस्थापक सदस्य नाम: {users[selectedItem].founderName}</p>
                    <p className='list-time'>संस्थापक सदस्य मोबाइल नंबर: {users[selectedItem].founderMobile}</p>
                    <p className='list-time'>जिला: {users[selectedItem].district}</p>
                    <p className='list-time'>पेशा: {users[selectedItem].occupation}</p>
                    <p className='list-time'>वाहिनी / पदयात्री के नज़र में यह संस्थापक सदस्य: {users[selectedItem].perception}</p>
                    <p className='list-time'>संस्थापक सदस्य के लिए सवाल: {users[selectedItem].successPerson}</p>
                    <p className='list-time'>वाहिनी / पदयात्री का नाम: {users[selectedItem].visitorName}</p>
                    <p className='list-time'>वाहिनी / पदयात्री का मोबाइल नंबर: {users[selectedItem].visitorMobile}</p>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default SS;
