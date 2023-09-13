import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';

export default function Chatbot() {
  const navigate = useNavigate();
  const [name,setName]=useState("");
  const [message1, setMessage1] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showTime1, setShowTime1] = useState(false);
  const [showTime3, setShowTime3] = useState(false);
  const [showTime33, setShowTime33] = useState(false);
  const [showTime333, setShowTime333] = useState(false);
  const [nameCall1, setnameCall1] = useState(false);
  const [ageCall1, setAgeCall1] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [callThanks, setCallThanks] = useState(false);

  const AgeSelect = (age) => {
    setCallThanks(true);
    localStorage.setItem("userAge",JSON.stringify(age));
    localStorage.setItem("userName",JSON.stringify(name));
    setTimeout(() => {
      navigate("/Page3");
    }, 500);
  }


  const handleGotItClick = () => {
    setMessage1(
      <div className='classbot'>
        <p> Bot: &nbsp; Pick a slot !</p>
      </div>)
    setShowCalendar(true);
  }

  const AgeSelect1 = () => {
    const items = [];
    let startAge = 18;
    let endAge = 23;
  
    for (let row = 1; row <= 6; row++) {
      const rowItems = [];
      for (let age = startAge; age <= endAge; age++) {
        if(age<41)
        rowItems.push(
          <Dropdown.Item key={age} onClick={() => AgeSelect(age)} className='buttonextra2'>{age}</Dropdown.Item>
        );
      }
      items.push(<div key={row} className="row">{rowItems}</div>);
      startAge = endAge + 1;
      endAge += 6;
    }
  
    return items;
  }

  const genTime = (sH, eH) => {
    const buttons = [];
    for (let i = sH; i <= eH; i++) {
      const per = i >= 12 ? 'PM' : 'AM';
      const fh = i % 12 === 0 ? 12 : i % 12;
      buttons.push(
        <button key={i} type='button' onClick={nameCall} className='buttonextra'>
          {`${fh} ${per}`}
        </button>
      );
    }
    return buttons;
  }

  const ageCall=()=>{
    setAgeCall1(true);
  }

  const ageCallKey = (e) => {
    if (e.key === 'Enter') {
      ageCall();
    }
  }

  const nameCall=()=>{
    setnameCall1(true);
  }

  const showTime=()=>{
    setShowTime1(true);
  }

  const showTime2=()=>{
    setShowTime3(true);
  }

  const showTime22=()=>{
    setShowTime33(true);
  }

  const showTime222=()=>{
    setShowTime333(true);
  }

  const navigateDate = (direction) => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setDate(currentDate.getDate() - 3);
    } else if (direction === 'next') {
      newDate.setDate(currentDate.getDate() + 3);
    }
    setCurrentDate(newDate);
  }

  return (
    <div>
      <>
      <div className='classbot'>
        <p> Bot: &nbsp; Hello, Welcome to student info system! </p>
      </div>
      <button className='button1' type='button' onClick={handleGotItClick}>Got it!</button>
      {message1} 
{showCalendar && ( <div className='Navbar2'>
  <button className='button12'onClick={() => navigateDate('prev')}disabled={new Date(currentDate).getDate() === new Date().getDate()}>{'<'}</button>
  <button type='button' onClick={showTime} className='buttonextra'>{new Date(currentDate).toDateString()}</button>
  <button type='button' onClick={showTime} className='buttonextra'>{new Date(currentDate.getTime() + 1* 24 * 60 * 60 * 1000).toDateString()} {/* Next day */}</button>
  <button type='button' onClick={showTime} className='buttonextra'>{new Date(currentDate.getTime() + 2*  24 * 60 * 60 * 1000).toDateString()} {/* Next day + 1 */}</button>
  <button className='button13'onClick={() => navigateDate('next')}>{'>'}</button>
  </div>  )}

{  showTime1 && (<div className='Navbar2 Nav21'>
  <button type='button'  onClick={showTime2} className='buttonextra' style={{marginLeft: '96px'}}>Morning</button>
  <button type='button'  onClick={showTime22} className='buttonextra'>Afternoon</button>
  <button type='button'  onClick={showTime222} className='buttonextra'>Evening</button>
  </div>)}

{showTime3 && <div className='Navbar2 Nav21'>{genTime(6, 11)}</div>}
{showTime33 && <div className='Navbar2 Nav21'>{genTime(12, 17)}</div>}
{showTime333 && <div className='Navbar2 Nav21'>{genTime(18, 23)}</div>}


   {  nameCall1 && (<div>
      <div className='classbot'>
        <p> Bot: &nbsp; Enter your Name </p>
      </div>
      <div>
      <input className='button1name' onKeyPress={ageCallKey} type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder='Enter Name' />
      </div>
  </div>)}

  {  ageCall1 && (<Dropdown Drop="Down">
      <Dropdown.Toggle variant="success" className='buttonextra' id="dropdown-basic">Age</Dropdown.Toggle>
      <Dropdown.Menu>
      {AgeSelect1()}
      </Dropdown.Menu>
      </Dropdown>)}

    {callThanks && <div className='classbot'>
        <p> Bot: &nbsp; Thank you </p>
      </div>}
      </>
    </div>
  )
}
