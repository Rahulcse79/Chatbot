import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Page1() {

  const navigate = useNavigate();

  const ClickHere = () => {
    localStorage.clear();
    setTimeout(() => {
      navigate("/Chatbot");
    }, 300);
    localStorage.setItem("user",JSON.stringify("I am Rahul"));
  }  

  return (
    <div>
      <>
      <div className='classbot'>
        <p>Enter into Student Info System</p>
      </div>
      <div>
        <button className='button1' type='button' onClick={ClickHere}>Enroll Now!</button>
      </div>
      </>
    </div>
  )
}
