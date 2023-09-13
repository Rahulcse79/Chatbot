import './App.css';
import React from "react";
import Chatbot from "./components/Chatbot";
import Page1 from "./components/Page3";
import Page3 from "./components/Page3";

function App() {

  return (
    <div className="App">
      {/*page 1*/}
      <div className="content">
        <Chatbot />
      </div>
      {/* page 3 */}
    </div>
  );
}

export default App;
