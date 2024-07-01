import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { RiArrowRightSLine } from 'react-icons/ri';
import Footer from '../../Footer';

import './index.css'; // Import CSS file

const YC = () => {
  const [showForm, setShowForm] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  function handleSave(userData) {
    if (userData) {
      const defaultName = `YC${users.length + 1}`;
      const ycData = { ...userData, name: defaultName };
      setUsers([...users, ycData]);
    }
    setShowForm(false);
  }

  const FormComponent = ({ onSave, onClose }) => {
    const [name, setName] = useState('');
    const [contactNo, setContactNo] = useState('');
    const [district, setDistrict] = useState('');
    const [block, setBlock] = useState('');
    const [panchayat, setPanchayat] = useState('');
    const [vill, setVill] = useState('');
    const [group25, setGroup25] = useState('');
    const [whatsappGroup25, setWhatsappGroup25] = useState('');
    const [profession, setProfession] = useState('');
    const [education, setEducation] = useState('');

    const handleSubmit = (e) => {
      e.preventDefault();
      const currentTime = new Date().toLocaleString();
      onSave({
        name,
        contactNo,
        district,
        block,
        panchayat,
        vill,
        group25,
        whatsappGroup25,
        profession,
        education,
        time: currentTime
      });
      // Reset input fields after submission
      setName('');
      setContactNo('');
      setDistrict('');
      setBlock('');
      setPanchayat('');
      setVill('');
      setGroup25('');
      setWhatsappGroup25('');
      setProfession('');
      setEducation('');
    };

    const handleCancel = () => {
      onClose();
    };

    return (
      <>
        <div className="form-container active">
          <form className="yc-form" onSubmit={handleSubmit}>
            <h1 className='popup-heading'>Enter the YC Details</h1>
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

            <label htmlFor="district" className="form-label">District:</label>
            <input
              type="text"
              id="district"
              className="form-input"
              placeholder="Enter District"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              required
            />

            <label htmlFor="block" className="form-label">Block:</label>
            <input
              type="text"
              id="block"
              className="form-input"
              placeholder="Enter Block"
              value={block}
              onChange={(e) => setBlock(e.target.value)}
              required
            />

            <label htmlFor="panchayat" className="form-label">Panchayat:</label>
            <input
              type="text"
              id="panchayat"
              className="form-input"
              placeholder="Enter Panchayat"
              value={panchayat}
              onChange={(e) => setPanchayat(e.target.value)}
              required
            />

            <label htmlFor="vill" className="form-label">Vill:</label>
            <input
              type="text"
              id="vill"
              className="form-input"
              placeholder="Enter Vill"
              value={vill}
              onChange={(e) => setVill(e.target.value)}
              required
            />

            <label htmlFor="group25" className="form-label">Group of 25 members:</label>
            <select
              id="group25"
              className="form-input"
              value={group25}
              onChange={(e) => setGroup25(e.target.value)}
              required
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>

            <label htmlFor="whatsappGroup25" className="form-label">Whatsapp group of 25 members:</label>
            <select
              id="whatsappGroup25"
              className="form-input"
              value={whatsappGroup25}
              onChange={(e) => setWhatsappGroup25(e.target.value)}
              required
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>

            <label htmlFor="profession" className="form-label">Profession:</label>
            <input
              type="text"
              id="profession"
              className="form-input"
              placeholder="Enter Profession"
              value={profession}
              onChange={(e) => setProfession(e.target.value)}
              required
            />

            <label htmlFor="education" className="form-label">Education:</label>
            <input
              type="text"
              id="education"
              className="form-input"
              placeholder="Enter Education"
              value={education}
              onChange={(e) => setEducation(e.target.value)}
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
          <h1 className='main-yc'>Youth Club</h1>
        </div>
        <div className='yc-container'>
          <div className={showForm ? "overlay" : "overlay hidden"} onClick={() => setShowForm(false)}></div>
          {showForm && <FormComponent onSave={handleSave} onClose={() => setShowForm(false)} />}
          <div className="floating-button" onClick={() => setShowForm(!showForm)}>
            <span>New</span>
            <FaPlus className="plus-icon" />
          </div>
          <ul className={selectedItem !== null ? "userList popup" : "userList"}>
            {users.length === 0 ? (
              <div className='empty-list-container'>
                <li className="empty-list">The YC List is Empty. Click on the New to Add YC Details</li>
              </div>
            ) : (
              users.map((user, index) => (
                <li key={index} className="yc-users-list" onClick={() => setSelectedItem(index)}>
                  <div className='yc-list-column'>
                    <p className='list-yc-name'>{user.name}</p>
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
    <table className="userTable">
      <tr>
        <th className="parameterHeader">Parameters</th>
        <th className="valueHeader">Values</th>
      </tr>
      <tr>
        <td className="parameter">Name</td>
        <td className="value">{users[selectedItem].name}</td>
      </tr>
      <tr>
        <td className="parameter">Contact No</td>
        <td className="value">{users[selectedItem].contactNo}</td>
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
        <td className="parameter">Panchayat</td>
        <td className="value">{users[selectedItem].panchayat}</td>
      </tr>
      <tr>
        <td className="parameter">Vill</td>
        <td className="value">{users[selectedItem].vill}</td>
      </tr>
      <tr>
        <td className="parameter">Group of 25 members</td>
        <td className="value">{users[selectedItem].group25}</td>
      </tr>
      <tr>
        <td className="parameter">Whatsapp group of 25 members</td>
        <td className="value">{users[selectedItem].whatsappGroup25}</td>
      </tr>
      <tr>
        <td className="parameter">Profession</td>
        <td className="value">{users[selectedItem].profession}</td>
      </tr>
      <tr>
        <td className="parameter">Education</td>
        <td className="value">{users[selectedItem].education}</td>
      </tr>
      <tr>
        <td className="parameter">Date & Time</td>
        <td className="value">{users[selectedItem].time}</td>
      </tr>
    </table>
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

export default YC;