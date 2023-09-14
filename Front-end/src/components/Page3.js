import React from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar2 from './Navbar2';

export default function Page3() {

  const navigate = useNavigate();
  const name = localStorage.getItem('userName');
  const age = localStorage.getItem('userAge');
  const clear = localStorage.clear();

const ClickHere = () => {
    navigate("/");
}  

  return (
    <div>
      <Navbar2/>
      <nav className='lastCall'>
      <h1 className='lastCallText'> Your name {name} aged {age} has been added to student system. You may now exit.</h1>
      {clear}
      </nav>
      <div>
        <button className='Ubutton12' type='button' onClick={ClickHere}>Exit</button>
      </div>
    </div>
  )
}
