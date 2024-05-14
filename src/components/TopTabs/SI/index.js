import React, { useState } from 'react';
import Footer from '../../Footer';
import { FaPlus } from 'react-icons/fa';
import { RiArrowRightSLine } from 'react-icons/ri';
import "./index.css"

const SI = () => {
  const [showForm, setShowForm] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
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
    const userData = {
      district: siDistrict,
      block: siBlock,
      panchayat: siPanchayat,
      villageName: siVillageName,
      contactNo: siContactNo,
      age: siAge,
      electionFought: siElectionFought,
      socialLife: siSocialLife,
      politicalLife: siPoliticalLife,
      time: currentTime
    };
    setUsers([...users, userData]);
    setShowForm(false);
  };

  const FormComponent = () => {
    return (
      <div className="si-form-container active">
        <form onSubmit={handleSubmit}>
          <label htmlFor="siDistrict">District:</label>
          <input
            type="text"
            id="siDistrict"
            value={siDistrict}
            onChange={(e) => setSiDistrict(e.target.value)}
            required
          />
          <label htmlFor="siBlock">Block:</label>
          <input
            type="text"
            id="siBlock"
            value={siBlock}
            onChange={(e) => setSiBlock(e.target.value)}
            required
          />
          <label htmlFor="siPanchayat">Panchayat:</label>
          <input
            type="text"
            id="siPanchayat"
            value={siPanchayat}
            onChange={(e) => setSiPanchayat(e.target.value)}
            required
          />
          <label htmlFor="siVillageName">Village Name:</label>
          <input
            type="text"
            id="siVillageName"
            value={siVillageName}
            onChange={(e) => setSiVillageName(e.target.value)}
            required
          />
          <label htmlFor="siContactNo">Contact No:</label>
          <input
            type="tel"
            id="siContactNo"
            value={siContactNo}
            onChange={(e) => setSiContactNo(e.target.value)}
            required
          />
          <label htmlFor="siAge">Age:</label>
          <input
            type="number"
            id="siAge"
            value={siAge}
            onChange={(e) => setSiAge(e.target.value)}
            required
          />
          <label htmlFor="siElectionFought">Election fought:</label>
          <select
            id="siElectionFought"
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
            value={siSocialLife}
            onChange={(e) => setSiSocialLife(e.target.value)}
            required
          />
          <label htmlFor="siPoliticalLife">Political life:</label>
          <input
            type="text"
            id="siPoliticalLife"
            value={siPoliticalLife}
            onChange={(e) => setSiPoliticalLife(e.target.value)}
            required
          />
          <div className="si-cancel-submit-btn-container">
            <button type="button" className="si-btn-cancel" onClick={() => setShowForm(false)}>Cancel</button>
            <button type="submit" className="si-btn-submit">Submit</button>
          </div>
        </form>
      </div>
    );
  };

  return (
    <>
      <div>
        <div className='si-main-header-container'>
          <h1 className='si-main-heading'>SI/BSC</h1>
        </div>
        <div className='si-d2d-container'>
          <div className={showForm ? "si-overlay" : "si-overlay hidden"} onClick={() => setShowForm(false)}></div>
          {showForm && <FormComponent />}
          <div className="si-floating-button" onClick={() => setShowForm(!showForm)}>
            <span>New</span>
            <FaPlus className="si-plus-icon" />
          </div>
          <ul className={selectedItem !== null ? "si-userList si-popup" : "si-userList"}>
            {users.length === 0 ? (
              <div className='si-empty-list-container'>
                <li className="si-empty-list">The SI List is Empty. Click on New to Add SI Report</li>
              </div>
            ) : (
              users.map((user, index) => (
                <li key={index} className="si-d2d-users-list" onClick={() => setSelectedItem(index)}>
                  <div className='si-d2d-list-column'>
                    <p className='si-list-d2d-name'>SI : {user.block}, {user.district}</p>
                    <p className='si-list-d2d-time'>Date & Time: {user.time}</p>
                  </div>
                  <p><RiArrowRightSLine className='si-side-arrow' /></p>
                </li>
              ))
            )}
          </ul>
          {selectedItem !== null && (
            <div className="si-popup">
              <div className="si-popup-content">
                <span className="si-close" onClick={() => setSelectedItem(null)}>&times;</span>
                <ul className="si-userList">
                  <li className="si-users-list">
                    <p className='si-list-time'>District: {users[selectedItem].district}</p>
                    <p className='si-list-time'>Block: {users[selectedItem].block}</p>
                    <p className='si-list-time'>Panchayat: {users[selectedItem].panchayat}</p>
                    <p className='si-list-time'>Village Name: {users[selectedItem].villageName}</p>
                    <p className='si-list-time'>Contact No: {users[selectedItem].contactNo}</p>
                    <p className='si-list-time'>Age: {users[selectedItem].age}</p>
                    <p className='si-list-time'>Election fought: {users[selectedItem].electionFought}</p>
                    <p className='si-list-time'>Social life: {users[selectedItem].socialLife}</p>
                    <p className='si-list-time'>Political life: {users[selectedItem].politicalLife}</p>
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

export default SI;
