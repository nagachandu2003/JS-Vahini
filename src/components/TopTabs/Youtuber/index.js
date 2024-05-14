import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { RiArrowRightSLine } from 'react-icons/ri';
import Footer from '../../Footer';

import './index.css'; // Import CSS file

const Youtuber = () => {
  const [showForm, setShowForm] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  function handleSave(userData) {
    if (userData) {
      const defaultName = `Youtuber${users.length + 1}`;
      const youtuberData = { ...userData, name: defaultName };
      setUsers([...users, youtuberData]);
    }
    setShowForm(false);
  }

  const FormComponent = ({ onSave, onClose }) => {
    const [name, setName] = useState('');
    const [contactNo, setContactNo] = useState('');
    const [dist, setDist] = useState('');
    const [constituency, setConstituency] = useState('');

    const handleSubmit = (e) => {
      e.preventDefault();
      const currentTime = new Date().toLocaleString();
      onSave({
        name,
        contactNo,
        dist,
        constituency,
        time: currentTime
      });
      // Reset input fields after submission
      setName('');
      setContactNo('');
      setDist('');
      setConstituency('');
    };

    const handleCancel = () => {
      onClose();
    };

    return (
      <>
        <div className="form-container active">
          <form className="youtuber-form" onSubmit={handleSubmit}>
            <h1 className='popup-heading'>Enter the Youtuber Details</h1>
            <label htmlFor="name" className="form-label">Name:</label>
            <input
              type="text"
              id="name"
              className="form-input"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <label htmlFor="contactNo" className="form-label">Contact No:</label>
            <input
              type="text"
              id="contactNo"
              className="form-input"
              placeholder="Enter Contact No"
              value={contactNo}
              onChange={(e) => setContactNo(e.target.value)}
              required
            />

            <label htmlFor="dist" className="form-label">Dist.:</label>
            <input
              type="text"
              id="dist"
              className="form-input"
              placeholder="Enter Dist."
              value={dist}
              onChange={(e) => setDist(e.target.value)}
              required
            />

            <label htmlFor="constituency" className="form-label">Constituency:</label>
            <input
              type="text"
              id="constituency"
              className="form-input"
              placeholder="Enter Constituency"
              value={constituency}
              onChange={(e) => setConstituency(e.target.value)}
              required
            />

            <div className='cancel-submit-btn-container'>
              <button type="button" className="btn-cancel" onClick={handleCancel}>Cancel</button>
              <button type="submit" className="btn-submit">Submit</button>
            </div>
          </form>
        </div>
      </>
    );
  };

  return (
    <>
      <div>
        <div className='main-header-container'>
          <h1 className='main-youtuber'>Youtuber</h1>
        </div>
        <div className='youtuber-container'>
          <div className={showForm ? "overlay" : "overlay hidden"} onClick={() => setShowForm(false)}></div>
          {showForm && <FormComponent onSave={handleSave} onClose={() => setShowForm(false)} />}
          <div className="floating-button" onClick={() => setShowForm(!showForm)}>
            <span>New</span>
            <FaPlus className="plus-icon" />
          </div>
          <ul className={selectedItem !== null ? "userList popup" : "userList"}>
            {users.length === 0 ? (
              <div className='empty-list-container'>
                <li className="empty-list">The Youtuber List is Empty. Click on the New to Add Youtuber Details</li>
              </div>
            ) : (
              users.map((user, index) => (
                <li key={index} className="youtuber-users-list" onClick={() => setSelectedItem(index)}>
                  <div className='youtuber-list-column'>
                    <p className='list-youtuber-name'>{user.name}</p>
                    <p className='list-d2d-time'>Date & Time: {user.time}</p>
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
                    <p className='list-time'>Name: {users[selectedItem].name}</p>
                    <p className='list-time'>Contact No: {users[selectedItem].contactNo}</p>
                    <p className='list-time'>Dist.: {users[selectedItem].dist}</p>
                    <p className='list-time'>Constituency: {users[selectedItem].constituency}</p>
                    <p className='list-time'>Date & Time: {users[selectedItem].time}</p>
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
};

export default Youtuber;
