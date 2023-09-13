import './App.css';
import React from "react";
import Chatbot from "./components/Chatbot";
import Page1 from "./components/Page1";
import Page3 from "./components/Page3";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import PrivateComponent from './components/privateComponent';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
      <Routes>
      <Route path="/" element={<Page1/>}/>

      <Route element = {<PrivateComponent/>}>
      <Route path="/Chatbot" element={<Chatbot/>}/>
      <Route path="/Page3" element={<Page3/>} 
/>    </Route>


      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
