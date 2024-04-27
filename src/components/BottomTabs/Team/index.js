import React from 'react';
import "./index.css";
import { IoLogoWhatsapp } from "react-icons/io5";


const Team = () => {
  return (
    <div className="team-container">
      <div className='main-header-container'>
        <h1 className='main-heading'>Team</h1>
      </div>
      <div className='team-content'>
        <div className='team-role'>
          <h1 className='team-heading'>Camp Incharge</h1>
          <p className='team-para'>
            Abhishek Anand,{' '}
            <IoLogoWhatsapp className='team-whatsapp-logo'/>
            <a className="team-phone" href="tel:+4488663399">4488663399</a> 
            <a className="team-whatsapp" href="https://api.whatsapp.com/send?phone=4488663399">
            </a>
          </p>
        </div>
        <div className='team-role'>
          <h1 className='team-heading'>Kitchen PoC</h1>
          <p className='team-para'>
            Ajay Raj,{' '}
            <IoLogoWhatsapp  className='team-whatsapp-logo'/>
            <a className="team-phone" href="tel:+4446663331">4446663331</a> 
            <a className="team-whatsapp" href="https://api.whatsapp.com/send?phone=4446663331">
            </a>
          </p>
        </div>
        <div className='team-role'>
          <h1 className='team-heading'>Chef</h1>
          <p className='team-para'>Chef@kitchen.com</p>
        </div>
      </div>
    </div>
  );
};

export default Team;
