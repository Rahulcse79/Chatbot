import React,{ useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Spiner from './Spiner';

export default function Page1() {

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const ClickHere = () => {
    setIsLoading(true);
    localStorage.clear();
      
    setTimeout(() => {
      setIsLoading(false);
      navigate("/Chatbot");
    }, 3000);
    localStorage.setItem("user",JSON.stringify("I am Rahul"));
  }  

  return (
    <div>
      <>
      <nav className='Uclassbot'>
        <h2 className='.Uclassbotname' style={{marginTop: "4px"}}>Enter into Student Info System</h2>
      </nav>
      <div>
        <button className='Ubutton1' type='button' onClick={ClickHere}>Enroll Now!</button>
      </div>
      {isLoading && <Spiner />}
      </>
    </div>
  )
}
