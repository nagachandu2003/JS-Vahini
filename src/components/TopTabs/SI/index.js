import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { RiArrowRightSLine } from "react-icons/ri";
import Footer from '../../Footer';
import './index.css'; // Import CSS file

const SI = () => {
  const [showForm, setShowForm] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null); // Track selected item index

  function handleSave(userData) {
    if (userData) {
      // Set the default name as SI1, SI2, SI3, ...
      const defaultName = `SI${users.length + 1}`;
      const siName = { ...userData, name: defaultName };
      setUsers([...users, siName]);
    }
    setShowForm(false);
  }

  const FormComponent = ({ onSave, onClose }) => {
    const [siDistrict, setSiDistrict] = useState('');
    const [siBlock, setSiBlock] = useState('');
    const [siPanchayat, setSiPanchayat] = useState('');
    const [siVillageName, setSiVillageName] = useState('');
    const [siContactNo, setSiContactNo] = useState('');
    const [siAge, setSiAge] = useState('');
    const [siElectionFought, setSiElectionFought] = useState('');
    const [siSocialLife, setSiSocialLife] = useState('');
    const [siPoliticalLife, setSiPoliticalLife] = useState('');

    const handleSubmit = (e) => {
      e.preventDefault();
      const currentTime = new Date().toLocaleString();
      onSave({
        siDistrict,
        siBlock,
        siPanchayat,
        siVillageName,
        siContactNo,
        siAge,
        siElectionFought,
        siSocialLife,
        siPoliticalLife,
        time: currentTime
      });
      // Reset input fields after submission
      setSiDistrict('');
      setSiBlock('');
      setSiPanchayat('');
      setSiVillageName('');
      setSiContactNo('');
      setSiAge('');
      setSiElectionFought('');
      setSiSocialLife('');
      setSiPoliticalLife('');
    };
  
    const handleCancel = () => {
      onClose();
    };

    return (
      <>
        <div className="form-container active" style={{ overflow: 'auto' }}>
          <form className="si-form" onSubmit={handleSubmit}>
            <h1 className='popup-heading'>Enter the SI Details</h1>
            <label htmlFor="siDistrict">District:</label>
<input
  type="text"
  id="siDistrict"
  placeholder="Enter district"
  className='si-input-element'
  value={siDistrict}
  onChange={(e) => setSiDistrict(e.target.value)}
  required
/>

<label htmlFor="siBlock">Block:</label>
<input
  type="text"
  id="siBlock"
  placeholder="Enter block"
  className='si-input-element'
  value={siBlock}
  onChange={(e) => setSiBlock(e.target.value)}
  required
/>

<label htmlFor="siPanchayat">Panchayat:</label>
<input
  type="text"
  id="siPanchayat"
  placeholder="Enter panchayat"
  className='si-input-element'
  value={siPanchayat}
  onChange={(e) => setSiPanchayat(e.target.value)}
  required
/>

<label htmlFor="siVillageName">Village Name:</label>
<input
  type="text"
  id="siVillageName"
  placeholder="Enter village name"
  className='si-input-element'
  value={siVillageName}
  onChange={(e) => setSiVillageName(e.target.value)}
  required
/>

<label htmlFor="siContactNo">Contact No:</label>
<input
  type="tel"
  id="siContactNo"
  placeholder="Enter contact number"
  className='si-input-element'
  value={siContactNo}
  onChange={(e) => setSiContactNo(e.target.value)}
  required
/>

<label htmlFor="siAge">Age:</label>
<input
  type="number"
  id="siAge"
  placeholder="Enter age"
  className='si-input-element'
  value={siAge}
  onChange={(e) => setSiAge(e.target.value)}
  required
/>

<label htmlFor="siElectionFought">Election fought:</label>
<select
  id="siElectionFought"
  className='si-input-element'
  value={siElectionFought}
  onChange={(e) => setSiElectionFought(e.target.value)}
  required
>
  <option value="">Select</option>
  <option value="Yes">Yes</option>
  <option value="No">No</option>
</select>

<label htmlFor="siSocialLife">Social life:</label>
<input
  type="text"
  id="siSocialLife"
  placeholder="Enter social life"
  className='si-input-element'
  value={siSocialLife}
  onChange={(e) => setSiSocialLife(e.target.value)}
  required
/>

<label htmlFor="siPoliticalLife">Political life:</label>
<input
  type="text"
  id="siPoliticalLife"
  placeholder="Enter political life"
  className='si-input-element'
  value={siPoliticalLife}
  onChange={(e) => setSiPoliticalLife(e.target.value)}
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
          <h1 className='main-si'>BSC/Social Influencer</h1>
        </div>
        <div className='si-container'>
          <div className={showForm ? "overlay" : "overlay hidden"} onClick={() => setShowForm(false)}></div>
          {showForm && <FormComponent onSave={handleSave} onClose={() => setShowForm(false)} />}
          <div className="floating-button" onClick={() => setShowForm(!showForm)}>
            <span>New</span>
            <FaPlus className="plus-icon" />
          </div>
          <ul className={selectedItem !== null ? "userList popup" : "userList"}>
            {users.length === 0 ? (
              <div className='empty-list-container'>
                <li className="empty-list">The SI List is Empty. Click on the New to Add SI Report</li>
              </div>
            ) : (
              users.map((user, index) => (
                <li key={index} className="si-users-list" onClick={() => setSelectedItem(index)}>
                  <div className='si-list-column'>
                    <p className='list-si-name'>SI/BSC</p>
                    <p className='list-si-time'>Date & Time: {user.time}</p>
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
                    <p className='list-time'>District: {users[selectedItem].district}</p>
                    <p className='list-time'>Block: {users[selectedItem].block}</p>
                    <p className='list-time'>Panchayat: {users[selectedItem].panchayat}</p>
                    <p className='list-time'>Village Name: {users[selectedItem].villageName}</p>
                    <p className='list-time'>Contact No: {users[selectedItem].contactNo}</p>
                    <p className='list-time'>Age: {users[selectedItem].age}</p>
                    <p className='list-time'>Election fought: {users[selectedItem].electionFought}</p>
                    <p className='list-time'>Social life: {users[selectedItem].socialLife}</p>
                    <p className='list-time'>Political life: {users[selectedItem].politicalLife}</p>
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
}

export default SI;
