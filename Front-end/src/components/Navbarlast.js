import React from 'react';
import logoImage from './logo2.jpeg';

export default function Navbar() {
  return (
    <div>
      <nav className="NavbarA2" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <img src={logoImage} alt="Logo" className='Navbar2' style={{width: '70px',height: '60px'}}/>
      </nav>
    </div>
  );
}
