import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "semantic-ui-react";
import { Button } from "semantic-ui-react";
import logoImage from './logo2.jpeg';
import Spiner from './Spiner';

export default function Chatbot() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
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
  const [age, setAge] = useState(null);

  const AgeSelect = () => {
    setCallThanks(true);
    setIsLoading(true);
    localStorage.setItem("userAge", JSON.stringify(age));
    localStorage.setItem("userName", JSON.stringify(name));
    setTimeout(() => {
      setIsLoading(false);
    }, 4990);
    setTimeout(() => {
      navigate("/Page3");
    }, 5000);
  };

  const handleGotItClick = () => {
    setMessage1(
      <nav className="Uclassbot2" >
        <img src={logoImage} alt="Logo" className="UImage1"/>
        <p className="Uclassbotname2A"> Bot: &nbsp; Pick a slot !</p>
      </nav>
    );
    setShowCalendar(true);
  };

  const genTime = (sH, eH) => {
    const buttons = [];
    for (let i = sH; i <= eH; i++) {
      const per = i >= 12 ? "PM" : "AM";
      const fh = i % 12 === 0 ? 12 : i % 12;
      buttons.push(
        <Button
          key={i}
          type="Button"
          onClick={nameCall}
          className="buttonextra"
        >
          {`${fh} ${per}`}
        </Button>
      );
    }
    return buttons;
  };

  const ageCall = () => {
    setAgeCall1(true);
  };

  const ageCallKey = (e) => {
    if (e.key === "Enter") {
      ageCall();
    }
  };

  const nameCall = () => {
    setnameCall1(true);
  };

  const showTime = () => {
    setShowTime1(true);
  };

  const showTime2 = () => {
    setShowTime3(true);
  };

  const showTime22 = () => {
    setShowTime33(true);
  };

  const showTime222 = () => {
    setShowTime333(true);
  };

  const navigateDate = (direction) => {
    const newDate = new Date(currentDate);
    if (direction === "prev") {
      newDate.setDate(currentDate.getDate() - 3);
    } else if (direction === "next") {
      newDate.setDate(currentDate.getDate() + 3);
    }
    setCurrentDate(newDate);
  };

  const ageComponent = (showComponent) => {
    if (showComponent) {
       let ageOptions = [...Array(23).keys()].map((e) => {
        let v = e + 18;
        return { key: v, text: v, value: v };
      });
      return (
        <Dropdown
          placeholder={"Age"}
          style={{ innerWidth: "600px" }}
          fluid
          selection
          options={ageOptions}
          onChange={AgeSelect}
          className="underDropdown"
        />
      );
    } else {
      return <></>;
    }
  };


  return (
    <div>
      <nav className="Uclassbot2">
      <img src={logoImage} alt="Logo" className="UImage1"/>
        <p className="Uclassbotname2"> Bot: &nbsp; Hello, Welcome to student info system! </p>
      </nav>
      <Button className="button1A" type="Button" onClick={handleGotItClick}>
        Got it!
      </Button>
      {message1}
      {showCalendar && (
        <nav className="Uclassbot2A2" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <img src={logoImage} alt="Logo" className="UImage1A2"/>
          <Button
            className="button12"
            onClick={() => navigateDate("prev")}
            disabled={new Date(currentDate).getDate() === new Date().getDate()}
          >
            {"<"}
          </Button>
          <Button type="Button" onClick={showTime} className="navunderbutton">
            {new Date(currentDate).toDateString()}
          </Button>
          <Button type="Button" onClick={showTime} className="navunderbutton">
            {new Date(
              currentDate.getTime() + 1 * 24 * 60 * 60 * 1000
            ).toDateString()}{" "}
          </Button>
          <Button type="Button" onClick={showTime} className="navunderbutton">
            {new Date(
              currentDate.getTime() + 2 * 24 * 60 * 60 * 1000
            ).toDateString()}{" "}
          </Button>
          <Button className="button12" onClick={() => navigateDate("next")}>
            {">"}
          </Button>
        </nav>
      )}

      {showTime1 && (
        <nav className="Uclassbot2A2" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <img src={logoImage} alt="Logo" className="UImage1A2"/>
          <Button
            type="Button"
            onClick={showTime2}
            className="navunderbuttonA2"
            style={{ marginLeft: "96px" }}
          >
            Morning
          </Button>
          <Button type="Button" onClick={showTime22} className="navunderbuttonA2">
            Afternoon
          </Button>
          <Button type="Button" onClick={showTime222} className="navunderbuttonA2">
            Evening
          </Button>
        </nav>
      )}

      {showTime3 && <nav className="Uclassbot2A22" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <img src={logoImage} alt="Logo" className="UImage1A22"/>
      {genTime(6, 11)}</nav>}
      {showTime33 && <nav className="Uclassbot2A22" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} ><img src={logoImage} alt="Logo" className="UImage1A2"/>{genTime(12, 17)}</nav>}
      {showTime333 && <nav className="Uclassbot2A22" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><img src={logoImage} alt="Logo" className="UImage1A2"/>{genTime(18, 23)}</nav>}

      {nameCall1 && (
        <div>
          <nav className="Uclassbot22" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <img src={logoImage} alt="Logo" className="UImage1A2"/>
            <p className="Uclassbotname2A22"> Bot: &nbsp; Enter your Name </p>
          </nav>
          <nav className="userU" >
            <input
              className="Name2121"
              onKeyPress={ageCallKey}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Name"
            />
          </nav>
        </div>
      )}

      {setName===null?
      <>
      <nav className="Uclassbot2" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <img src={logoImage} alt="Logo" className="UImage1A2"/>
            <p className="Uclassbotname2A22"> Bot: &nbsp; Enter your Age </p>
          </nav> </>:<></>}

      {ageComponent(ageCall1)}

      {callThanks && (
        <nav className="Uclassbot2" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <img src={logoImage} alt="Logo" className="UImage1A2"/>
          <p className="Uclassbotname2A2121"> Bot: &nbsp; Thank you </p>
        </nav>
      )}
       {isLoading && <Spiner />}
    </div>
  );
}