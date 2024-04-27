import React, { useState } from 'react';
import './index.css'; // Import the CSS file for styling
import QRCode from 'react-qr-code'; // Import QRCode component

const Whatsapp = () => {
  const [activeTab, setActiveTab] = useState(0); // State to manage active tab

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  const phoneNumber = "+919972968390";
  const whatsappURL = `https://wa.me/${phoneNumber}?text=Hello`;

  return (
    <div className="whatsapp-container">
      <div className='whatsapp-main-header-container'>
        <h1 className='whatsapp-main-heading'>WhatsApp</h1>
      </div>
      <div className="whatsapp-upper-tabs-container">
        <div
          className={`whatsapp-upper-tab ${activeTab === 0 ? 'active' : ''}`}
          onClick={() => handleTabClick(0)}
        >
          My Code
        </div>
        <div
          className={`whatsapp-upper-tab ${activeTab === 1 ? 'active' : ''}`}
          onClick={() => handleTabClick(1)}
        >
          Numbers
        </div>
      </div>
      <div className="whatsapp-content-container">
        {/* Content for My Code tab */}
        <div className={`whatsapp-tab-content ${activeTab === 0 ? 'active' : ''}`}>
          <div className="whatsapp-container">
            <div className="whatsapp-qr-container">
              <h2 className="whatsapp-qr-heading">Scan the QR Code to Message on WhatsApp</h2>
              <QRCode value={whatsappURL} size={200} className='qr-code'/>
              <p className="whatsapp-info">Scan this QR code with WhatsApp to send a message to {phoneNumber}</p>
            </div>
          </div>
        </div>
        {/* Content for Numbers tab */}
        <div className={`whatsapp-tab-content ${activeTab === 1 ? 'active' : ''}`}>
          <h2>Numbers Content</h2>
          {/* Add your content here */}
        </div>
      </div>
    </div>
  );
};

export default Whatsapp;
