import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "semantic-ui-react";

export default function Page1() {
  const navigate = useNavigate();

  const ClickHere = () => {
    localStorage.clear();
    setTimeout(() => {
      navigate("/Chatbot");
    }, 0);
    localStorage.setItem("user", JSON.stringify("I am Rahul"));
  };

  return (
    <div>
      <>
        <div className="classbot">
          <p>Enter into Student Info System</p>
        </div>
        <div>
          <Button onClick={ClickHere}>Enroll Now!</Button>
        </div>
      </>
    </div>
  );
}
