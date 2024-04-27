import React from 'react';
import { FaPlus } from 'react-icons/fa';
import "./index.css";

const FloatingButton = () => {
  return (
    <div className="universal-floating-button">
      <p className='new-text'>New</p>
      <FaPlus className="universal-plus-icon" />
    </div>
  );
};

export default FloatingButton;
