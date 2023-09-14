import React from 'react';
import logoImage from './logo2.jpeg';

export default function Navbar() {
  return (
    <div>
      <nav className="Navbar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <img src={logoImage} alt="Logo" className='Navbar2' style={{width: '70px',height: '60px'}}/>
        <h1
         className='Navbar1A'>CHAT-BOT</h1>
      </nav>
    </div>
  );
}
