import React from 'react';
import logoImage from './logo2.jpeg';

export default function Navbar() {
  return (
    <div>
      <nav className="Navbar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <img src={logoImage} alt="Logo" className='Navbar2' style={{ width: '50px', height: '50px',}}/>
        <p className='Navbar1'>Chat-Bot</p>
      </nav>
    </div>
  );
}
